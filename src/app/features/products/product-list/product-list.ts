import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TagModule,
    ToastModule,
    DialogModule,
    InputTextModule
  ],
  providers: [MessageService],
  templateUrl: './product-list.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  isAdmin: boolean = false;
  editDialog: boolean = false;

  selectedProduct!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.isAdmin = this.authService.isAdmin();

    this.loadProducts();

  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('שגיאה בטעינת מוצרים:', err);
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'לא ניתן לטעון את רשימת המוצרים' });
        this.loading = false;
      }
    });
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'הצלחה',
          detail: 'הכרטיס נוסף לסל הקניות שלך',
          life: 3000
        });
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.messageService.add({
            severity: 'warn',
            summary: 'נדרשת התחברות',
            detail: 'יש להתחבר למערכת כדי לבצע רכישה'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'שגיאה',
            detail: 'אירעה תקלה בהוספה לסל'
          });
        }
      }
    });
  }

  viewWinner(productId: number): void {
    // כאן תוכלי להוסיף ניתוב לדף הזוכה או פתיחת Dialog
    console.log('צפייה בזוכה עבור מוצר:', productId);
  }
  runLottery(productId: number): void {

    this.productService.runLottery(productId)
      .subscribe(() => {

        this.messageService.add({
          severity: 'success',
          summary: 'הגרלה בוצעה'
        });

        this.loadProducts();

      });

  }

  updateGift(product: Product): void {

    this.selectedProduct = { ...product };

    this.editDialog = true;

  }
  saveGift(): void {

    this.productService.updateProduct(this.selectedProduct)
      .subscribe({

        next: () => {

          this.messageService.add({
            severity: 'success',
            summary: 'נשמר בהצלחה'
          });

          this.editDialog = false;

          this.loadProducts();

        }

      });

  }
  deleteGift(): void {

    if (!this.selectedProduct) return;

    if (!confirm("למחוק מתנה זו?")) return;

    this.productService.deleteProduct(this.selectedProduct.id)
      .subscribe({

        next: () => {

          this.messageService.add({
            severity: 'success',
            summary: 'המתנה נמחקה'
          });

          this.editDialog = false;

          this.loadProducts();

        }

      });

  }



}