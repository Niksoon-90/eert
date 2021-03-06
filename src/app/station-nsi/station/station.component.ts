import { Component, OnInit } from '@angular/core';
import {IAuthModel} from "../../models/auth.model";
import {AuthenticationService} from "../../services/authentication.service";
import {IDorogyNci, IStationNci, ISubjectNci} from "../../models/calculations.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShipmentsService} from "../../services/shipments.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  user: IAuthModel
  cols: any
  stationNci: IStationNci[];
  form: FormGroup
  subjectNci: ISubjectNci[];
  dorogyNci: IDorogyNci[];


  constructor(
    public authenticationService: AuthenticationService,
    private shipmentsService: ShipmentsService,
    private modalService: ModalService,
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.getStationNci();
    this.getSubjectNci();
    this.getDorogyNci();
    this.createForm();
    this.cols = [
      { field: 'subjectGvc', header: 'Субъект РФ', width: 'auto'},
      { field: 'road', header: 'Дорога', width: 'auto'},
      { field: 'name', header: 'Название станции ', width: 'auto'},
      { field: 'code', header: 'Код станции', width: 'auto', isStatic :true}
    ]
  }
  createForm(){
    this.form = new FormGroup({
      nameStation: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      road: new FormControl('', [Validators.required]),
      subjectGvc: new FormControl('', [Validators.required]),
    })
  }

  getSubjectNci() {
    this.shipmentsService.getSubject().subscribe(
      res => this.subjectNci = res,
      error => this.modalService.open(error.error.message)
    )
  }
  getDorogyNci() {
    this.shipmentsService.getDictionaryDictionaryRailway().subscribe(
      res =>  this.dorogyNci =res,
      error => this.modalService.open(error.error.message),
    )
  }


  onRowEditInit() {

  }

  onRowEditSave(rowData) {
    const station: IStationNci = {
      id: rowData.id,
      border: rowData.border,
      code: rowData.code,
      ferry: rowData.ferry,
      land: rowData.land,
      name: rowData.name,
      road: rowData.road,
      subjectGvc: rowData.subjectGvc,
      transmissionPoint: rowData.transmissionPoint,
      type: rowData.type
    }
    this.shipmentsService.putDictionaryStation(station).subscribe(
      res => console.log(),
      error => this.modalService.open(error.error.message),
    )
  }

  onRowEditCancel() {

  }

  deleteItemCargoNci(id: any) {
    this.shipmentsService.deleteDictionaryStation(id).subscribe(
      res => console.log(),
      error => this.modalService.open(error.error.message),
      () => this.getStationNci()
    )
  }

  createStatioNci() {
    const station: IStationNci = {
      border: null,
      code: this.form.controls.code.value,
      ferry: null,
      land: null,
      name: this.form.controls.nameStation.value,
      road: this.form.controls.road.value.name,
      subjectGvc: this.form.controls.subjectGvc.value.name,
      transmissionPoint: null,
      type: null
    }
    this.shipmentsService.postDictionaryDictionaryStation(station).subscribe(
      res => console.log(),
      error => this.modalService.open(error.error.message),
      () => {
        this.form.reset(),
          this.getStationNci()
      }
    )

  }

 getStationNci() {
    this.shipmentsService.getDictionaryDictionaryStation().subscribe(
      res =>  this.stationNci =res,
      error => this.modalService.open(error.error.message),
    )
  }
}
