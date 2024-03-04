import { useMutation, useQueryClient } from "react-query";
import api from "../../../common/api";
import { Button, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import { Typography } from 'antd';
import toatUtil from "../../../common/utils/toastUtil";

const AddFinancialGoal = (): JSX.Element => {
    const [goal, setGoal] = useState("");
    const [sum, setSum] = useState(0);

    const resetForm = () => {
        setGoal('')
        setSum(0)
    }

    const queryClient = useQueryClient();
    const financialGoalMutation = useMutation(api.financialGoal.addFinancialGoal, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries("financial-goals");
            toatUtil.success('Добавлено')
            resetForm()
        },
    });

    const handleFinancialGoalAddition = () => {
        financialGoalMutation.mutate({ goal, sum })
    };

    return (
        <>
            <div style={{ marginBottom: '10px' }}>
                <Input
                    placeholder="Цель"
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                />
            </div>
            <div>
                <InputNumber
                style={{ width: '100%' }}
                    placeholder="Сумма"
                    value={sum}
                    onChange={value => setSum(value??0)}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button type="primary" onClick={handleFinancialGoalAddition}>Добавить</Button>
            </div>
        </>
    );
};

export default AddFinancialGoal;
