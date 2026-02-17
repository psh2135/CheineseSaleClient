// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CardModule } from 'primeng/card';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { ToastModule } from 'primeng/toast';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { MessageService, ConfirmationService } from 'primeng/api';
// import { AdminService } from '../../../core/services/admin';
// import { User } from '../../../core/models/user.model';

// @Component({
//   selector: 'app-users-management',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     CardModule,
//     TableModule,
//     ButtonModule,
//     DialogModule,
//     InputTextModule,
//     DropdownModule,
//     ProgressSpinnerModule,
//     ToastModule,
//     ConfirmDialogModule
//   ],
//   providers: [MessageService, ConfirmationService],
//   templateUrl: './users-management.html',
// })
// export class UsersManagementComponent implements OnInit {
//   users: User[] = [];
//   isLoading = true;
//   hasError = false;

//   // דיאלוג עריכה/הוספה
//   displayDialog = false;
//   isEditMode = false;
//   selectedUser: User = this.getEmptyUser();

//   // אפשרויות תפקיד
//   roleOptions = [
//     { label: 'משתמש רגיל', value: 0 },
//     { label: 'מנהל', value: 1 }
//   ];

//   constructor(
//     private adminService: AdminService,
//     private messageService: MessageService,
//     private confirmationService: ConfirmationService
//   ) {}

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.isLoading = true;
//     this.hasError = false;

//     this.adminService.getUsers().subscribe({
//       next: (data) => {
//         this.users = data;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('שגיאה בטעינת תורמים:', err);
//         this.hasError = true;
//         this.isLoading = false;
//         this.messageService.add({
//           severity: 'error',
//           summary: 'שגיאה',
//           detail: 'לא ניתן לטעון את רשימת התורמים'
//         });
//       }
//     });
//   }

//   openNewDialog(): void {
//     this.isEditMode = false;
//     this.selectedUser = this.getEmptyUser();
//     this.displayDialog = true;
//   }

//   openEditDialog(user: User): void {
//     this.isEditMode = true;
//     this.selectedUser = { ...user };
//     this.displayDialog = true;
//   }

//   hideDialog(): void {
//     this.displayDialog = false;
//     this.selectedUser = this.getEmptyUser();
//   }

//   saveUser(): void {
//     if (!this.selectedUser.userName || !this.selectedUser.email) {
//       this.messageService.add({
//         severity: 'warn',
//         summary: 'שדות חסרים',
//         detail: 'יש למלא את כל השדות הנדרשים'
//       });
//       return;
//     }

//     if (this.isEditMode) {
//       // עדכון תורם קיים
//       this.adminService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
//         next: () => {
//           this.messageService.add({
//             severity: 'success',
//             summary: 'הצלחה',
//             detail: 'התורם עודכן בהצלחה'
//           });
//           this.loadUsers();
//           this.hideDialog();
//         },
//         error: (err) => {
//           console.error('שגיאה בעדכון:', err);
//           this.messageService.add({
//             severity: 'error',
//             summary: 'שגיאה',
//             detail: 'לא ניתן לעדכן את התורם'
//           });
//         }
//       });
//     } else {
//       // הוספת תורם חדש
//       this.adminService.addUser(this.selectedUser).subscribe({
//         next: () => {
//           this.messageService.add({
//             severity: 'success',
//             summary: 'הצלחה',
//             detail: 'התורם נוסף בהצלחה'
//           });
//           this.loadUsers();
//           this.hideDialog();
//         },
//         error: (err) => {
//           console.error('שגיאה בהוספה:', err);
//           this.messageService.add({
//             severity: 'error',
//             summary: 'שגיאה',
//             detail: 'לא ניתן להוסיף את התורם'
//           });
//         }
//       });
//     }
//   }

//   confirmDelete(user: User): void {
//     this.confirmationService.confirm({
//       message: `האם אתה בטוח שברצונך למחוק את ${user.userName}?`,
//       header: 'אישור מחיקה',
//       icon: 'pi pi-exclamation-triangle',
//       acceptLabel: 'כן, מחק',
//       rejectLabel: 'ביטול',
//       acceptButtonStyleClass: 'p-button-danger',
//       accept: () => {
//         this.deleteUser(user.id);
//       }
//     });
//   }

//   deleteUser(id: number): void {
//     this.adminService.deleteUser(id).subscribe({
//       next: () => {
//         this.messageService.add({
//           severity: 'success',
//           summary: 'הצלחה',
//           detail: 'התורם נמחק בהצלחה'
//         });
//         this.loadUsers();
//       },
//       error: (err) => {
//         console.error('שגיאה במחיקה:', err);
//         this.messageService.add({
//           severity: 'error',
//           summary: 'שגיאה',
//           detail: 'לא ניתן למחוק את התורם'
//         });
//       }
//     });
//   }

//   getRoleLabel(role: number): string {
//     return role === 1 ? 'מנהל' : 'משתמש';
//   }

//   private getEmptyUser(): User {
//     return {
//       id: 0,
//       userName: '',
//       email: '',
//       role: 0,
//       token: null
//     };
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CardModule } from 'primeng/card';
// import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { ToastModule } from 'primeng/toast';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { MessageService, ConfirmationService } from 'primeng/api';
// import { AdminService } from '../../../core/services/admin';
// import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

import { AdminService } from '../../../core/services/admin';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-donors',
  standalone: true,
  templateUrl: './donors.html',
  imports: [
    CommonModule,
    FormsModule,

    // PrimeNG
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule
  ]
})
export class AdminDonorsComponent implements OnInit {

  // ===== STATE =====
  users: User[] = [];
  selectedUser: Partial<User> = {};
  isEditMode = false;
  displayDialog = false;
  isLoading = false;
  hasError = false;

  constructor(private adminService: AdminService) {}

  // ===== LIFECYCLE =====
  ngOnInit(): void {
    this.loadUsers();
  }

  // ===== API =====
  loadUsers(): void {
    this.isLoading = true;
    this.hasError = false;

    this.adminService.getDonors().subscribe({
      next: users => {
        this.users = users;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  // ===== UI ACTIONS =====
  openNewDialog(): void {
    this.selectedUser = {};
    this.isEditMode = false;
    this.displayDialog = true;
  }

  openEditDialog(user: User): void {
    this.selectedUser = { ...user };
    this.isEditMode = true;
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
    this.selectedUser = {};
  }

  saveUser(): void {
    if (!this.selectedUser) return;

    if (this.isEditMode && this.selectedUser.id) {
      this.adminService
        .updateDonor(this.selectedUser.id, this.selectedUser)
        .subscribe(() => this.afterSave());
    } else {
      this.adminService
        .addDonor(this.selectedUser)
        .subscribe(() => this.afterSave());
    }
  }

  confirmDelete(user: User): void {
    if (!user.id) return;
    if (!confirm('האם אתה בטוח שברצונך למחוק תורם זה?')) return;

    this.adminService.deleteDonor(user.id).subscribe(() => {
      this.loadUsers();
    });
  }

  private afterSave(): void {
    this.displayDialog = false;
    this.selectedUser = {};
    this.loadUsers();
  }
}
