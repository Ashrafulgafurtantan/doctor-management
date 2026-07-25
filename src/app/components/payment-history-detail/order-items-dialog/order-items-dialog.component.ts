import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-order-items-dialog",
  templateUrl: "./order-items-dialog.component.html",
  styleUrls: ["./order-items-dialog.component.scss"],
})
export class OrderItemsDialogComponent {
  order: any = {};
  items: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<OrderItemsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data?.order || {};
    this.items = (this.order?.orderitems || []).map((it: any) => ({
      name: it?.item?.name || "-",
      description: it?.description || "",
      quantity: Number(it?.quantity) || 0,
      price: Number(it?.item?.price) || 0,
    }));
  }

  get additionalPrice(): number {
    return Number(this.order?.additional_price) || 0;
  }

  lineTotal(it: any): number {
    return it.quantity * it.price;
  }

  itemsSubtotal(): number {
    return this.items.reduce((sum, it) => sum + this.lineTotal(it), 0);
  }

  totalQuantity(): number {
    return this.items.reduce((sum, it) => sum + it.quantity, 0);
  }

  formatCurrency(amount: number): string {
    return "RM " + (Number(amount) || 0).toFixed(2);
  }

  formatDate(value: string): string {
    if (!value) return "";
    const date = new Date(value.replace(" ", "T"));
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
