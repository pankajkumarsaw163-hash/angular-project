import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-toasts></app-toasts>
      <header>
        <h1>Customer Manager</h1>
        <p class="subtitle">Create, view, update and delete customers</p>
      </header>

      <section class="main">
        <div class="form-panel">
          <app-customer-form [customer]="selected" (saved)="onSaved($event)" (cancel)="onCancel()"></app-customer-form>
        </div>

        <div class="list-panel">
          <div class="list-header">
            <input placeholder="Search by email" [(ngModel)]="searchEmail" (keyup.enter)="search()" />
            <button class="btn" (click)="search()">Search</button>
            <button class="btn" (click)="loadAll()">Refresh</button>
          </div>

          <app-customer-list [customers]="customers" (edit)="onEdit($event)" (delete)="onDelete($event)"></app-customer-list>
        </div>
      </section>
    </div>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  customers: Customer[] = [];
  selected: Customer | null = null;
  searchEmail = '';

  constructor(private svc: CustomerService, private toast: ToastService) {}

  ngOnInit(): void { this.loadAll(); }

  loadAll() {
    this.svc.getAll().subscribe({ next: data => this.customers = data, error: e => this.toast.show('Load failed', 'error') });
  }

  onSaved(c: Customer) {
    if ((c as any).id) {
      // update
      this.svc.update((c as any).id, c).subscribe({ next: () => { this.toast.show('Updated', 'success'); this.loadAll(); this.selected = null }, error: () => this.toast.show('Update failed','error') });
    } else {
      this.svc.create(c).subscribe({ next: () => { this.toast.show('Created', 'success'); this.loadAll(); this.selected = null }, error: () => this.toast.show('Create failed','error') });
    }
  }

  onEdit(c: Customer) { this.selected = c; window.scrollTo({ top: 0, behavior: 'smooth' }); }

  onDelete(id?: number) {
    if (!id || !confirm('Delete this customer?')) return;
    console.debug('[AppComponent] onDelete() -> calling delete for id', id);
    this.svc.delete(id).subscribe({
      next: (res) => { console.debug('[AppComponent] delete next', res); this.toast.show('Deleted','success'); this.loadAll(); },
      error: (err) => { console.error('[AppComponent] delete error', err); this.toast.show('Delete failed','error'); }
    });
  }

  onCancel() { this.selected = null }

  search() {
    if (!this.searchEmail) { this.loadAll(); return; }
    this.svc.searchByEmail(this.searchEmail).subscribe({ next: c => this.customers = c ? [c] : [], error: () => this.toast.show('Search failed','error') });
  }
}
