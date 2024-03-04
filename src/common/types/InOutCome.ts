import Category from "./Category";

interface InOutCome {
    id: number;
    sum: number;
    category: Category;
    comment: string;
    createdAt: string;
}

export interface InOutComeAnalytics {
    totalSum: number,
    inOutComePercentageList: InOutComePercentage[]

}

export interface InOutComePercentage {
    sum: number,
    percentage: number;
    categoryDTO: Category;
}

export default InOutCome;
