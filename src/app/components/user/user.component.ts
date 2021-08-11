import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll()
      .subscribe(data => {
        this.Users = data;
      },
        error => {
          console.log(error);
        });
  }

  onEditClick(user: User): void {
    console.log(user);
  }

  onDeleteClick(id: number): void {
    if (!confirm("Are you sure you want to delete ?")) {
      return;
    }
    this.userService.delete(id)
      .subscribe(
        response => {
          this.getUsers();
        },
        error => {
          console.log(error);
        });

  }
}
