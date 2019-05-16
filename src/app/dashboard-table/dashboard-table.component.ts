import { Component, OnInit, ViewChild } from "@angular/core";
import { FundsDataService } from "../funds-data.service";
import { Investment } from "../investment";
import { MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "dashboard-table",
  templateUrl: "./dashboard-table.component.html",
  styleUrls: ["./dashboard-table.component.css"]
})
export class DashBoardTable implements OnInit {
  constructor(private _funds: FundsDataService) {}

  @ViewChild(MatSort) sort: MatSort;
  funds: any[];
  fundsTest: any[];
  investmentData: Investment[] = [];
  dataSourceInvest: any;
  displayedColumns: string[] = [
    "ticker",
    "fund",
    "investmentType",
    "pNL",
    "currentValue",
    "capitalDeployed"
  ];

  ngOnInit() {
    this._funds.getFundsData().subscribe(funds => {
      this.fundsTest = funds;
      this.getInvestments(this.fundsTest);
      this.dataSourceInvest = new MatTableDataSource(this.investmentData);
      this.dataSourceInvest.sort = this.sort;
    });
  }

  /**
   * @function getInvestments
   * @description Parses the fund data and places them into an array of type Investment
   * @param funds 
   */
  getInvestments(funds: any[]): void {
    funds.forEach(fund => {
      fund.investments.forEach(investment => {
        var currentValue: number = this._funds.getCurrentValue(investment);
        var capitalDeployed: number = this._funds.getCapitalDeployed(investment);
        var pNL: number = (capitalDeployed - currentValue) / capitalDeployed;
        var newInvestment: Investment = {
          ticker: investment.ticker,
          fund: fund.fundName,
          investmentType: investment.investmentType,
          pNL: pNL.toFixed(4),
          currentValue: currentValue,
          capitalDeployed: capitalDeployed
        };
        this.investmentData.push(newInvestment);
      });
    });
  }

  /**
   * @function applyFilter
   * @description Handles the filtering of the table
   * @param filterValue 
   */
  applyFilter(filterValue: string) {
    this.dataSourceInvest.filter = filterValue.trim().toLowerCase();
  }
}
