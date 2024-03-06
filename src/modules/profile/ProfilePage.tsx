import { Button, Modal } from "antd";
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
            <h1>Profile Page</h1>
            {profileData?.id} <br />
            {profileData?.firstName} <br />
            {profileData?.lastName} <br />
            {profileData?.email} <br />
            {profileData?.roles} <br />
            <Button onClick={() => setIsModalOpen(true)} type="primary">Редактировать</Button>

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
