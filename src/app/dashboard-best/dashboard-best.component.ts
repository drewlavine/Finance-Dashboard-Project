import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FundsDataService } from "../funds-data.service";

@Component({
  selector: "dashboard-best",
  templateUrl: "./dashboard-best.component.html",
  styleUrls: ["./dashboard-best.component.css"]
})
export class DashBoardBest implements OnInit {
  @ViewChild("bestContainer")
  bestContainer: ElementRef;

  // Attributes for the Graph
  view: number[] = [];
  barPadding = 25;
  round: boolean = false;
  colorScheme: string = "forest";
  showGridLines = true;
  roundEdges = false;
  xAxis = true;
  yAxis = true;
  legend = false;

  funds: any[];
  investments: any[];
  top3: any[];

  constructor(private _funds: FundsDataService) {}

  ngOnInit() {
    this._funds.getFundsData().subscribe(funds => {
      this.funds = funds;
      this.getInvestments(this.funds);
      this.getBest(this.investments);
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
   * @description The sort function used to sort the investment data
   * @param invest1 
   * @param invest2 
   */
  sortFunc(invest1: any, invest2: any) {
    return invest1.value < invest2.value ? 1 : -1;
  }

  /**
   * @function getBest
   * @description Gets the top 3 investments
   * @param investments
   */
  getBest(investments: any[]) {
    investments.sort(this.sortFunc);
    this.top3 = investments.slice(0, 3);
  }
}
