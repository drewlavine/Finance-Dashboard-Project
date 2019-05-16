import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { DashBoardComponent } from "./dashboard/dashboard.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import {
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
} from "@angular/material";
import { DashBoardBest } from "./dashboard-best/dashboard-best.component";
import { DashBoardTotal } from "./dashboard-total/dashboard-total.component";
import { DashBoardPNL } from "./dashboard-pnl/dashboard-pnl.component";
import { DashBoardTable } from "./dashboard-table/dashboard-table.component";
import { DashboardStocks } from "./dashboard-stocks/dashboard-stocks.component";
import { DashBoardWorst } from "./dashboard-worst/dashboard-worst.component";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [
        AppComponent,
        DashBoardComponent,
        DashBoardBest,
        DashBoardTotal,
        DashBoardPNL,
        DashBoardTable,
        DashboardStocks,
        DashBoardWorst
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'financeDashboard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("financeDashboard");
  });
});
