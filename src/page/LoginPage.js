import React from "react"
import LoginForm from '../form/LoginForm.js'

class LoginPage extends React.Component {
    
    
    render = () => (
        <div>
            <h1>Login Page</h1>
            <h3>Please type your info below:</h3>
            <LoginForm />
        </div>
    )
}

export default LoginPage