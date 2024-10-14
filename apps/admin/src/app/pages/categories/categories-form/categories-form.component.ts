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
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CategoriesService, Category } from '@frontend/products';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'admin-categories-form',
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
    ColorPickerModule,
  ],
  providers: [MessageService],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.scss',
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isSubmitted = false;
  editMode = false;
  currentCategoryId = '';
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });
    this._checkEditMode();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    } else {
      const category: Category = {
        id: this.currentCategoryId,
        name: this.form.controls['name'].value,
        icon: this.form.controls['icon'].value,
        color: this.form.controls['color'].value,
      };
      if (this.editMode) {
        this._updateCategory(category);
      } else {
        this._addCategory(category);
      }
    }
  }
  onCancle() {
    this.location.back();
  }
  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitted = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is created',
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
          detail: 'Category is not created',
        });
      },
    });
  }
  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitted = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated',
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
          detail: 'Category is not updated',
        });
      },
    });
  }
  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService.getCategoriyId(params['id']).subscribe({
          next: (category) => {
            this.form.controls['name'].setValue(category.name);
            this.form.controls['icon'].setValue(category.icon);
            this.form.controls['color'].setValue(category.color);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not found',
            });
          },
        });
      }
    });
  }
}
