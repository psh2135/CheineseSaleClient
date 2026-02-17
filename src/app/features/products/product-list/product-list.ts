// import { Component, OnInit } from '@angular/core';
// import { CommonModule, CurrencyPipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Product } from '../../../core/models/product.model';
// import { ProductService } from '../../../core/services/product';
// import { CartService } from '../../../core/services/cart';
// import { AuthService } from '../../../core/services/auth';
// import { Router } from '@angular/router';

// // PrimeNG Imports
// import { CardModule } from 'primeng/card';
// import { ButtonModule } from 'primeng/button';
// import { TagModule } from 'primeng/tag';
// import { MessageService } from 'primeng/api';
// import { ToastModule } from 'primeng/toast';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { RaffleStateService } from '../../../core/services/RaffleStateService';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     CardModule,
//     ButtonModule,
//     TagModule,
//     ToastModule,
//     DialogModule,
//     InputTextModule
//   ],
//   providers: [MessageService],
//   templateUrl: './product-list.html',
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];
//   loading: boolean = true;
//   isAdmin: boolean = false;
//   editDialog: boolean = false;

//   selectedProduct!: Product;
//   isLocked$!: Observable<boolean>;
//   createDialog: boolean = false;
//   newProduct!: Product;

//   constructor(
//     private productService: ProductService,
//     private cartService: CartService,
//     private messageService: MessageService,
//     private authService: AuthService,
//     private router: Router,
//     private raffleState: RaffleStateService
//   ) { }

//   ngOnInit(): void {

//     this.isAdmin = this.authService.isAdmin();
//     this.isLocked$ = this.raffleState.isLocked$;

//     this.loadProducts();


//   }

//   loadProducts(): void {
//     this.productService.getProducts().subscribe({
//       next: (data: Product[]) => {
//         this.products = data;
//         this.loading = false;
//       },
//       error: (err: any) => {
//         console.error('שגיאה בטעינת מוצרים:', err);
//         this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'לא ניתן לטעון את רשימת המוצרים' });
//         this.loading = false;
//       }
//     });
//   }

//   addToCart(productId: number): void {
//     this.cartService.addToCart(productId).subscribe({
//       next: () => {
//         this.messageService.add({
//           severity: 'success',
//           summary: 'הצלחה',
//           detail: 'הכרטיס נוסף לסל הקניות שלך',
//           life: 3000
//         });
//       },
//       error: (err: any) => {
//         if (err.status === 401) {
//           this.messageService.add({
//             severity: 'warn',
//             summary: 'נדרשת התחברות',
//             detail: 'יש להתחבר למערכת כדי לבצע רכישה'
//           });
//         } else {
//           this.messageService.add({
//             severity: 'error',
//             summary: 'שגיאה',
//             detail: 'אירעה תקלה בהוספה לסל'
//           });
//         }
//       }
//     });
//   }

//   viewWinner(productId: number): void {
//     this.productService.getWinner(productId).subscribe({

//       next: (user) => {
//         this.messageService.add({
//           severity: 'info',
//           summary: 'זוכה',
//           detail: `הזוכה של מתנה זו : ${user.userName}`
//         });
//       },
//       error: (err) => {
//         this.messageService.add({
//           severity: 'error',
//           summary: 'שגיאה',
//           detail: 'לא ניתן למצוא זוכה'
//         });
//       }
//     });
//   }
//   runLottery(productId: number): void {

//     this.productService.runLottery(productId)
//       .subscribe(() => {

//         this.messageService.add({
//           severity: 'success',
//           summary: 'הגרלה בוצעה'
//         });

//         this.loadProducts();

//       });

//   }

//   updateGift(product: Product): void {

//     this.selectedProduct = { ...product };

//     this.editDialog = true;

//   }
//   saveGift(): void {

//     this.productService.updateProduct(this.selectedProduct)
//       .subscribe({

//         next: () => {

//           this.messageService.add({
//             severity: 'success',
//             summary: 'נשמר בהצלחה'
//           });

//           this.editDialog = false;

//           this.loadProducts();

//         }

//       });

//   }
//   deleteGift(): void {

//     if (!this.selectedProduct) return;

//     if (!confirm("למחוק מתנה זו?")) return;

//     this.productService.deleteProduct(this.selectedProduct.id)
//       .subscribe({

//         next: () => {

//           this.messageService.add({
//             severity: 'success',
//             summary: 'המתנה נמחקה'
//           });

//           this.editDialog = false;

//           this.loadProducts();

//         }

//       });

//   }
//   openCreateDialog(): void {

//     this.newProduct = {
//       id: 0,
//       title: '',
//       description: '',
//       price: 0,
//       imageUrl: '',
//       isDrawn: false,
//       categories: []
//     };

//     this.createDialog = true;
//   }


// createGift(): void {

//   this.productService.addProduct(this.newProduct)
//     .subscribe({

//       next: () => {

//         this.messageService.add({
//           severity: 'success',
//           summary: 'מתנה נוספה'
//         });

//         this.createDialog = false;
//         this.loadProducts();
//       },

//       error: () => {
//         this.messageService.add({
//           severity: 'error',
//           summary: 'שגיאה',
//           detail: 'לא ניתן להוסיף מתנה'
//         });
//       }
//     });
// }

// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, CreateProduct } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { User } from '../../../core/models/user.model';
import { ProductService } from '../../../core/services/product';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { AdminService } from '../../../core/services/admin';
import { Router } from '@angular/router';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { RaffleStateService } from '../../../core/services/RaffleStateService';
import { Observable } from 'rxjs';

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
    InputTextModule,
    Select,
    MultiSelectModule
  ],
  providers: [MessageService],
  templateUrl: './product-list.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  isAdmin: boolean = false;
  editDialog: boolean = false;
  createDialog: boolean = false;
  filteredProducts: Product[] = [];
  selectedProduct: Product = this.getEmptyProduct();
  newProduct: CreateProduct = this.getEmptyCreateProduct();

  categories: Category[] = [];
  donors: User[] = [];
  selectedCategoryId: number | null = null;

  isLocked$!: Observable<boolean>;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private raffleState: RaffleStateService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLocked$ = this.raffleState.isLocked$;
    this.loadProducts();
    this.loadCategories();
    // טען קטגוריות ותורמים אם מנהל
    if (this.isAdmin) {
      this.loadDonors();
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
        this.filteredProducts = data; 
      },
      error: (err: any) => {
        console.error('שגיאה בטעינת מוצרים:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן לטעון את רשימת המוצרים'
        });
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('שגיאה בטעינת קטגוריות:', err);
      }
    });
  }

  loadDonors(): void {
    this.adminService.getDonors().subscribe({
      next: (data) => {
        this.donors = data;
      },
      error: (err) => {
        console.error('שגיאה בטעינת תורמים:', err);
      }
    });
  }
 onCategoryChange(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    
    if (categoryId === null) {
      // הצג הכל
      this.filteredProducts = this.products;
    } else {
      // סנן לפי קטגוריה
      this.loading = true;
      this.productService.getProductsByCategory(categoryId).subscribe({
        next: (data) => {
          this.filteredProducts = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('שגיאה בסינון:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'שגיאה',
            detail: 'לא ניתן לסנן לפי קטגוריה'
          });
          this.loading = false;
        }
      });
    }
  }

  // ✅ פונקציה לאיפוס הסינון
  clearFilter(): void {
    this.selectedCategoryId = null;
    this.filteredProducts = this.products;
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
    this.productService.getWinner(productId).subscribe({
      next: (user) => {
        this.messageService.add({
          severity: 'info',
          summary: 'זוכה',
          detail: `הזוכה של מתנה זו: ${user.userName}`
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן למצוא זוכה'
        });
      }
    });
  }

  runLottery(productId: number): void {
    this.productService.runLottery(productId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'הגרלה בוצעה'
        });
        this.loadProducts();
      },
      error: (err) => {
        console.error('שגיאה בהגרלה:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן להריץ הגרלה'
        });
      }
    });
  }

  updateGift(product: Product): void {
    this.selectedProduct = { ...product };
    this.editDialog = true;
  }

  saveGift(): void {
    this.productService.updateProduct(this.selectedProduct).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'נשמר בהצלחה'
        });
        this.editDialog = false;
        this.loadProducts();
      },
      error: (err) => {
        console.error('שגיאה בעדכון:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן לעדכן את המתנה'
        });
      }
    });
  }

  deleteGift(): void {
    if (!this.selectedProduct) return;

    if (!confirm('למחוק מתנה זו?')) return;

    this.productService.deleteProduct(this.selectedProduct.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'המתנה נמחקה'
        });
        this.editDialog = false;
        this.loadProducts();
      },
      error: (err) => {
        console.error('שגיאה במחיקה:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן למחוק את המתנה'
        });
      }
    });
  }

  openCreateDialog(): void {
    this.newProduct = this.getEmptyCreateProduct();
    this.createDialog = true;
  }

  createGift(): void {
    const productToSend = {
      ...this.newProduct,
      price: Number(this.newProduct.price)
    };

    console.log('נתוני המתנה לפני שליחה:', productToSend);

    this.productService.addProduct(productToSend).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'מתנה נוספה'
        });
        this.createDialog = false;
        this.loadProducts();
      },
      error: (err) => {
        console.error('שגיאה בהוספה:', err);
        console.error('פרטי השגיאה:', err.error);
        this.messageService.add({
          severity: 'error',
          summary: 'שגיאה',
          detail: 'לא ניתן להוסיף מתנה'
        });
      }
    });
  }

  private getEmptyProduct(): Product {
    return {
      id: 0,
      title: '',
      description: '',
      price: 0,
      imageUrl: '',
      isDrawn: false,
      donorId: 0,
      categoryIds: []
    };
  }

  private getEmptyCreateProduct(): CreateProduct {
    return {
      title: '',
      description: '',
      price: 0,
      donorId: 0,
      imageUrl: '',
      categoryIds: []
    };
  }
}