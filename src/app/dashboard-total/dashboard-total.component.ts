import { BrowserModule } from "@angular/platform-browser";
import { Chart } from "chart.js";
import {
  NgModule,
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Investment } from "../investment";
import { MatSort, MatTableDataSource } from "@angular/material";
import { FundsDataService } from "../funds-data.service";
import { formatCurrency } from "@angular/common";

@Component({
  selector: "dashboard-total",
  templateUrl: "./dashboard-total.component.html",
  styleUrls: ["./dashboard-total.component.css"]
})
export class DashBoardTotal implements OnInit {
  @ViewChild("totalContainer")
  totalContainer: ElementRef;
  funds: any[];
  fundsAUM: any[];
  label = "Market Value";

  constructor(private _funds: FundsDataService) {}

  ngOnInit() {
    this._funds.getFundsData().subscribe(funds => {
      this.funds = funds;
      this.getAUM(this.funds);
    });
  }

  /**
   * @function setValueFormatting
   * @description Formats the value of the pie chart
   * @param value 
   */
  setValueFormatting(value) {
    return formatCurrency(value, "en-US", "$");
  }

  /**
   * @function getAUM
   * @description grabs the AUM data and places it into an object array
   * @param funds 
   */
  getAUM(funds: any[]): void {
    let tempFunds = [];
    funds.forEach(fund => {
      var newFund = {
        name: fund.fundName,
        value: fund.assetsUnderManagement
      };
      tempFunds.push(newFund);
    });
    this.fundsAUM = tempFunds;
  }
}
