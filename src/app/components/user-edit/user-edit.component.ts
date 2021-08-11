import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Province } from '../../models/province.model';
import { Municipality } from '../../models/municipality.model';
import { UserService } from '../../services/user.service';
import { ProvinceService } from '../../services/province.service';
import { MunicipalityService } from '../../services/municipality.service';

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
    contactno: "",
    provinceid: 0,
    municipalityid: 0
  };

  submitted: boolean = false;

  provinces: Province[] = [];
  municipalities: Municipality[] = [];

  constructor(
    private userService: UserService,
    private provinceService: ProvinceService,
    private municipalityService: MunicipalityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUseInfo(this.route.snapshot.params.id);
    this.getProvinces();
  }

  getProvinces(): void {
    this.provinceService.getAll()
      .subscribe(data => {
        this.provinces = data;
      });
  }

  onProvinceChange(event: any): void {
    let provinceId = Number(event.target.value);
    this.municipalityService.getAll()
      .subscribe(data => {
        this.municipalities = data.filter(x => x.provinceid == provinceId);
      });
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
