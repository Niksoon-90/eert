import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ForecastingModelService} from "../../services/forecasting-model.service";
import {CalculationsService} from "../../services/calculations.service";
import {ICalculatingPredictiveRegression} from "../../models/calculations.model";

@Component({
  selector: 'app-math-forecast',
  templateUrl: './math-forecast.component.html',
  styleUrls: ['./math-forecast.component.scss']
})
export class MathForecastComponent implements OnInit {
  mathematicalForecastTable: ICalculatingPredictiveRegression[];

  constructor(
    private router: Router,
    public forecastModelService: ForecastingModelService,
    private calculationsService: CalculationsService
  ) { }

  ngOnInit(): void {
    this.createTable()
  }
  createTable(){
    this.calculationsService.getCalculation(this.forecastModelService.getTicketInformation().stepOne.Session['id'], this.forecastModelService.getTicketInformation().stepOne.calcYearsNumber['name'])
      .subscribe(
        res => {this.mathematicalForecastTable = res; console.log(this.mathematicalForecastTable)},
        err => console.log('HTTP Error', err.message),
        () => console.log('HTTP request completed.')
      )
  }

  nextPage() {
    this.router.navigate(['steps/forecast']);
  }

  prevPage() {
    this.router.navigate(['steps/import']);
  }
}