import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiConfig } from "../../utility/apiConfig";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  apiConfig = ApiConfig;

  constructor(private _router: Router) {}

  ngOnInit(): void {}
  currentYear = new Date().getFullYear();

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  navigateToSegment() {
    this._router.navigate([], { fragment: "mapComponent" });
  }
}
