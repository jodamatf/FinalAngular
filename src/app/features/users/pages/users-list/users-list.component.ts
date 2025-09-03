import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../../users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatListModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  loading = true;
  users: User[] = [];
  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: data => { this.users = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
