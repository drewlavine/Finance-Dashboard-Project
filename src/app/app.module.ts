import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import {
  MatGridListModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatCardModule,
  MatToolbarModule,
  MatTabsModule,
  MatIconModule,
  MatChipsModule
} from "@angular/material";
import { DashBoardComponent } from "./dashboard/dashboard.component";
import { DashBoardBest } from "./dashboard-best/dashboard-best.component";
import { DashBoardTotal } from "./dashboard-total/dashboard-total.component";
import { DashBoardTable } from "./dashboard-table/dashboard-table.component";
import { DashBoardPNL } from "./dashboard-pnl/dashboard-pnl.component";
import { FundsDataService } from "./funds-data.service";
import { StockMarketService } from "./stock-market.service";

import { HttpClientModule } from "@angular/common/http";

import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardStocks } from "./dashboard-stocks/dashboard-stocks.component";
import { DashBoardWorst } from "./dashboard-worst/dashboard-worst.component";

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    DashBoardBest,
    DashBoardTotal,
    DashBoardPNL,
    DashBoardTable,
    DashboardStocks,
    DashBoardWorst
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatTabsModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [FundsDataService, StockMarketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
