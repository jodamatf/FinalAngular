import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersService } from '../../users.service';
import { CreateUserDto } from '../../models/create-user.dto';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSnackBarModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  private fb = inject(FormBuilder);
  private users = inject(UsersService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    website: ['', [Validators.required, Validators.pattern('www\\.[a-zA-Z0-9\\-\\.]+\\.[a-zA-Z]{2,3}')]],
  });
  submitting = false;

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;

    this.users.createUser(this.form.value as CreateUserDto).subscribe({
      next: () => {
        this.submitting = false;
        this.snack.open('Usuario creado (simulado)', 'OK', { duration: 2500 });
        this.router.navigate(['/users']);
      },
      error: () => {
        this.submitting = false;
        this.snack.open('Error creando usuario', 'OK', { duration: 2500 });
      }
    });
  }
}
