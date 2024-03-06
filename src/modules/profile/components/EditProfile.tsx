import { useMutation, useQueryClient } from "react-query";
import api from "../../../common/api";
import { Button, Input } from "antd";
import { useState } from "react";
import toatUtil from "../../../common/utils/toastUtil";
import { UserUpdateRequest } from "../../../common/types/User";

interface Props {
    userData: UserUpdateRequest
}

const EditProfile = ({ userData }: Props): JSX.Element => {
    const [email, setEmail] = useState(userData.email);
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);

    const queryClient = useQueryClient();
    const profileMutation = useMutation(api.profile.updateProfile, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries("profile");
            toatUtil.success('Изменено')
        },
    });

    const handleFinancialGoalAddition = () => {
        const payload: UserUpdateRequest = {
            email: userData.email,
            firstName: firstName,
            lastName: lastName
        }
        console.log(payload)
        profileMutation.mutate(payload)
    };

    return (
        <>
            {/* TODO: implement after backfix <div style={{ marginBottom: '10px' }}>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div> */}
            <div style={{ marginBottom: '10px' }}>
                <Input
                    placeholder="Имя"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <Input
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="primary" onClick={handleFinancialGoalAddition}>Изменить</Button>
            </div>
        </>
    );
};

export default EditProfile;
