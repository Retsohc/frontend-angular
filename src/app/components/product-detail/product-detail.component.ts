import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (response) => {
          if (response.success) {
            this.product = response.data;
          } else {
            this.error = 'Error al cargar el producto';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error de conexión con el servidor';
          this.loading = false;
        }
      });
    }
  }

  saveProduct(): void {
    if (this.product) {
      this.productService.saveProduct(this.product.id).subscribe({
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
}