import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UsersService } from 'libs/users/src/lib/services/users.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { User } from 'libs/users/src/lib/models/user';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import * as contriesLib from 'i18n-iso-countries';
import * as en from 'i18n-iso-countries/langs/en.json';
//declare const require: any;
@Component({
  selector: 'admin-users-form',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputNumberModule,
    InputSwitchModule,
    DropdownModule,
    InputMaskModule,
  ],
  providers: [MessageService],

  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
})
export class UsersFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  countries: any = [];

  isSubmitted = false;
  editMode = false;
  currentUserId = '';
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
    this._getCountries();
    this._checkEditMode();
  }
  private _getCountries() {
    contriesLib.registerLocale(en);

    this.countries = Object.entries(
      contriesLib.getNames('EN', { select: 'official' })
    ).map((entry) => {
      return {
        name: entry[1],
        id: entry[0],
      };
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    } else {
      const user: User = {
        id: this.currentUserId,
        name: this.form.controls['name'].value,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        phone: this.form.controls['phone'].value,
        isAdmin: this.form.controls['isAdmin'].value,
        street: this.form.controls['street'].value,
        apartment: this.form.controls['apartment'].value,
        zip: this.form.controls['zip'].value,
        city: this.form.controls['city'].value,
        country: this.form.controls['country'].value,
      };
      if (this.editMode) {
        this._updateUser(user);
      } else {
        this._addUser(user);
      }
    }
  }
  onCancle() {
    this.location.back();
  }
  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitted = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is created',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created',
        });
      },
    });
  }
  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitted = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated',
        });
      },
    });
  }
  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params['id']) {
        console.log('here');
        this.editMode = true;
        this.currentUserId = params['id'];
        this.usersService.getUserId(params['id']).subscribe({
          next: (user) => {
            console.log(user);
            this.form.controls['name'].setValue(user.name);
            this.form.controls['email'].setValue(user.email);
            this.form.controls['password'].setValue(user.password);
            this.form.controls['phone'].setValue(user.phone);
            this.form.controls['isAdmin'].setValue(user.isAdmin);
            this.form.controls['street'].setValue(user.street);
            this.form.controls['apartment'].setValue(user.apartment);
            this.form.controls['zip'].setValue(user.zip);
            this.form.controls['city'].setValue(user.city);
            this.form.controls['country'].setValue(user.country);
            this.form.controls['password'].setValidators([]);
            this.form.controls['password'].updateValueAndValidity();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not found',
            });
          },
        });
      }
    });
  }
}
