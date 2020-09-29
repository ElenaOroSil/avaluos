import { Component } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <img
        class="matero-user-panel-avatar"
        src="assets/images/avatars/avatar.jpg"
        alt="avatar"
        width="64"
      />
      <h4 class="matero-user-panel-name">Elena</h4>
      <h5 class="matero-user-panel-email">elena@oneproject.com</h5>
      <div class="matero-user-panel-icons">
        <a routerLink="/profile/settings" mat-icon-button>
        <mat-icon>account_circle</mat-icon>
        </a>
        <a routerLink="/auth/login" mat-icon-button>
          <mat-icon>exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
})
export class UserPanelComponent {}
