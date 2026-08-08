import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { PaymentSummaryService } from "../../services/payment-summary.service";
import { OrderItemsDialogComponent } from "./order-items-dialog/order-items-dialog.component";
import { ApiConfig } from "../../utility/apiConfig";

@Component({
  selector: "app-payment-history-detail",
  templateUrl: "./payment-history-detail.component.html",
  styleUrls: ["./payment-history-detail.component.scss"],
})
export class PaymentHistoryDetailComponent implements OnInit {
  apiConfig = ApiConfig;
  id: any;
  summary: any = null;
  dataSource = new MatTableDataSource<any>([]);
  orderCount = 0;
  loading = false;

  displayedColumns: string[] = [
    "order_no",
    "patient_name",
    "items",
    "order_date",
    "delivery_date",
    "total_amount",
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private paymentSummaryService: PaymentSummaryService
  ) {
    this.dataSource.filterPredicate = (order: any, filter: string) => {
      const haystack = [
        order?.order_no,
        order?.patient_name,
        this.itemsSummary(order),
        order?.total_amount,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(filter);
    };
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.load();
  }

  load(): void {
    this.loading = true;
    this.paymentSummaryService.getPaymentSummaryById(this.id).subscribe({
      next: (resp: any) => {
        this.summary = resp;
        const orders = (resp?.payment_summary_orders || [])
          .map((pso: any) => pso.order)
          .filter((order: any) => !!order);
        this.dataSource.data = orders;
        this.orderCount = orders.length;
        this.loading = false;
      },
      error: (error: any) => {
        console.error("Error loading payment summary:", error);
        this.loading = false;
      },
    });
  }

  applyFilter(target: EventTarget | null): void {
    const value = (target as HTMLInputElement)?.value || "";
    this.dataSource.filter = value.trim().toLowerCase();
  }

  goBack(): void {
    this.location.back();
  }

  viewOrder(orderId: number): void {
    this.router.navigate(["/orders/status", orderId]).then();
  }

  itemsSummary(order: any): string {
    const items = order?.orderitems || [];
    if (!items.length) return "-";
    return items
      .map((it: any) => it?.item?.name)
      .filter((name: any) => !!name)
      .join(", ");
  }

  itemsCount(order: any): number {
    return (order?.orderitems || []).length;
  }

  openItems(order: any): void {
    if (!this.itemsCount(order)) return;
    this.dialog.open(OrderItemsDialogComponent, {
      data: { order },
      width: "660px",
      maxWidth: "94vw",
      panelClass: "oid-dialog-panel",
      autoFocus: false,
    });
  }

  ordersTotal(): number {
    return this.dataSource.data.reduce(
      (sum, order) => sum + parseFloat(order?.total_amount?.toString() || "0"),
      0
    );
  }

  formatCurrency(amount: number): string {
    return "RM " + (amount || 0).toFixed(2);
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

  formatDateTime(value: string): string {
    if (!value) return "";
    const date = new Date(value.replace(" ", "T"));
    if (isNaN(date.getTime())) return value;
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
