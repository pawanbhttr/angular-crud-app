import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = {
    id: 0,
    username: "",
    fullname: "",
    email: "",
    contactno: ""
  };

  submitted: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getUseInfo(this.route.snapshot.params.id);
  }

  getUseInfo(id: number): void {
    this.userService.getUser(id)
      .subscribe(data => {
        this.user = data;
      }, error => {
        console.error(error);
      })
  }

  updateUser(): void {
    this.userService.update(this.user.id, this.user)
      .subscribe(data => {
        this.submitted = true;
      }, error => {
        console.error(error);
      });
  }
}
