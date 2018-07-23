import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="message"
         [ngClass]="{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }">
      {{ message.text }}
    </div>
  `
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private service: AlertService) {
  }

  ngOnInit(): void {
    this.subscription = this.service.getMessage().subscribe(message => this.message = message);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
