import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.data;
        } else {
          this.error = 'Error al cargar los productos';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión con el servidor';
        this.loading = false;
      }
    });
  }

  saveProduct(id: number): void {
    this.productService.saveProduct(id).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Producto guardado exitosamente');
        } else {
          alert('Error al guardar el producto: ' + response.message);
        }
      },
      error: (err) => {
        alert('Error de conexión al intentar guardar');
      }
    });
  }
}