import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { ApiConfig } from "../../utility/apiConfig";
import { animate, inView, stagger } from "motion";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  apiConfig = ApiConfig;
  currentYear = new Date().getFullYear();
  activeTab: string = "crowns";
  isMarqueePaused: boolean = false;

  /** Sticky-nav visual state + mobile drawer */
  scrolled = false;
  mobileMenuOpen = false;

  /** Back-to-top button visibility + click animation flag */
  showToTop = false;
  launching = false;

  /** True once motion.dev is available and driving section animations */
  motionReady = false;

  /** Category label shown as the chip on each facility card */
  get activeTabLabel(): string {
    const labels: { [key: string]: string } = {
      crowns: "Crowns & Bridges",
      orthodontics: "Hawley Retainers",
      dentures: "Dentures",
      other: "Other Services",
    };
    return labels[this.activeTab] || "";
  }

  /** Rotating product showcase inside the hero visual */
  heroSlides = [
    { img: "Zirconia.png", label: "Zirconia Crown" },
    { img: "E-max.png", label: "E-max Crown" },
    { img: "PFM.png", label: "PFM Crown" },
    { img: "Implant.png", label: "Implant Crown" },
    { img: "Dentures.png", label: "Complete Dentures" },
    { img: "Flexible.png", label: "Flexible Dentures" },
  ];

  private observer?: IntersectionObserver;

  facilities = {
    crowns: [
      {
        image: "cb1.jpg",
        title: "Zirconia Crown",
        description:
          "High strength zirconia crowns with excellent aesthetics. Biocompatible, remarkably robust, and smart transparent color blend with natural teeth.",
      },
      {
        image: "cb2.jpg",
        title: "E-max Crown",
        description:
          "Lithium disilicate all-ceramic system with excellent esthetics, durability, and strength. Perfect for cosmetic dentistry applications.",
      },
      {
        image: "cb3.jpg",
        title: "PFM Crown",
        description:
          "Reliable metal-ceramic bond with high thermal stability. Biocompatible, corrosion-resistant, and designed with CAD/CAM technology.",
      },
      {
        image: "cb4.jpg",
        title: "Implant Crown",
        description:
          "Surgical implant replacement with crown placement that looks and functions like a normal tooth. Durable and natural appearance.",
      },
      {
        image: "cb5.jpg",
        title: "Full Metal Crown",
        description:
          "Durable metal crowns ideal for posterior teeth. Exceptional strength and longevity with minimal tooth preparation required.",
      },
      {
        image: "cb6.jpg",
        title: "Temporary Crown",
        description:
          "Protective temporary crowns while permanent restoration is being fabricated. Comfortable fit and natural appearance.",
      },
      {
        image: "cb7.jpg",
        title: "Bridge (3 Unit)",
        description:
          "Fixed dental bridge to replace missing teeth. Natural look and feel with excellent strength and stability.",
      },
      {
        image: "cb8.jpg",
        title: "Maryland Bridge",
        description:
          "Conservative bridge option with minimal tooth preparation. Ideal for anterior teeth replacement with strong bonding.",
      },
    ],
    dentures: [
      {
        image: "Dentures.png",
        title: "Complete Dentures",
        description:
          "Full arch prosthetic devices to replace all missing teeth. Custom-fitted for comfort and natural appearance.",
      },
      {
        image: "Flexible.png",
        title: "Flexible Dentures",
        description:
          "Soft, transparent base dentures. Easy and comfortable to use, non-brittle, and non-allergic. No metallic clips needed.",
      },
      {
        image: "Dentures.png",
        title: "Partial Dentures",
        description:
          "Replace multiple missing teeth with removable partial dentures. Metal or acrylic framework for stability.",
      },
      {
        image: "Flexible.png",
        title: "Valplast Dentures",
        description:
          "Premium flexible denture option with superior comfort. Virtually invisible clasps and lightweight design.",
      },
    ],
    orthodontics: [
      {
        image: "Hawley_Retainer_1.jpg",
        title: "Hawley Retainer",
        description:
          "Classic removable orthodontic retainer. Durable wire and acrylic design to maintain teeth alignment after braces.",
      },
      {
        image: "Hawley_Retainer_5.jpeg",
        title: "Hawley Retainer",
        description:
          "Classic removable orthodontic retainer. Durable wire and acrylic design to maintain teeth alignment after braces.",
      },
      {
        image: "Hawley_Retainer_6.jpeg",
        title: "Hawley Retainer",
        description:
          "Classic removable orthodontic retainer. Durable wire and acrylic design to maintain teeth alignment after braces.",
      },
      {
        image: "Hawley_Retainer_7.jpeg",
        title: "Hawley Retainer",
        description:
          "Classic removable orthodontic retainer. Durable wire and acrylic design to maintain teeth alignment after braces.",
      },
      {
        image: "Hawley_Retainer_8.jpeg",
        title: "Hawley Retainer",
        description:
          "Classic removable orthodontic retainer. Durable wire and acrylic design to maintain teeth alignment after braces.",
      },
      {
        image: "Hawley_Retainer_3.jpg",
        title: "Fixed Retainer",
        description:
          "Permanent wire retainer bonded to teeth. Long-term retention solution with minimal maintenance required.",
      },
      {
        image: "Hawley_Retainer_2.jpg",
        title: "Clear Retainer",
        description:
          "Transparent orthodontic retainer for discreet wear. Comfortable and effective for maintaining tooth position.",
      },
      {
        image: "Hawley_Retainer_4.jpg",
        title: "Spring Retainer",
        description:
          "Active retainer with springs for minor tooth movement. Ideal for fine-tuning alignment after orthodontic treatment.",
      },
    ],
    other: [
      {
        image: "E-max.png",
        title: "Veneers",
        description:
          "Ultra-thin porcelain shells for smile enhancement. Natural appearance with stain-resistant properties.",
      },
      {
        image: "Implant.png",
        title: "Implant Abutments",
        description:
          "Custom abutments for dental implants. Precision-crafted for optimal fit and long-term stability.",
      },
      {
        image: "PFM.png",
        title: "Night Guards",
        description:
          "Custom occlusal guards to protect teeth from grinding. Comfortable fit for overnight wear.",
      },
      {
        image: "Zirconia.png",
        title: "Inlays & Onlays",
        description:
          "Indirect restorations for damaged teeth. Conservative treatment preserving maximum tooth structure.",
      },
    ],
  };

  constructor(private _router: Router, private host: ElementRef) {}

  /* ---------- Sticky nav shadow / condensed state ---------- */
  @HostListener("window:scroll")
  onWindowScroll() {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    this.scrolled = y > 40;
    this.showToTop = y > 500;
  }

  /* ---------- Scroll-reveal on enter viewport ---------- */
  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: reveal everything immediately
      this.host.nativeElement
        .querySelectorAll(".reveal")
        .forEach((el: Element) => el.classList.add("reveal--visible"));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    this.host.nativeElement
      .querySelectorAll(".reveal")
      .forEach((el: Element) => this.observer?.observe(el));

    // motion.dev animations for the redesigned Facilities & About sections
    try {
      this.motionReady = typeof inView === "function";
      if (this.motionReady) {
        this.setupMotion();
        setTimeout(() => this.moveTabIndicator(false), 90);
        // reposition once fonts have settled (widths can shift)
        setTimeout(() => this.moveTabIndicator(false), 400);
      }
    } catch {
      this.motionReady = false;
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /* ---------- motion.dev helpers ---------- */

  private setupMotion(): void {
    const host = this.host.nativeElement as HTMLElement;
    host.querySelector(".lp")?.classList.add("motion-on");

    this.motionReveal(host.querySelector(".facilities"), ".section-head, .tabs-wrap", 0.12, 0.2);
    this.motionReveal(host.querySelector(".about"), ".about__intro, .acard", 0.09, 0.15);
  }

  /** Reveal children with a staggered fade + rise the first time the container scrolls into view. */
  private motionReveal(
    container: Element | null,
    childSelector: string,
    staggerBy: number,
    amount: number,
  ): void {
    if (!container) return;
    let stop: (() => void) | undefined;
    stop = inView(
      container,
      () => {
        const targets = Array.from(
          container.querySelectorAll<HTMLElement>(childSelector),
        );
        if (targets.length) {
          this.runReveal(targets, staggerBy, 0.6, 24);
        }
        if (stop) stop();
      },
      { amount },
    );
  }

  private runReveal(
    targets: HTMLElement[],
    staggerBy: number,
    duration: number,
    rise: number,
  ): void {
    const controls = animate(
      targets,
      { opacity: [0, 1], y: [rise, 0] },
      { delay: stagger(staggerBy), duration, easing: [0.22, 1, 0.36, 1] },
    );
    // Pin the resting state so the cards stay visible and hover transforms work.
    controls.finished
      .then(() =>
        targets.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "";
        }),
      )
      .catch(() => {});
  }

  /** Slide the segmented-control indicator under the active tab. */
  private moveTabIndicator(withAnim: boolean): void {
    const host = this.host.nativeElement as HTMLElement;
    const tabsEl = host.querySelector(".tabs") as HTMLElement | null;
    const indicator = host.querySelector(".tab-indicator") as HTMLElement | null;
    const activeBtn = host.querySelector(".tab.active") as HTMLElement | null;
    if (!tabsEl || !indicator || !activeBtn) return;

    tabsEl.classList.add("js-tabs");
    const left = activeBtn.offsetLeft;
    const width = activeBtn.offsetWidth;

    if (withAnim && this.motionReady) {
      animate(
        indicator,
        { left: `${left}px`, width: `${width}px` },
        { duration: 0.45, easing: [0.34, 1.56, 0.64, 1] },
      );
    } else {
      indicator.style.left = `${left}px`;
      indicator.style.width = `${width}px`;
    }
    indicator.style.opacity = "1";
  }

  @HostListener("window:resize")
  onWindowResize(): void {
    if (this.motionReady) this.moveTabIndicator(false);
  }

  /* ---------- Navigation helpers ---------- */
  go(el: HTMLElement) {
    this.closeMenu();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  scrollTop() {
    this.closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Back-to-top with a "tooth launch" click animation */
  launchToTop() {
    this.launching = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => (this.launching = false), 700);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu() {
    this.mobileMenuOpen = false;
  }

  /** kept for backward compatibility with existing template hooks */
  scroll(el: HTMLElement) {
    this.go(el);
  }

  navigateToSegment() {
    this._router.navigate([], { fragment: "mapComponent" });
  }

  setActiveTab(tab: string) {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
    // slide the segmented-control indicator once the active class is applied
    if (this.motionReady) {
      setTimeout(() => this.moveTabIndicator(true), 0);
    }
  }

  getAllActiveFacilities() {
    return (
      this.facilities[this.activeTab as keyof typeof this.facilities] || []
    );
  }

  pauseMarquee() {
    this.isMarqueePaused = true;
  }

  resumeMarquee() {
    this.isMarqueePaused = false;
  }
}
