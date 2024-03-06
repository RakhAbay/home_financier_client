import { Button, List, Modal, Typography } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import api from "../../common/api";
import { UserUpdateRequest } from "../../common/types/User";
import EditProfile from "./components/EditProfile";

const ProfilePage = (): JSX.Element => {
    const profileQuery = useQuery(
        "profile",
        api.profile.getProfile
    );

    const data = profileQuery.data
    const profileData = data?.data
    const propToEditModal: UserUpdateRequest = {
        email: profileData?.email ?? '',
        firstName: profileData?.firstName ?? '',
        lastName: profileData?.lastName ?? ''
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <List
                header={
                    // <Typography.Title level={5}>Профиль</Typography.Title>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography.Title level={5}>Профиль:</Typography.Title>
                        <Button onClick={() => setIsModalOpen(true)} type="primary">Редактировать</Button>
                        <Button onClick={() => {console.log('DELETING...')}} type="primary" danger>Удалить</Button>
                    </div>
                }
                bordered
                // dataSource={incomeCategories}
                // renderItem={(item) => (
                //     <List.Item>
                //         <Typography.Text>{item.name}</Typography.Text>
                //     </List.Item>
                // )}
            >
                <List.Item>
                    <Typography.Text>Email</Typography.Text>
                    <Typography.Text>{profileData?.email}</Typography.Text>
                </List.Item>
                <List.Item>
                    <Typography.Text>Имя</Typography.Text>
                    <Typography.Text>{profileData?.firstName}</Typography.Text>
                </List.Item>
                <List.Item>
                    <Typography.Text>Фамилия</Typography.Text>
                    <Typography.Text>{profileData?.lastName}</Typography.Text>
                </List.Item>
            </List>

            {/* Модальное окно для редакирования профиля */}
            <Modal
                title="Редакирования профиля"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={[]}
            >
                <EditProfile userData={propToEditModal} />
            </Modal>
        </>
    )
}

export default ProfilePage
