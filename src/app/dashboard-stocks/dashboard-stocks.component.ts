import { Component, OnInit } from '@angular/core';
import { StockMarketService } from '../stock-market.service';

@Component({
  selector: 'dashboard-stocks',
  templateUrl: './dashboard-stocks.component.html',
  styleUrls: ['./dashboard-stocks.component.css']
})
export class DashboardStocks implements OnInit {

  constructor(private _stocks: StockMarketService) { }

  stockData: any[];
  yScaleMin: number = 0;
  yScaleMax: number = 0;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;

  

  ngOnInit() {
    this._stocks.nasdaqData().subscribe(data => {
      let indexData = data.dataset.data;
      
      let tempData = [{
        "name": "NASDAQ",
        "series": []
      }];
      this.yScaleMin = indexData[0][1];
      indexData.forEach(dataPoint => {
        if (dataPoint[1] < this.yScaleMin)
          this.yScaleMin = dataPoint[1];
        else if (dataPoint[1] > this.yScaleMax)
          this.yScaleMax = dataPoint[1]
        tempData[0].series.push({
          "name": new Date(dataPoint[0]),
          "value": dataPoint[1]
        });
      });

      this.stockData = tempData;

      this.yScaleMax += 10;
      this.yScaleMin -= 10;

    });
  }

}
