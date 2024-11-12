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
import { ProductsService, CategoriesService } from '@frontend/products';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'admin-products-form',
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
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
  ],
  providers: [MessageService],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isSubmitted = false;
  editMode = false;
  currentProductId = '';
  categories: any = [];
  imageDisplay: any = '';
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    } else {
      const productFormData = new FormData();
      Object.keys(this.form.value).forEach((key) => {
        productFormData.append(key, this.form.value[key]);
      });

      if (this.editMode) {
        this._updateProduct(productFormData);
      } else {
        this._addProduct(productFormData);
      }
    }
  }
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onCancle() {
    this.location.back();
  }
  private _addProduct(product: FormData) {
    this.productsService.createProduct(product).subscribe({
      next: () => {
        this.form.reset();
        this.isSubmitted = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.get('name')} is created`,
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
          detail: 'Product is not created',
        });
      },
    });
  }
  private _updateProduct(product: FormData) {
    this.productsService
      .updateProduct(this.currentProductId, product)
      .subscribe({
        next: () => {
          this.form.reset();
          this.isSubmitted = false;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated',
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
            detail: 'Product is not updated',
          });
        },
      });
  }
  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productsService.getProductId(params['id']).subscribe({
          next: (product: any) => {
            this.form.controls['name'].setValue(product.name);
            this.form.controls['brand'].setValue(product.brand);
            this.form.controls['category'].setValue(product.category.id);
            this.form.controls['price'].setValue(product.price);
            this.form.controls['countInStock'].setValue(product.countInStock);
            this.form.controls['isFeatured'].setValue(product.isFeatured);
            this.form.controls['description'].setValue(product.description);
            this.form.controls['richDescription'].setValue(
              product.richDescription
            );
            this.imageDisplay = product.image;
            this.form.controls['image'].setValidators([]);
            this.form.controls['image'].updateValueAndValidity();
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
