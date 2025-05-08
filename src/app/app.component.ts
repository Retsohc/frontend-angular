import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { environment } from './services/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  products: any[] = [];
  selectedProduct: any = null;
  isEditing: boolean = false;
  private apiUrl = environment.apiUrl;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  viewProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.selectedProduct = data;
        this.isEditing = false;
      },
      (error) => {
        console.error('Error al cargar el producto:', error);
      }
    );
  }

  editProduct(product: any): void {
    this.selectedProduct = { ...product };
    this.isEditing = true; 
  }

  saveProduct(): void {
    this.productService
      .updateProduct(this.selectedProduct.id, this.selectedProduct)
      .subscribe(
        (data) => {
          console.log('Producto actualizado:', data);
          this.loadProducts();
          this.selectedProduct = null;
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(
        (data) => {
          console.log('Producto eliminado:', data);
          this.loadProducts();
          this.selectedProduct = null;
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }
}
