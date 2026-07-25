import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
} from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

/**
 * Hides write-action buttons (create / edit / delete / status-change /
 * mark-as-paid) for users whose role is `read_only`.
 *
 * The selector matches the existing action-button CSS classes, so the
 * directive attaches automatically wherever those buttons are used — no
 * per-template changes are required.
 *
 * Read-only-safe buttons (view, print, share, search, pagination, back,
 * cancel, form-submit on create pages) keep their own classes and are
 * intentionally NOT matched here. Note that `action-btn` (the shared base
 * class used by print/view too) is deliberately excluded — only the
 * write-action modifier classes are targeted.
 */
@Directive({
  selector:
    ".create-btn, .create-attendance, .create-button-on-list-page, .edit-btn, .delete-btn, .delete-item-btn, .status-edit-btn, .deliver-btn, .btn-mark-paid, .mark-paid-btn, .mark-selected-paid-btn",
})
export class ReadonlyActionHideDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private auth: AuthenticationService,
  ) {}

  ngOnInit(): void {
    if (this.auth.isReadOnly()) {
      // Use the "important" flag so this wins over component styles that set
      // `display: ... !important` on these buttons (e.g. .status-edit-btn).
      this.renderer.setStyle(
        this.el.nativeElement,
        "display",
        "none",
        RendererStyleFlags2.Important,
      );
    }
  }
}
