// Investment interface for the data table

export interface Investment {
    ticker: string;
    fund: string;
    investmentType: string;
    pNL: string;
    currentValue: number;
    capitalDeployed: number;
} 