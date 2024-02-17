import "../../../index.css"
import { Form, Input, Button, Checkbox, Typography } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useState } from "react"
import api from "../../../common/api"
import { isSuccessful } from "../../../common/utils/utils"
import toatUtil from "../../../common/utils/toastUtil"

interface Props {
    toggleAuth: () => void
}

const SignUp = ({ toggleAuth }: Props): JSX.Element => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const { Title } = Typography

    const handleSignUp = async () => {
        const response = await api.auth.signUp({
            email,
            password,
            passwordConfirmation,
            firstName,
            lastName
        })
        if (isSuccessful(response.status)) {
            toatUtil.success('Регистрация прошла успешно!')
            toggleAuth()
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Title>Sign up</Title>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onSubmitCapture={handleSignUp}
        >
            <Form.Item
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: "Необходимо ввести имя!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Имя"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                />
            </Form.Item>
            <Form.Item
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: "Необходимо ввести фамилию!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Необходимо ввести email!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Необходимо ввести пароль!",
                    },
                ]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </Form.Item>
            <Form.Item
                name="passwordConfirmation"
                rules={[
                    {
                        required: true,
                        message: "Необходимо повторить пароль!",
                    },
                ]}>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Повторный пароль"
                    value={passwordConfirmation}
                    onChange={event => setPasswordConfirmation(event.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button">
                    Зарегистрироваться
                </Button>
                или <span style={{ color: '#1677ff' }} onClick={toggleAuth}>войти</span>
            </Form.Item>
        </Form>
        </div>
    )
}

export default SignUp
