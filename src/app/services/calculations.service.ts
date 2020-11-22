import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {
  ICalculatingPredictiveRegression,
  ICargoNci,
  ICargoOwnerInfluenceFactor,
  IInfluenceNci
} from "../models/calculations.model";
import {MonoCargoSystemsModel} from "../models/mono-cargo-systems.model";

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor(private http: HttpClient) { }

  private url = environment.hostURL;
  private urlCalc = environment.hostCalc;

  getCalculationMultiple(id: number, idHorizonforecast: number, type: string): Observable<ICalculatingPredictiveRegression[]>{
    return this.http.get<ICalculatingPredictiveRegression[]>(this.urlCalc + `api/calc/regression/multiple/${id}?calcYearsNumber=${idHorizonforecast}&macroScenarioType=${type}`)
  }
  getCalculationSimple(id: number, idHorizonforecast: number): Observable<ICalculatingPredictiveRegression[]> {
    return this.http.get<ICalculatingPredictiveRegression[]>(this.urlCalc + `api/calc/correspondence/simple/${id}?calcYearsNumber=${idHorizonforecast}`)
  }
  getCalculationFiscal(id: number, idHorizonforecast: number, year: string): Observable<ICalculatingPredictiveRegression[]> {
    return this.http.get<ICalculatingPredictiveRegression[]>(this.urlCalc + `api/calc/correspondence/fiscal/${id}?calcYearsNumber=${idHorizonforecast}&fiscalYear=${year}`)
  }
  getCalculationFixed(id: number, idHorizonforecast: number): Observable<ICalculatingPredictiveRegression[]> {
    return this.http.get<ICalculatingPredictiveRegression[]>(this.urlCalc + `api/calc/correspondence/tendency/fixed/${id}?calcYearsNumber=${idHorizonforecast}`)
  }
  getCalculationIncreasing(id: number, idHorizonforecast: number): Observable<ICalculatingPredictiveRegression[]> {
    return this.http.get<ICalculatingPredictiveRegression[]>(this.urlCalc + `api/calc/correspondence/tendency/increasing/${id}?calcYearsNumber=${idHorizonforecast}`)
  }
  getCalculationAverage(id: number, idHorizonforecast: number): Observable<ICalculatingPredictiveRegression[]> {
    return this.http.get<ICalculatingPredictiveRegression[]>(this.urlCalc + `api/calc/correspondence/average/${id}?calcYearsNumber=${idHorizonforecast}`)
  }
  getCorrelation(idHorizonforecast: number): Observable<ICalculatingPredictiveRegression[]>{
    return this.http.get<ICalculatingPredictiveRegression[]>(this.urlCalc + `api/calc/correlation/${idHorizonforecast}?forecastType=LESS_SQUARE`)
  }
  getPerspective(sessionId: number,perspectiveSessionId: number ): Observable<ICalculatingPredictiveRegression[]>{
    return this.http.get<ICalculatingPredictiveRegression[]>(this.urlCalc + `api/calc/correspondence/perspective?perspectiveSessionId=${perspectiveSessionId}&sessionId=${sessionId}`)
  }
  //TODO 4
  getOil(): Observable<MonoCargoSystemsModel[]>{
    return this.http.get<MonoCargoSystemsModel[]>(this.urlCalc + `api/external/oil`)
  }
  getMetallurgy(): Observable<MonoCargoSystemsModel[]>{
    return this.http.get<MonoCargoSystemsModel[]>(this.urlCalc + `api/external/metal`)
  }
  getOre(): Observable<MonoCargoSystemsModel[]>{
    return this.http.get<MonoCargoSystemsModel[]>(this.urlCalc + `api/external/ruda`)
  }
  //TODO 5
  postCargoNci(name: string){
    return this.http.post(this.urlCalc + `api/catalog/cargo`, name)
  }
  putCargoNci(cargoNci:ICargoNci){
    return this.http.put(this.urlCalc + `api/catalog/cargo`, cargoNci)
  }
  getSearchCargoNci(id: number){
    return this.http.get(this.urlCalc + `api/catalog/cargo/${id}`)
  }
  deleteCargoNci(id: number){
    return this.http.delete(this.urlCalc + `api/catalog/cargo/${id}`)
  }
  getCargoNci(): Observable<ICargoNci[]>{
    return this.http.get<ICargoNci[]>(this.urlCalc + `api/catalog/cargo/all`)
  }

  //TODO 6
  postInfluenceNci(influenceNci: IInfluenceNci){
    return this.http.post(this.urlCalc + `api/catalog/influence`, influenceNci)
  }
  putInfluenceNci(influenceNci: IInfluenceNci){
    return this.http.put(this.urlCalc + `api/catalog/influence`, influenceNci)
  }
  getSearchInfluenceNci(id: number){
    return this.http.get(this.urlCalc + `api/catalog/influence/${id}`)
  }
  deleteInfluenceNci(id:number){
    return this.http.delete(this.urlCalc + `api/catalog/influence/${id}`)
  }
  getInfluenceNci(): Observable<IInfluenceNci[]>{
    return this.http.get<IInfluenceNci[]>(this.urlCalc + `api/catalog/influence/all`)
  }
  //TODO 7
  postCargoOwnerInfluenceFactor(cargoOwnerInfluenceFactor: ICargoOwnerInfluenceFactor){
    return this.http.post(this.urlCalc + `api/cargo/factor`, cargoOwnerInfluenceFactor)
  }
  putCargoOwnerInfluenceFactor(cargoOwnerInfluenceFactor: ICargoOwnerInfluenceFactor){
    return this.http.put(this.urlCalc + `api/cargo/factor`, cargoOwnerInfluenceFactor)
  }

}
