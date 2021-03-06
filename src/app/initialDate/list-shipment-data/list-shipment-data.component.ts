import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {ShipmentsService} from "../../services/shipments.service";
import {ModalService} from "../../services/modal.service";
import {Table} from "primeng/table";
import {CalculationsService} from "../../services/calculations.service";
import {
  ICargoGroupNci,
  ICargoNci,
  IDorogyNci,
  IShipmentTypNci,
  IStationNci,
  ISubjectNci
} from "../../models/calculations.model";
import {TestService} from "../../test.service";
import {IAuthModel} from "../../models/auth.model";
import {AuthenticationService} from "../../services/authentication.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IShipment} from "../../models/shipmenst.model";

@Component({
  selector: 'app-list-chipment-data',
  templateUrl: './list-shipment-data.component.html',
  styleUrls: ['./list-shipment-data.component.scss']
})
export class ListShipmentDataComponent implements OnInit, OnChanges {
  @ViewChild('dt') table: Table;
  @Input() carrgoTypes;
  @Input() dialogVisible;
  @Input() sessionId;
  @Input() mathematicalForecastTable;
  @Input() loading;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changes: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changesNewRow: EventEmitter<number> = new EventEmitter<number>();

  columsYears: number= 0;
  primeryBol = [ { label: 'Все', value: '' },{ label: 'Да', value: true },{ label: 'Нет', value: false }]
  primary = [ { label: 'Да', dt: true },{ label: 'Нет', dt: false }]
  primary2 = [ { label: 'Да', value: true },{ label: 'Нет', value: false }]
  cols: any[];
  selectedPrimery: any;
  massSummYear: any[];
  totalRecords: number;
  summYears: 0;
  iCargoNci: ICargoNci[];
  user: IAuthModel
  displayModal: boolean = false
  dynamicForm: FormGroup;
  cargoGroupNci: ICargoGroupNci[];
  shipmentTypNci: IShipmentTypNci[];
  dorogyNci: IDorogyNci[];
  subjectNci: ISubjectNci[];
  cargoNci: ICargoNci[];
  stationNci: IStationNci[];
  fromstationNci: IStationNci[];
  tostationNci: IStationNci[];



  constructor(
    private shipmentsService: ShipmentsService,
    private modalService: ModalService,
    private calculationsService: CalculationsService,
    private testService: TestService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authenticationService.userValue;
  }


  ngOnChanges() {
    this.totalRecords = this.mathematicalForecastTable.length;
    this.massSummYears(this.mathematicalForecastTable)
  }

  ngOnInit(): void {
    this.formApi();
    this.test();
    if(this.mathematicalForecastTable[0].shipmentYearValuePairs.length > 0){this.columsYears = this.mathematicalForecastTable[0].shipmentYearValuePairs.length}
    this.loading = false
    this.massSummYears(this.mathematicalForecastTable)
    this.cols = [
      { field: 'cargoGroup', header: 'Группа груза', width: '100px', keyS: false, isStatic :true},
      { field: 'cargoSubGroup', header: 'Подгруппа груза', width: '100px', keyS: false },
      { field: 'shipmentType', header: 'Вид перевозки', width: '100px', keyS: false },
      { field: 'primary', header: 'Корреспонденции', width: '100px', keyS: false },
      { field: 'fromRoad', header: 'Дорога отправления', width: '100px', keyS: false },
      { field: 'fromStation', header: 'Станция отправления РФ', width: '100px', keyS: false },
      { field: 'fromStationCode', header: 'Код станции отправления РФ', width: '100px', keyS: false },
      { field: 'fromSubject', header: 'Субъект отправления', width: '100px', keyS: false },
      { field: 'senderName', header: 'Грузоотправитель', width: '100px', keyS: false },
      { field: 'toRoad', header: 'Дорога назначения', width: '100px', keyS: false },
      { field: 'toStation', header: 'Станция назначения РФ', width: '100px', keyS: false },
      { field: 'toStationCode', header: 'Код станции назначения РФ', width: '100px', keyS: false },
      { field: 'toSubject', header: 'Субъект назначения', width: '100px', keyS: false },
      { field: 'receiverName', header: 'Грузополучатель', width: '100px', keyS: false },

    ];
    for(let i=0; i< this.columsYears ; i++){
      this.cols.push({ field: `shipmentYearValuePairs.${i}.value`, header: this.mathematicalForecastTable[0].shipmentYearValuePairs[i].year, width: '100px',keyS: true })
    }
    this.createForm();
    this.onChangeTickets();
  }
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.shipmentYearValuePairs as FormArray; }

  createForm(){
    this.dynamicForm = this.formBuilder.group({
      cargoGroup:  ['', Validators.required],
      cargoSubGroup: [''],
      fromRoad:  ['', Validators.required],
      fromStation:  ['',  Validators.required],
      primary:  ['', Validators.required],
      receiverName:  ['', Validators.required],
      senderName:  ['', Validators.required],
      shipmentType:  ['', Validators.required],
      toRoad:  ['', Validators.required],
      toStation:  ['', Validators.required],
      shipmentYearValuePairs: new FormArray([])
    });
  }
  formApi(){
   this.getDictionaryCargo();
   this.getShipmentTypNci();
   this.getDorogyNci();
   this.getCargoNci();
   this.getStationNci();
  }
  getDictionaryCargo(){
    this.shipmentsService.getDictionaryCargo().subscribe(
      res =>  this.cargoGroupNci =res,
      error => this.modalService.open(error.error.message),
    )
  }
  getShipmentTypNci() {
    this.shipmentsService.getDictionaryShipmenttype().subscribe(
      res =>  this.shipmentTypNci =res,
      error => this.modalService.open(error.error.message),
    )
  }
  getDorogyNci() {
    this.shipmentsService.getDictionaryDictionaryRailway().subscribe(
      res =>  this.dorogyNci =res,
      error => this.modalService.open(error.error.message),
    )
  }
  getSubjectNci() {
    this.shipmentsService.getSubject().subscribe(
      res => this.subjectNci = res,
      error => this.modalService.open(error.error.message)
    )
  }
  getCargoNci(){
    this.calculationsService.getAllCargoNci().subscribe(
      res => this.cargoNci = res,
      error => this.modalService.open(error.error.message),
    )
  }
  getStationNci() {
    this.shipmentsService.getDictionaryDictionaryStation().subscribe(
      res =>  this.stationNci =res,
      error => this.modalService.open(error.error.message),
    )
  }

  onChangeTickets() {
    console.log('this.mathematicalForecastTable',this.mathematicalForecastTable)
    if (this.t.length < this.mathematicalForecastTable[0].shipmentYearValuePairs.length) {
      for (let i = this.t.length; i < this.mathematicalForecastTable[0].shipmentYearValuePairs.length; i++) {
        this.t.push(this.formBuilder.group({
          value: ['', Validators.required],
          year: this.mathematicalForecastTable[0].shipmentYearValuePairs[i].year,
          calculated: this.mathematicalForecastTable[0].shipmentYearValuePairs[i].calculated
        }));
      }
    }
  }

  massSummYears($event: any) {
    this.massSummYear = [ ]
    if($event['filteredValue'] !== undefined){
      if($event.filteredValue.length > 0){
        for (let i = 0; i < $event.filteredValue[0].shipmentYearValuePairs.length ; i++){
          this.summYears = 0;
          for (let x = 0; x < $event.filteredValue.length; x++){
            this.summYears += $event.filteredValue[x].shipmentYearValuePairs[i].value;
          }
          this.massSummYear.push(this.summYears);
        }
      }
    }else{
      for (let i = 0; i <  this.mathematicalForecastTable[0].shipmentYearValuePairs.length ; i++){
        this.summYears = 0;
        for (let x = 0; x <  this.mathematicalForecastTable.length; x++){
          this.summYears +=  this.mathematicalForecastTable[x].shipmentYearValuePairs[i].value;
        }
        this.massSummYear.push(this.summYears);
      }
    }
  }

  onRowEditInit(item) {
    if(this.carrgoTypes === 'sender'){
      this.testService.or.step1 = Object.assign({}, item);
      this.testService.senderNameOld(Object.assign({}, item));
    }else if(this.carrgoTypes === 'receiver'){
      this.testService.or.step1 = Object.assign({}, item);
      this.testService.receiverNameOld(Object.assign({}, item));
    }else{

    }

  }

  onRowEditSave(item: any) {
    if(this.carrgoTypes !== null){
      if(this.testService.or.step1['senderName'] != item['senderName']){
        let senderName = item['senderName'];
        let oldSenderName = this.testService.or.step1['senderName'];
        item['senderName'] = null
        if(this.testService.tt.step1 === JSON.stringify(item)){
          const result = this.mathematicalForecastTable.filter(nci => nci.senderName === oldSenderName);
          result.push(item)
          if(result.length > 0){
            for(let items of result){
              items.senderName = senderName;
              delete items.session
              this.shipmentsService.putShipments(items).subscribe(
                res => (console.log('senderName god')),
                error => this.modalService.open(error.error.message),
                () => {
                  this.testService.or.step1 = null;
                  this.testService.tt.step1 = null
                },
              )
            }
          }
        }else{
          item.senderName = senderName;
          delete item.session;
          console.log('11111', JSON.stringify(item))
          this.shipmentsService.putShipments(item).subscribe(
            res => (console.log('one')),
            error => this.modalService.open(error.error.message)
          )
        }
      }
      if(this.testService.or.step1['receiverName'] != item['receiverName']){
        let receiverName = item['receiverName'];
        let oldReceiverName = this.testService.or.step1['receiverName'];
        item['receiverName'] = null
        if(this.testService.tt.step1 === JSON.stringify(item)){
          const result = this.mathematicalForecastTable.filter(nci => nci.receiverName === oldReceiverName);
          result.push(item)
          if(result.length > 0){
            for(let items of result){
              items.receiverName = receiverName;
              delete items.session
              this.shipmentsService.putShipments(items).subscribe(
                res => (console.log('receiverName god')),
                error => this.modalService.open(error.error.message),
                () => {
                  this.testService.or.step1 = null;
                  this.testService.tt.step1 = null
                },
              )
            }
          }
        }else{
          item.receiverName = receiverName;
          delete item.session;
          this.shipmentsService.putShipments(item).subscribe(
            res => (console.log('one')),
            error => this.modalService.open(error.error.message)
          )
        }
      }
      else {
        delete item.session
        this.shipmentsService.putShipments(item).subscribe(
          res => (console.log('god')),
          error => this.modalService.open(error.error.message)
        )
      }
    }else {
      delete item.session
      this.shipmentsService.putShipments(item).subscribe(
        res => (console.log('god')),
        error => this.modalService.open(error.error.message)
      )
    }
  }


  onRowEditCancel() {
  }

  editColumn(row: any, col: any, $event: any) {
    console.log($event)
    if(col['keyS'] === true){
      const mass = col['field'].toString().split('.');
      row.shipmentYearValuePairs[mass[1]].value = Number($event);
    }else{
      const item = col['field'];
      row[item] = $event
    }
  }

  columnFilter(event: any, field) {
    this.table.filter(event.target.value, field, 'contains');
  }

  colorYears(rowData, col: any) {
    const mass = col['field'].toString().split('.');
    return rowData.shipmentYearValuePairs[mass[1]].calculated === true ?  true :  false
  }
  closeModalTable(){
    this.change.emit(this.loading = false);
    this.changes.emit(this.dialogVisible = false);
  }
  checkedcarrgoTypes(item: any){
    return  this.iCargoNci.some(cargo => cargo.name === item)
    }
  test(){
    this.calculationsService.getAllCargoNci().subscribe(
      res => this.iCargoNci = res,
      error => this.modalService.open(error.error.message)
    )
}

  createNew() {
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }
    const shipment: IShipment = {
      cargoGroup:	this.dynamicForm.controls.cargoGroup.value.name,
      cargoSubGroup: this.dynamicForm.controls.cargoSubGroup.value,
      fromRoad:	this.dynamicForm.controls.fromRoad.value.shortname,
      fromStation:	this.dynamicForm.controls.fromStation.value.name,
      fromStationCode:	this.dynamicForm.controls.fromStation.value.code,
      fromSubject:	this.dynamicForm.controls.fromStation.value.subjectGvc,
      receiverName:	this.dynamicForm.controls.receiverName.value.name,
      senderName:	this.dynamicForm.controls.senderName.value.name,
      shipmentType:	this.dynamicForm.controls.shipmentType.value.name,
      shipmentYearValuePairs:	this.dynamicForm.controls.shipmentYearValuePairs.value,
      toRoad:	this.dynamicForm.controls.toRoad.value.shortname,
      toStation:	this.dynamicForm.controls.toStation.value.name,
      toStationCode: this.dynamicForm.controls.toStation.value.code,
      toSubject:	this.dynamicForm.controls.toStation.value.subjectGvc,
      primary: this.dynamicForm.controls.primary.value.dt,
    }

    console.log(JSON.stringify(shipment, null, 4));
    this.shipmentsService.postCreateRowShip(this.sessionId, shipment).subscribe(
      res => console.log(),
      error => this.modalService.open(error.error.message),
      () => {
        this.displayModal = false;
        this.clearForm(),
          this.changesNewRow.emit(this.sessionId);
      }

    )
  }
  clearForm() {
    this.dynamicForm.reset()
    this.t.clear();
    this.onChangeTickets()
  }

  showModalDialog() {
    this.displayModal = true;
  }

  fromRoad() {
      this.dynamicForm.controls.fromStation.reset()
      this.fromstationNci = this.stationNci.filter(station => (station.road === this.dynamicForm.controls.fromRoad.value.shortname))
    if(this.fromstationNci.length === 0){
      this.modalService.open(`В справочнике нет станции с признаком Дорога: ${this.dynamicForm.controls.fromRoad.value.name}`)
    }
  }


  toRoad() {
    this.dynamicForm.controls.toStation.reset()
    this.tostationNci = this.stationNci.filter(station => (station.road === this.dynamicForm.controls.toRoad.value.shortname))
    if(this.tostationNci.length === 0){
      this.modalService.open(`В справочнике нет станции с признаком Дорога: ${this.dynamicForm.controls.toRoad.value.name}`)
    }
  }
}

