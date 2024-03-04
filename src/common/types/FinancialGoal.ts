export interface FinancialGoal {
    id: number;
    goal: string;
    sum: number;
    isAchieved: boolean;
    financialGoalHistoryDTOList: FinancialGoalHistory[];
}

export interface FinancialGoalHistory {
    id: number,
    sum: number,
    createdAt: any // TODO: LocalDateTime
}

export interface FinancialGoalRequest {
    sum: number,
    goal: string
} 

export interface FinancialGoalHistoryRequest {
    financialGoalId: number,
    sum: number
}
