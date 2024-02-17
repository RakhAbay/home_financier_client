import { useMutation, useQueryClient } from "react-query";
import api from "../../../common/api";
import { Button, Input } from "antd";
import { useState } from "react";
import { Typography } from 'antd';
import toatUtil from "../../../common/utils/toastUtil";

const AddCategory = (): JSX.Element => {
    const [name, setName] = useState("");

    const queryClient = useQueryClient();
    const incomeCategoryMutation = useMutation(api.categories.addIncome, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries("income-categories");
            toatUtil.success('Добавлено')
            setName('')
        },
    });
    const outcomeCategoryMutation = useMutation(api.categories.addOutcome, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries("outcome-categories");
            toatUtil.success('Добавлено')
            setName('')
        },
    });

    const handleCategoryAddition = (isIcome: boolean) => {
        if (isIcome) {
            incomeCategoryMutation.mutate(name);
        } else {
            outcomeCategoryMutation.mutate(name);
        }
    };

    const { Title } = Typography

    return (
        <div>
            {/* <Title level={3}>Добавление категорий</Title> */}
            <Input
                placeholder="Название"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button type="primary" onClick={() => handleCategoryAddition(true)}>Доход</Button>
                <Button type="primary" danger onClick={() => handleCategoryAddition(false)}>
                    Расход
                </Button>
            </div>
        </div>
    );
};

export default AddCategory;
