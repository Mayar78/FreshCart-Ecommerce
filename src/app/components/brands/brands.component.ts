import { Component } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';

import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgClass],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  brandsData!: IBrand[];
  brandSub!: Subscription;
  currentPage!: number;
  numOfPages!: number;
  categName!: string;

  constructor(private _BrandsService: BrandsService) {}

  getPageByNumber(page: number) {
    this.brandSub = this._BrandsService.getAllBrands(page).subscribe({
      next: (res) => {
        this.currentPage = res.metadata.currentPage;
        this.numOfPages = res.metadata.numberOfPages;
        this.brandsData = res.data;
      },
      error: (err) => console.log(err),
    });
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.numOfPages }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.brandSub = this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categName= res.data.name;
        
        
        this.brandsData = res.data;

        this.currentPage = res.metadata.currentPage;
        this.numOfPages = res.metadata.numberOfPages;
      },
    });
  }
}