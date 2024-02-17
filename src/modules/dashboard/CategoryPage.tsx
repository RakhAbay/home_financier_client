import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import api from "../../common/api";
import AddCategory from "./components/AddCategory";
import { Button, Divider, List, Modal, Typography } from "antd";

const CategoryPage = (): JSX.Element => {
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    if (incomeCategoriesQuery.isLoading || outcomeCategoriesQuery.isLoading) {
        <h1>Loading</h1>;
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Добавить категорию
            </Button>

            <div style={{ marginTop: "20px" }}></div>
            <List
                header={<Typography.Title level={5}>Доходы</Typography.Title>}
                bordered
                dataSource={incomeCategories}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text>{item.name}</Typography.Text>
                    </List.Item>
                )}
            />

            <div style={{ marginTop: "20px" }}></div>
            <List
                header={<Typography.Title level={5}>Расходы</Typography.Title>}
                bordered
                dataSource={outcomeCategories}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text>{item.name}</Typography.Text>
                    </List.Item>
                )}
            />

            {/* Модальное окно для добавления категорий */}
            <Modal
                title="Добавление категорий"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}>
                <AddCategory />
            </Modal>
        </>
    );
};

export default CategoryPage;
