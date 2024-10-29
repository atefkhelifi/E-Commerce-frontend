import { Component, Input, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'lib-gallery',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  selectedImage!: string;

  @Input() images: any[] = [];

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImage = this.images[0];
    }
  }
  changeSelectedImage(image: string) {
    this.selectedImage = image;
  }
  get hasImages() {
    return this.images?.length > 0;
  }
}
