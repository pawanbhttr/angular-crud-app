import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Province } from '../../models/province.model';
import { Municipality } from '../../models/municipality.model';
import { UserService } from '../../services/user.service';
import { ProvinceService } from '../../services/province.service';
import { MunicipalityService } from '../../services/municipality.service';

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
    contactno: "",
    provinceid: 0,
    municipalityid: 0
  };

  provinces: Province[] = [];
  municipalities: Municipality[] = [];

  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private provinceService: ProvinceService,
    private municipalityService: MunicipalityService
  ) { }

  ngOnInit(): void {
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
      contactno: "",
      provinceid: 0,
      municipalityid: 0
    };
    this.submitted = false;
  }
}
