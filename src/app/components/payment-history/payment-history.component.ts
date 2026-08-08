import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { PaymentSummaryService } from "../../services/payment-summary.service";
import { ApiConfig } from "../../utility/apiConfig";

@Component({
  selector: "app-payment-history",
  templateUrl: "./payment-history.component.html",
  styleUrls: ["./payment-history.component.scss"],
})
export class PaymentHistoryComponent implements OnInit {
  apiConfig = ApiConfig;
  dataSource = new MatTableDataSource<any>([]);
  loading = false;

  // date-range report filter
  rangeForm!: FormGroup;
  startDate = "";
  endDate = "";
  reportHref = "";

  // server-side pagination meta
  firstPage = 1;
  currentPage = 1;
  lastPage = 1;
  total = 0;

  displayedColumns: string[] = [
    "client",
    "doctor",
    "total_amount",
    "payment_date",
    "actions",
  ];

  constructor(
    private paymentSummaryService: PaymentSummaryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const haystack = [
        data?.client?.name,
        data?.client?.client_no,
        data?.client?.doctor_name,
        data?.total_amount,
        data?.payment_date,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(filter);
    };
  }

  ngOnInit(): void {
    // Default the range to the current month (start → end) for an out-of-the-box report.
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.rangeForm = this.formBuilder.group({
      startDate: [monthStart],
      endDate: [monthEnd],
    });
    this.startDate = this.toYmd(monthStart);
    this.endDate = this.toYmd(monthEnd);
    this.updateReportHref();

    this.load(1);
  }

  onStartDateChange(): void {
    this.startDate = this.toYmd(this.rangeForm.value.startDate);
    this.updateReportHref();
  }

  onEndDateChange(): void {
    this.endDate = this.toYmd(this.rangeForm.value.endDate);
    this.updateReportHref();
  }

  get rangeReady(): boolean {
    return !!this.startDate && !!this.endDate;
  }

  formatDisplayDate(value: any): string {
    if (!value) return "Select date";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Select date";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  private toYmd(value: any): string {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "";
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, "0");
    const d = `${date.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  private updateReportHref(): void {
    this.reportHref = this.rangeReady
      ? `${this.apiConfig.downloadPdfUrl}payment-summaries/start/${this.startDate}/end/${this.endDate}`
      : "";
  }

  load(page: number): void {
    this.loading = true;
    this.paymentSummaryService.getPaymentSummaries(page).subscribe({
      next: (resp: any) => {
        this.dataSource.data = resp?.data || [];
        this.currentPage = resp?.current_page || 1;
        this.lastPage = resp?.last_page || 1;
        this.total = resp?.total || this.dataSource.data.length;
        this.loading = false;
      },
      error: (error: any) => {
        console.error("Error loading payment summaries:", error);
        this.dataSource.data = [];
        this.loading = false;
      },
    });
  }

  applyFilter(target: EventTarget | null): void {
    const value = (target as HTMLInputElement)?.value || "";
    this.dataSource.filter = value.trim().toLowerCase();
  }

  viewDetails(id: number): void {
    this.router.navigate(["/payment-history", id]).then();
  }

  onNext(): void {
    if (this.currentPage < this.lastPage) this.load(this.currentPage + 1);
  }

  onPrev(): void {
    if (this.currentPage > this.firstPage) this.load(this.currentPage - 1);
  }

  onPage(page: number): void {
    if (page !== this.currentPage) this.load(page);
  }

  formatCurrency(amount: number): string {
    return "RM " + (amount || 0).toFixed(2);
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
