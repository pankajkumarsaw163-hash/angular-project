import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Customer } from './customer';

@Component({
  selector: 'app-customer-list',
  template: `
    <div class="panel">
      <div class="list-controls">
        <label>Page size:
          <select [(ngModel)]="pageSize" (change)="page=0; updateView()">
            <option *ngFor="let s of [5,10,20,50]" [value]="s">{{s}}</option>
          </select>
        </label>
      </div>

      <table class="customers">
        <thead>
          <tr>
            <th (click)="sort('id')">ID</th>
            <th (click)="sort('name')">Name</th>
            <th (click)="sort('emailId')">Email</th>
            <th (click)="sort('income')">Income</th>
            <th>PAN</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of view">
            <td>{{c.id}}</td>
            <td>{{c.name}}</td>
            <td>{{c.emailId}}</td>
            <td>{{c.income | number:'1.0-2'}}</td>
            <td>{{c.panNumber}}</td>
            <td>{{c.phoneNumber}}</td>
            <td class="actions-col">
              <button class="btn" (click)="edit.emit(c)">Edit</button>
              <button class="btn danger" (click)="delete.emit(c.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pager">
        <button class="btn" (click)="prev()" [disabled]="page===0">Prev</button>
        <span>Page {{page+1}} / {{pages}}</span>
        <button class="btn" (click)="next()" [disabled]="page>=pages-1">Next</button>
      </div>
    </div>
  `,
  styles: [``]
})
export class CustomerListComponent implements OnChanges {
  @Input() customers: Customer[] = [];
  @Output() edit = new EventEmitter<Customer>();
  @Output() delete = new EventEmitter<number>();

  view: Customer[] = [];
  page = 0;
  pageSize = 10;
  pages = 1;
  sortKey: keyof Customer | '' = '';
  sortDir = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customers']) this.updateView();
  }

  updateView() {
    let arr = [...(this.customers || [])];
    if (this.sortKey) {
      arr.sort((a,b) => {
        const va = (a as any)[this.sortKey];
        const vb = (b as any)[this.sortKey];
        if (va == null) return 1;
        if (vb == null) return -1;
        return va > vb ? this.sortDir : va < vb ? -this.sortDir : 0;
      });
    }
    this.pages = Math.max(1, Math.ceil(arr.length / this.pageSize));
    this.page = Math.min(this.page, this.pages - 1);
    const start = this.page * this.pageSize;
    this.view = arr.slice(start, start + this.pageSize);
  }

  prev() { if (this.page>0) { this.page--; this.updateView(); } }
  next() { if (this.page < this.pages-1) { this.page++; this.updateView(); } }

  sort(key: keyof Customer) {
    if (this.sortKey === key) this.sortDir = -this.sortDir;
    else { this.sortKey = key; this.sortDir = 1; }
    this.updateView();
  }
}
