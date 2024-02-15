import { useState } from "react"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

const AuthPage = (): JSX.Element => {
    const [isLogin, setIsLogin] = useState(true)

    const toggleAuth = () => {
        console.log(isLogin)
        setIsLogin(!isLogin)
    }

    return (
    <>
        <section style={{height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            {isLogin ? <SignIn toggleAuth={toggleAuth} /> : <SignUp toggleAuth={toggleAuth} />}
        </section>
    </>
    )
}

export default AuthPage
