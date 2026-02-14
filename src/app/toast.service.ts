import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastLevel = 'info' | 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  message: string;
  level: ToastLevel;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private changes = new BehaviorSubject<Toast[]>(this.toasts.slice());
  changes$ = this.changes.asObservable();
  private seq = 1;

  show(message: string, level: ToastLevel = 'info', timeout = 4000) {
    const t: Toast = { id: this.seq++, message, level };
    this.toasts.push(t);
    // debug log so devtools can show what's emitted
    console.debug('[ToastService] show()', t);
    this.changes.next(this.toasts.slice());
    if (timeout > 0) setTimeout(() => this.remove(t.id), timeout);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.changes.next(this.toasts.slice());
  }
}
