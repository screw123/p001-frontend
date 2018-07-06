import LoginPage from './page/LoginPage.js'
import IndexPage from './page/IndexPage.js'
import DataPage from './page/DataPage.js'
import SignUpPage from './page/SignUpPage.js'
import UserActivationPage from './page/UserActivationPage.js'


const routes = [
    {
        path: "/login",
        menuName: 'Login',
        component: LoginPage
    },
    {
        path: "/signup",
        menuName: 'Sign Up',
        component: SignUpPage
    },
    {
        path: "/dash",
        menuName: 'Dashboard',
        component: DataPage,
        requireLogin: true
    },
    {
        path: "/userActivation/:_id?/:verificationPIN?",
        menuName: 'User Activation',
        component: UserActivationPage,
        showInNavBar: false
    },
    {
        path: "/",
        exact: true,
        menuName: 'Welcome to P001',
        component: IndexPage
    }
]



export default routes