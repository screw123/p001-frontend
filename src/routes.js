import LoginPage from './page/LoginPage.js'
import IndexPage from './page/IndexPage.js'
import DataPage from './page/DataPage.js'
import SignUpPage from './page/SignUpPage.js'


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
        path: "/",
        exact: true,
        menuName: 'Welcome to P001',
        component: IndexPage
    }
]



export default routes