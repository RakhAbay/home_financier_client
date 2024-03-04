import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../common/api";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import toatUtil from "../../../common/utils/toastUtil";
import InOutComeNumCategory from "../../../common/types/InOutComeNumCategory";

interface Props {
    isIncome: boolean,
    editPayload: InOutComeNumCategory | null
}

const AddInOutCome = ({ isIncome, editPayload }: Props): JSX.Element => {
    const [categoryId, setCategoryId] = useState<number | null>(editPayload?.category ?? null);
    const [amount, setAmount] = useState<number>(editPayload?.sum ?? 0);
    const [note, setNote] = useState<string>(editPayload?.comment ?? '')

    const resetForm = () => {
        setNote('')
        setAmount(0)
    }

    const queryClient = useQueryClient();

    const incomeCategoriesQuery = useQuery(
        "income-categories",
        api.categories.incomeCategories
    );
    const outcomeCategoriesQuery = useQuery(
        "outcome-categories",
        api.categories.outcomeCategories
    );

    const incomeCategories = incomeCategoriesQuery.data?.data;
    const outcomeCategories = outcomeCategoriesQuery.data?.data;

    const categories = isIncome ? incomeCategories : outcomeCategories
    const categoriesOptions = categories?.map(item => {
        return { value: item.id, label: item.name }
    })

    const incomeMutation = useMutation(api.income.saveIncome, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries("income");
            toatUtil.success('Добавлено')
            resetForm()
        },
    });
    const incomeEditMutation = useMutation(api.income.editIncome, {
        onSuccess: () => {
            queryClient.invalidateQueries("income");
            toatUtil.success('Изменено')
        },
    });
    const outcomeMutation = useMutation(api.outcome.saveOutcome, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries("outcome");
            toatUtil.success('Добавлено')
            resetForm()
        },
    });

    const handleInOutComeAddition = () => {
        // if (categoryId) {
        //     toatUtil.error('Укажите категорию')
        //     return
        // }
        const catId = (categoryId as unknown as number)
        if (isIncome) {
            if (editPayload) {
                incomeEditMutation.mutate({ id: editPayload.id, categoryId: catId, comment: note, sum: amount })
            } else {
                incomeMutation.mutate({ categoryId: catId, comment: note, sum: amount });
            }
        } else {
            outcomeMutation.mutate({ categoryId: catId, comment: note, sum: amount });
        }
    };

    const handleSelect = (value: number) => {
        setCategoryId(value)
      };

    return (
        <div>
            {/* <Title level={3}>Добавление категорий</Title> */}
            {/* <InputNumber
                placeholder="Сумма"
                value={amount}
                onChange={(number) => setAmount(number??0)}
            />
            <Input
                placeholder="Заметка"
                value={note}
                onChange={(event) => setNote(event.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button type="primary" onClick={handleInOutComeAddition}>Добавить</Button>
            </div> */}

            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onSubmitCapture={handleInOutComeAddition}
        >
            <Form.Item
                name="category"
                rules={[
                    {
                        required: true,
                        message: "Необходимо указать категорию",
                    },
                ]}
            >
                <Select defaultValue={editPayload?.category} options={categoriesOptions} onChange={handleSelect} />
            </Form.Item>
            <Form.Item
                name="amount"
                rules={[
                    {
                        required: true,
                        message: "Необходимо ввести сумму",
                    },
                ]}
            >
                <InputNumber
                    defaultValue={amount}
                    placeholder="Сумма"
                    value={amount}
                    onChange={(number) => setAmount(number??0)}
                />
            </Form.Item>
            <Form.Item name="note">
                <Input
                    defaultValue={note}
                    placeholder="Заметка"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button">
                    {editPayload ? 'Редактировать' : 'Добавить'}
                </Button>
            </Form.Item>
        </Form>

        </div>
    );
};

export default AddInOutCome;
