import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../common/api";
import { Button, List, Modal, Typography } from "antd";
import { useState } from "react";
import AddFinancialGoal from "./components/AddFinancialGoal";
import toatUtil from "../../common/utils/toastUtil";
import AddHistoryToFinancialGoal from "./components/AddHistoryToFinancialGoal";
import { FinancialGoalHistory } from "../../common/types/FinancialGoal";

const FinancialGoalsPage = (): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [financialGoalId, setFinancialGoalId] = useState(-1)
    const [history, setHistory] = useState<FinancialGoalHistory[]>([])

    const queryClient = useQueryClient();
    const financialGoalDeleteMutation = useMutation(api.financialGoal.deleteFinancialGoal, {
        onSuccess: () => {
            queryClient.invalidateQueries("financial-goals");
            toatUtil.success('Удалено')
        },
    });

    const financialGoalsQuery = useQuery(
        "financial-goals",
        api.financialGoal.getFinancialGoalsByUser
    );

    const { data } = financialGoalsQuery
    const financialGoals = data?.data

    const handleOpenHistoryAddition = (id: number, history: FinancialGoalHistory[]) => {
        setFinancialGoalId(id)
        setHistory(history)
        setIsHistoryModalOpen(true)
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        financialGoalDeleteMutation.mutate(id)
    }

    return (
        <div>
            <List
                header={
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography.Title level={5}>Финансовые Цели:</Typography.Title>
                        <Button onClick={showModal} type="primary">Добавить</Button>
                    </div>
                }
                bordered
                dataSource={financialGoals}
                renderItem={(item) => {
                    const total = item.financialGoalHistoryDTOList
                        .map(item => item.sum)
                        .reduce((acc, sum) => acc+sum, 0)
                    return (
                    <List.Item>
                        <span style={{ width: '10em' }}>
                            <Typography.Text>{item.goal}</Typography.Text>
                        </span>
                        <span style={{ width: '10em' }}>
                            <Typography.Text>{total}/{item.sum}</Typography.Text>
                        </span>
                        <span style={{ width: '10em' }}>
                            <Typography.Text>{item.isAchieved ? 'Достигнут' : 'Недостигнут'}</Typography.Text>
                        </span>
                        <span style={{ width: '10em' }}>
                            <Button type="primary" onClick={() => handleOpenHistoryAddition(item.id, item.financialGoalHistoryDTOList)}>История</Button>
                        </span>
                        <span>
                            <Button type="primary" danger onClick={() => handleDelete(item.id)}>Удалить</Button>
                        </span>
                    </List.Item>
                )}}
            />

            {/* Модальное окно для добавления фин. целей */}
            <Modal
                title="Добавление финансовых целей"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >
                <AddFinancialGoal />
            </Modal>

            {/* Модальное окно для добавления историй для фин. цели */}
            <Modal
                title="Добавление историй для финансовых цели"
                open={isHistoryModalOpen}
                onOk={() => setIsHistoryModalOpen(false)}
                onCancel={() => setIsHistoryModalOpen(false)}
                footer={[]}
            >
                <AddHistoryToFinancialGoal financialGoalId={financialGoalId} />
            </Modal>
        </div>
    )
}

export default FinancialGoalsPage
