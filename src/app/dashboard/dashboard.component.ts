import { Component, OnInit } from "@angular/core";
import { FundsDataService } from "../funds-data.service";
import { StockMarketService } from "../stock-market.service";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashBoardComponent implements OnInit {
  constructor(
    private _funds: FundsDataService,
    private _stock: StockMarketService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "user",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/user.svg")
    );
    iconRegistry.addSvgIcon(
      "help",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/info.svg")
    );
    iconRegistry.addSvgIcon(
      "messages",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/messages.svg")
    );
    iconRegistry.addSvgIcon(
      "alerts",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/alerts.svg")
    );
  }
  tileColor = "white";

  ngOnInit() {}
}
