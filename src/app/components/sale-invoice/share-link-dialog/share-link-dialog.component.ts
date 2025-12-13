import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-share-link-dialog",
  templateUrl: "./share-link-dialog.component.html",
  styleUrls: ["./share-link-dialog.component.scss"],
})
export class ShareLinkDialogComponent {
  copied = false;

  constructor(
    public dialogRef: MatDialogRef<ShareLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { link: string }
  ) {}

  copyLink(): void {
    navigator.clipboard.writeText(this.data.link).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
