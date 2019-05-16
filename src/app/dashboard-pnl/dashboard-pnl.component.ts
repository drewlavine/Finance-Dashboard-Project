import { Component, OnInit } from "@angular/core";
import { FundsDataService } from "../funds-data.service";
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: "dashboard-pnl",
  templateUrl: "./dashboard-pnl.component.html",
  styleUrls: ["./dashboard-pnl.component.css"]
})
export class DashBoardPNL implements OnInit {
  funds: any[];
  fundsPNL: any[];
  roundEdges = false;
  xAxis = true;
  yAxis = true;
  showGridLines = true;
  barPadding = 50;
  yScaleMin = -0.2;
  yScaleMax = 0.2;

  today = new Date();

  dataSourcePNL: any;
  displayedColumns: string[] = [
    "fund",
    "pNL"
  ];

  constructor(private _funds: FundsDataService) {}

  ngOnInit() {
    this._funds.getFundsData().subscribe(funds => {
      this.funds = funds;
      this.fundsPNL = this.getPNL(this.funds);
      this.dataSourcePNL = new MatTableDataSource(this.fundsPNL);
    });
  }

  /**
   * @function getPNL
   * @description Calculates the total P&L for each fund
   * @param funds 
   */
  getPNL(funds: any[]) {
    let tempPNL = [];
    funds.forEach(fund => {
      let pNL = 0;
      fund.investments.forEach(investment => {
        var currentValue: number = this._funds.getCurrentValue(investment)
        var capitalDeployed: number = this._funds.getCapitalDeployed(investment);
        var investmentPNL: number =
          (capitalDeployed - currentValue) / capitalDeployed;
        pNL += investmentPNL;
      });
      let newFundPNL = {
        name: fund.fundName,
        value: +pNL.toFixed(4)
      };
      tempPNL.push(newFundPNL);
    });
    return tempPNL;
  }
}
