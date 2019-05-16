import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class FundsDataService {
  fundsReady: EventEmitter<any> = new EventEmitter();
  investmentsReady: EventEmitter<any> = new EventEmitter();

  fundUrl = "./assets/funds.json";

  private funds: any[];
  private investments: any[];

  constructor(private _http: HttpClient) {  }

/**
 * @function getFundsData
 * @description Grabs the fund data from the json file
 */
  getFundsData() {
    return this._http.get(this.fundUrl)
    .pipe(map(data => data as string[]));
  }

  /**
   * @function getCapitalDeployed
   * @description Calculates the Capital Deployed for the given investment
   * @param investment 
   */
  getCapitalDeployed(investment): number {
    return investment.investmentType == "public"
            ? (investment.purchaseSharePrice * investment.shares)/100000
            : investment.investedValue;
  }

  /**
   * @function getCurrentValue
   * @description Calculates the Current Value for the given investment
   * @param investment 
   */
  getCurrentValue(investment): number {
      return investment.investmentType == "public"
      ? (investment.sharePrice * investment.shares)/100000
      : investment.currentValue;
  }
}
