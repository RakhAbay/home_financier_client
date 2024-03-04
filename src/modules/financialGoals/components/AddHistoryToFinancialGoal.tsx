import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../common/api";
import { Button, InputNumber, List, Typography } from "antd";
import { useState } from "react";
import toatUtil from "../../../common/utils/toastUtil";
import { FinancialGoalHistory } from "../../../common/types/FinancialGoal";

interface Props {
    financialGoalId: number
}

const AddHistoryToFinancialGoal = ({ financialGoalId }: Props): JSX.Element => {

    const financialGoalQuery = useQuery(
        "financial-goal",
        () => api.financialGoal.getFinancialGoalById(financialGoalId)
    );

    const financialGoal = financialGoalQuery.data?.data
    const history = financialGoal?.financialGoalHistoryDTOList ?? []

    const [sum, setSum] = useState(0);
    
    const formattedHistory: FinancialGoalHistory[] = history.map(item => {
        const date = new Date(item.createdAt)
        const year = date.getFullYear()
        let month: number | string = date.getMonth()
        month = month < 10 ? '0'+month : month
        let day: number | string = date.getDate()
        day = day < 10 ? '0'+day : day
        return {
            id: item.id,
            sum: item.sum,
            createdAt: `${year}-${month}-${day}`
        }
    })
    const queryClient = useQueryClient();
    const financialGoalHistoryMutation = useMutation(api.financialGoal.addHistory, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries("financial-goals");
            queryClient.invalidateQueries("financial-goal");
            toatUtil.success('Добавлено')
            setSum(0)
        },
    });

    const handleFinancialGoalHistoryAddition = () => {
        financialGoalHistoryMutation.mutate({ financialGoalId, sum })
    };

    return (
        <>
            <div style={{ marginBottom: '1em' }}>
                <InputNumber
                style={{ width: '100%' }}
                    placeholder="Сумма"
                    value={sum}
                    onChange={value => setSum(value??0)}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
                <Button type="primary" onClick={handleFinancialGoalHistoryAddition}>Добавить</Button>
            </div>
            <List
                header={<Typography.Title level={5}>История:</Typography.Title>}
                bordered
                dataSource={formattedHistory}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text>{item.sum}</Typography.Text>
                        <Typography.Text>{item.createdAt}</Typography.Text>
                    </List.Item>
                )}
            />
        </>
    );
};

export default AddHistoryToFinancialGoal;
