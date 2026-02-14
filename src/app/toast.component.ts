import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from './toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <div class="toasts">
      <div *ngFor="let t of toasts" class="toast" [ngClass]="t.level">
        <div class="msg">{{ t.message }}</div>
        <button class="close" (click)="remove(t.id)">&times;</button>
      </div>
    </div>
  `,
  styles: [`
    .toasts { position: fixed; right: 16px; top: 16px; z-index: 9999; display:flex; flex-direction:column; gap:8px }
    .toast { padding:10px 12px; border-radius:6px; color:#fff; min-width:200px; box-shadow:0 6px 18px rgba(0,0,0,0.08); display:flex; justify-content:space-between; align-items:center }
    .toast.info { background:#3b82f6 }
    .toast.success { background:#10b981 }
    .toast.error { background:#ef4444 }
    .toast.warning { background:#f59e0b }
    .toast .close { background:transparent; border:0; color:rgba(255,255,255,0.9); font-size:18px; cursor:pointer }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];
  constructor(private svc: ToastService) {}
  ngOnInit(): void {
    this.svc.changes$.subscribe(t => this.toasts = t);
  }
  remove(id: number) { this.svc.remove(id); }
}
