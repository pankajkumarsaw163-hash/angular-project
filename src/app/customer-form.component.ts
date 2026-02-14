import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Customer } from './customer';

@Component({
  selector: 'app-customer-form',
  template: `
    <div class="panel">
      <h3>{{ customer?.id ? 'Edit Customer' : 'New Customer' }}</h3>
      <form #f="ngForm" (ngSubmit)="submit(f)">
        <label>Name
          <input name="name" [(ngModel)]="local.name" required />
          <small class="err" *ngIf="f.submitted && !local.name">Name is required</small>
        </label>

        <label>Income
          <input name="income" type="number" [(ngModel)]="local.income" required min="0" />
          <small class="err" *ngIf="f.submitted && (local.income === null || local.income === undefined)">Income is required</small>
        </label>

        <label>PAN Number
          <input name="panNumber" [(ngModel)]="local.panNumber" maxlength="10" required />
          <small class="err" *ngIf="f.submitted && !local.panNumber">PAN is required</small>
        </label>

        <label>Email
          <input name="emailId" type="email" [(ngModel)]="local.emailId" required />
          <small class="err" *ngIf="f.submitted && !local.emailId">Email is required</small>
        </label>

        <label>Phone
          <input name="phoneNumber" [(ngModel)]="local.phoneNumber" maxlength="10" required pattern="[0-9]{10}" />
          <small class="err" *ngIf="f.submitted && !local.phoneNumber">Phone is required</small>
        </label>

        <div class="actions">
          <button class="btn primary" type="submit">{{ customer?.id ? 'Update' : 'Create' }}</button>
          <button class="btn" type="button" (click)="cancel.emit()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [``]
})
export class CustomerFormComponent implements OnChanges {
  @Input() customer: Customer | null = null;
  @Output() saved = new EventEmitter<Customer>();
  @Output() cancel = new EventEmitter<void>();

  local: Customer = { name: '', income: 0, panNumber: '', emailId: '', phoneNumber: '' };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer']) this.local = this.customer ? { ...this.customer } : { name: '', income: 0, panNumber: '', emailId: '', phoneNumber: '' };
  }

  submit(form: any) {
    if (form.invalid) return;
    const payload: Customer = { ...this.local };
    this.saved.emit(payload);
  }
}
