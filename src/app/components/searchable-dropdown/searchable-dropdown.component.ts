// @ts-nocheck
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from "@angular/core";
import { MatFormFieldAppearance } from "@angular/material/form-field";

export interface DropdownOption {
  id: number | string;
  name: string;
  secondaryText?: string;
}

@Component({
  selector: "app-searchable-dropdown",
  templateUrl: "./searchable-dropdown.component.html",
  styleUrls: ["./searchable-dropdown.component.scss"],
})
export class SearchableDropdownComponent implements OnInit {
  @Input() options: DropdownOption[] = [];
  @Input() label: string = "Select an option";
  @Input() placeholder: string = "Search...";
  @Input() appearance: MatFormFieldAppearance = "outline";
  @Output() optionSelected = new EventEmitter<DropdownOption>();

  @ViewChild('searchInput') searchInput: ElementRef;

  filteredOptions: DropdownOption[] = [];
  selectedValue: any = null;
  searchText: string = "";

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  ngOnChanges(): void {
    this.filteredOptions = this.options;
  }

  onSearchKeyup(event: KeyboardEvent): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchText = searchValue;

    if (!searchValue) {
      this.filteredOptions = this.options;
      return;
    }

    this.filteredOptions = this.options.filter(
      (option) =>
        option.name.toLowerCase().includes(searchValue) ||
        (option.secondaryText &&
          option.secondaryText.toLowerCase().includes(searchValue))
    );
  }

  onSelectionChange(selectedId: any): void {
    const selectedOption = this.options.find((opt) => opt.id === selectedId);
    if (selectedOption) {
      this.optionSelected.emit(selectedOption);
    }
  }

  onOpenedChange(opened: boolean): void {
    if (opened) {
      this.searchText = "";
      this.filteredOptions = this.options;
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.nativeElement.value = "";
          this.searchInput.nativeElement.focus();
        }
      }, 100);
    }
  }

  getDisplayText(option: DropdownOption): string {
    if (option.secondaryText) {
      return `${option.name}  (${option.secondaryText})`;
    }
    return option.name;
  }
}
