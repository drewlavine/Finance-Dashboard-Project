import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FundsDataService } from "../funds-data.service";

@Component({
  selector: "dashboard-worst",
  templateUrl: "./dashboard-worst.component.html",
  styleUrls: ["./dashboard-worst.component.css"]
})
export class DashBoardWorst implements OnInit {
  @ViewChild("worstContainer")
  bestContainer: ElementRef;

  view: number[] = [];

  barPadding = 25;

  funds: any[];
  round: boolean = false;
  colorScheme: string = "fire";

  investments: any[];
  bottom3: any[];

  constructor(private _funds: FundsDataService) {}

  ngOnInit() {
    this._funds.getFundsData().subscribe(funds => {
      let tempNames = [];
      this.funds = funds;
      this.getInvestments(this.funds);
      this.getWorst(this.investments);
    });
    this.view = [
      this.bestContainer.nativeElement.offsetWidth,
      this.bestContainer.nativeElement.offsetHeight * 2
    ];
  }

  /**
   * @function onResize
   * @description resizes the graph whenever the window is resized
   * @param event
   */
  onResize(event) {
    this.view = [
      this.bestContainer.nativeElement.offsetWidth,
      this.bestContainer.nativeElement.offsetHeight
    ];
  }

  /**
   * @function getInvestments
   * @description Handles the parsing of the fund data for the graph
   * @param funds
   */
  getInvestments(funds: any[]) {
    let investments = [];
    funds.forEach(fund => {
      fund.investments.forEach(investment => {
        var currentValue: number = this._funds.getCurrentValue(investment);
        var capitalDeployed: number = this._funds.getCapitalDeployed(
          investment
        );
        var pNL: number = (capitalDeployed - currentValue) / capitalDeployed;
        var chartInvestment = {
          name: investment.ticker,
          value: +pNL.toFixed(4)
        };
        investments.push(chartInvestment);
      });
    });
    this.investments = investments;
  }

  /**
   * @function sortFunc
   * @desc The function used to sort the investments
   * @param invest1
   * @param invest2
   */
  sortFunc(invest1: any, invest2: any) {
    return invest1.value < invest2.value ? 1 : -1;
  }

  /**
   * @function getWorst
   * @description Gets the 3 worst performing investments
   * @param investments
   */
  getWorst(investments: any[]) {
    investments.sort(this.sortFunc);
    investments.reverse();
    this.bottom3 = investments.slice(0, 3).reverse();
  }
}
