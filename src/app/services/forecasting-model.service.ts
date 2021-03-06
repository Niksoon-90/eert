import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ForecastingModelService {

  ticketInformation = {
    stepOne: {
      Session: null,
      calcYearsNumber: 0,
      scenarioMacro: null,
      correspondenceSession: null,
      cargoSessionSender: null,
      cargoSessionReceiver: null,
      oilCargo: null,
      metallurgy: null,
      ore: null,
      nameNewShip: null,
      oldSessionId: null,
      newSessionId: null,
    },
    stepThree: {
        forecastingStrategy: null,
        yearsSession: null,
        primeryBolChange: false,
        sessionId: null
    },
    history: {
      primeryBolChange: false,
      historicalYears: null,
      forecastConfirmed: false
    }
  };


  getTicketInformation() {
    return this.ticketInformation;
  }

  setTicketInformation(ticketInformation) {
    this.ticketInformation = ticketInformation;
  }

}
