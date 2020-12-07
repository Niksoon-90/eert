import { Component, OnInit } from '@angular/core';
import {ICargoNci, IDorogyNci} from "../../models/calculations.model";
import {IAuthModel} from "../../models/auth.model";
import {ModalService} from "../../services/modal.service";
import {CalculationsService} from "../../services/calculations.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-dorogy',
  templateUrl: './dorogy.component.html',
  styleUrls: ['./dorogy.component.scss']
})
export class DorogyComponent implements OnInit {

  cols: any[];
  totalRecords: any;
  dorogyNci: IDorogyNci[]
  nameNewDorogyNci: string = '';
  user: IAuthModel

  constructor(
    public authenticationService: AuthenticationService,
    private modalService: ModalService,
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.getDorogyNci();
    this.cols = [
      { field: 'name', header: 'Наименование дороги', width: '70%', isStatic :true}
    ]
  }

  createDorogyNci() {
    if(this.nameNewDorogyNci !== ''){
      const newDorogy: IDorogyNci = {
        id: Math.random(),
        name: this.nameNewDorogyNci
      }
      this.dorogyNci.push(newDorogy)
    }else{
      this.modalService.open('Укажите наименование Дорги!')
    }
  }

  onRowEditInit() {

  }

  onRowEditSave(rowData) {
    let item = this.dorogyNci.find(x => x.id === rowData.id);
    item.name = rowData.name;
  }
  getDorogyNci() {
    this.dorogyNci = [
      {id: 1, name: 'Свердловская железная'},
      {id: 2, name: 'Северная железная '},
      {id: 3, name: 'Северо-Кавказская железная '},
      {id: 4, name: 'Юго-Восточная железная '},
      {id: 5, name: 'Южно-Уральская железная '},
    ]
  }

  onRowEditCancel() {

  }

  deleteItemCargoNci(id: any) {
    this.dorogyNci = this.dorogyNci.filter( data => data.id !== id);
  }
}