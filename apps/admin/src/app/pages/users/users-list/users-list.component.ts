// eslint-disable-next-line @nx/enforce-module-boundaries
import { UsersService } from './../../../../../../../libs/users/src/lib/services/users.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { User } from './../../../../../../../libs/users/src/lib/models/user';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import * as contriesLib from 'i18n-iso-countries';

@Component({
  selector: 'admin-users-list',
  standalone: true,
  imports: [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    RouterLink,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }
  getCountryName(countryKey: string): any {
    if (countryKey) return contriesLib.getName(countryKey, 'en');
  }
  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.usersService.deleteUser(userId).subscribe({
          next: () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!',
            });
          },
        });
      },
      reject: () => {
        return;
      },
    });
  }
  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }
}
