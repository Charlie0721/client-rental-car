export interface ICar {
    id: number;
    plate: string;
    carType: string;
    basePrice: number;
    numberOfDays: number;
    variablePrices?: number;
    totalToPay: number;


}