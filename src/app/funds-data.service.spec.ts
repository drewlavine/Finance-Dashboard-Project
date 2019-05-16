import { FundsDataService } from "./funds-data.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

// Other imports
import { TestBed, inject } from "@angular/core/testing";

// Straight Jasmine testing without Angular's testing support
describe("FundsDataService", () => {
  let service: FundsDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [FundsDataService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(FundsDataService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe("#getCapitalDeployed", () => {
    let mockInvestmentPrivate: Object;
    let mockInvestmentPublic: Object;

    beforeEach(() => {
      service = TestBed.get(FundsDataService);
      mockInvestmentPrivate = {
        investmentType: "private",
        ticker: "IN",
        recurringRevenue: "3.64",
        investedValue: "169.64",
        currentValue: "185.23"
      };

      mockInvestmentPublic = {
        investmentType: "public",
        ticker: "LABORE",
        sharePrice: "91.46",
        purchaseSharePrice: "96.89",
        shares: 18110
      };
    });

    it("should return the investedValue for a private investment", () => {
      expect<any>(service.getCapitalDeployed(mockInvestmentPrivate)).toBe(
        "169.64"
      );
    });

    it("should return the calculated, reduced Capital Deployed for a public investment", () => {
      expect(service.getCapitalDeployed(mockInvestmentPublic)).toBe(17.546779);
    });
  });

  describe("#getCurrentValue", () => {
    let mockInvestmentPrivate: Object;
    let mockInvestmentPublic: Object;

    beforeEach(() => {
      service = TestBed.get(FundsDataService);
      mockInvestmentPrivate = {
        investmentType: "private",
        ticker: "IN",
        recurringRevenue: "3.64",
        investedValue: "169.64",
        currentValue: "185.23"
      };

      mockInvestmentPublic = {
        investmentType: "public",
        ticker: "LABORE",
        sharePrice: "91.46",
        purchaseSharePrice: "96.89",
        shares: 18110
      };
    });

    it("should return the currentValue for a private investment", () => {
      expect<any>(service.getCurrentValue(mockInvestmentPrivate)).toBe(
        "185.23"
      );
    });

    it("should return the calculated, reduced Current value for a public investment", () => {
      expect(service.getCurrentValue(mockInvestmentPublic)).toBe(
        16.563405999999997
      );
    });
  });

  describe("#getFundsData", () => {
    let mockFundData: Object;

    beforeEach(() => {
      service = TestBed.get(FundsDataService);
      mockFundData = {
        fundId: 1,
        fundName: "Growth Fund",
        assetsUnderManagement: 7541.64,
        investments: [
          {
            investmentType: "public",
            ticker: "CUPIDATAT",
            sharePrice: "181.24",
            purchaseSharePrice: "192.21",
            shares: 16408
          },
          {
            investmentType: "public",
            ticker: "ULLAMCO",
            sharePrice: "51.25",
            purchaseSharePrice: "48.58",
            shares: 56796
          }
        ]
      };
    });

    it("should check to see if Fund Data is gotten", inject(
      [HttpTestingController, FundsDataService],
      (httpMock: HttpTestingController, service: FundsDataService) => {
        service.getFundsData().subscribe(funds => {
          expect(funds).toBe(mockFundData as string[], 'to be mockFund Data');
        });

        const req = httpTestingController.expectOne(service.fundUrl);
        expect(req.request.method).toEqual("GET");

        req.flush(mockFundData);
      }
    ));
  });
});
