import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  display$: Observable<'open' | 'close'>;
  erroMessage: string;

  constructor(
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.erroMessage = this.modalService.errorMessage;
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }
}
