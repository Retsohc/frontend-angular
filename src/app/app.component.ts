import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service'; // Ajusta la ruta según tu estructura

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AppComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data.data;
      },
      error: (error: any) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
  }

  saveProduct(): void {
    if (this.selectedProduct) {
      this.productService.saveExternalProduct(this.selectedProduct.id).subscribe({
        next: (data: any) => {
          console.log('Producto guardado:', data);
        },
        error: (error: any) => {
          console.error('Error al guardar producto:', error);
        }
      });
    }
  }
}