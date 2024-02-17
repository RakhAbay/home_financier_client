import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../common/api";
import AddInOutCome from "./components/AddInOutCome";
import { useState } from "react";
import { Button, List, Modal, Typography } from "antd";
import toatUtil from "../../common/utils/toastUtil";
import InOutCome from "../../common/types/InOutCome";
import InOutComeNumCategory from "../../common/types/InOutComeNumCategory";

const InOutComePage = (): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIncome, setIsIncome] = useState(false);
    const [editInOutCome, setEditInOutCome] = useState<InOutComeNumCategory | null>(null)

    const showModalEditIncome = () => {
        setIsIncome(true)
        setIsModalOpen(true);
    }

    const showModalIncome = () => {
        setEditInOutCome(null)
        setIsIncome(true)
        setIsModalOpen(true);
    };

    const showModalOutcome = () => {
        setIsIncome(false)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const incomeQuery = useQuery(
        "income",
        api.income.list
    );
    const outcomeQuery = useQuery(
        "outcome",
        api.outcome.list
    );

    const incomes = incomeQuery.data?.data;
    const outcomes = outcomeQuery.data?.data;

    const queryClient = useQueryClient();
    const incomeDeleteMutation = useMutation(api.income.deleteIncome, {
        onSuccess: () => {
            queryClient.invalidateQueries("income");
            toatUtil.success('Удалено')
        },
    });
    // const outcomeCategoryMutation = useMutation(api.categories.addOutcome, {
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries("outcome-categories");
    //         toatUtil.success('Добавлено')
    //         setName('')
    //     },
    // });

    const handleEdit = (payload: InOutCome, isIncome: boolean) => {
        setEditInOutCome({ id: payload.id, sum: payload.sum, comment: payload.comment, category: payload.category.id })
        if (isIncome) {
            showModalEditIncome()
        } else {
            showModalOutcome()
        }
    }

    const handleDelete = (id: number, isIncome: boolean) => {
        if (isIncome) {
            incomeDeleteMutation.mutate(id)
        } else {
        }
    }

    const modalTitle = isIncome ? "Добавление дохода" : "Добавление расхода"

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', margin: '10px'}}>
        <Button type="primary" onClick={showModalIncome}>
                Добавить доход
            </Button>
            <Button type="primary" onClick={showModalOutcome}>
                Добавить расход
            </Button>
        </div>

            <List
                header={<Typography.Title level={5}>Доходы</Typography.Title>}
                bordered
                dataSource={incomes}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text>{item.sum}</Typography.Text>
                        <Typography.Text>{item.category?.name}</Typography.Text>
                        <Typography.Text>{item.comment}</Typography.Text>
                        <Button type="primary" onClick={() => handleEdit(item, true)}>Редактировать</Button>
                        <Button type="primary" danger onClick={() => handleDelete(item.id, true)}>Удалить</Button>
                    </List.Item>
                )}
            />
            <List
                header={<Typography.Title level={5}>Расходы</Typography.Title>}
                bordered
                dataSource={outcomes}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text>{item.sum}</Typography.Text>
                        <Typography.Text>{item.category?.name}</Typography.Text>
                        <Typography.Text>{item.comment}</Typography.Text>
                    </List.Item>
                )}
            />

            {/* Модальное окно для добавления категорий */}
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}>
                <AddInOutCome isIncome={isIncome} editPayload={editInOutCome} />
            </Modal>
        </>
    );
};

export default InOutComePage;
