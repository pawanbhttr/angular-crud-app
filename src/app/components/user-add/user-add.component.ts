import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: User = {
    id: 0,
    username: "",
    fullname: "",
    email: "",
    contactno: ""
  };
  submitted: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  addUser(): void {
    this.userService.create(this.user)
      .subscribe(data => {
        this.submitted = true;
      }, error => {
        console.error(error);
      });
  }

  newUser(): void {
    this.user = {
      id: 0,
      username: "",
      fullname: "",
      email: "",
      contactno: ""
    };
    this.submitted = false;
  }
}
