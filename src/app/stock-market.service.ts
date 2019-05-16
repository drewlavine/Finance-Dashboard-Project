import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockMarketService {

  constructor(private _http: HttpClient ) {}

  /**
   * @function nasdaqData
   * @description Gets the NASDAQ data from the QUANDL API
   */
  nasdaqData() {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    startDate.setMonth(startDate.getMonth() - 3);
    let apiURL = `https://www.quandl.com/api/v3/datasets/NASDAQOMX/COMP.json?api_key=GV6Ex3nDFouHdPTwRKu-&start_date=${startDate.toLocaleDateString('fr-CA')}&end_date=${endDate.toLocaleDateString('fr-CA')}&order=asc`;

    return this._http.get<any>(apiURL)
    .pipe(map(data => data));
  }
}
