import "../../../index.css"
import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useState } from "react"
import api from "../../../common/api"
import { isSuccessful } from "../../../common/utils/utils"
import localStorageUtils from "../../../common/utils/localStorageUtil"
import { useNavigate } from "react-router-dom"
import toatUtil from "../../../common/utils/toastUtil"

interface Props {
    toggleAuth: () => void
}

const SignIn = ({ toggleAuth }: Props): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSignIn = async () => {
        console.log(email, password)
        const response = await api.auth.signIn(email, password)
        if (isSuccessful(response.status)) {
            toatUtil.success('Аутенцификация успешна!')
            localStorageUtils.authToken.set(response.data.accessToken)
            navigate('/dashboard/')
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>Sign in</h1>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onSubmitCapture={handleSignIn}
        >
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
                        message: "Необходимо повторить пароль!",
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

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button">
                    Зайти
                </Button>
                или <span style={{ color: '#1677ff' }} onClick={toggleAuth}>зарегистрироваться</span>
            </Form.Item>
        </Form>
        </div>
    )
}

export default SignIn
