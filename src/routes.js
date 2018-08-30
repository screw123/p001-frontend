import LoginPage from './page/LoginPage.js'
import IndexPage from './page/IndexPage.js'
import DataPage from './page/DataPage.js'
import SignUpWorkflow from './page/SignUpWorkflow.js'
import ResetPasswordPage from './page/ResetPasswordPage.js'
import UserActivationPage from './page/UserActivationPage.js'
import TermsAndConditionPage from './page/TermsAndConditionPage.js'
import QuotationPage from './page/QuotationPage.js'
import SalesOrderConfirmPage from './page/SalesOrderConfirmPage.js'

const routes = [
    {
        path: "/login",
        menuName: 'Login',
        component: LoginPage,
        navbar: {
            showBeforeLogin: true,
            showAfterLogin: false
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/signup",
        menuName: 'Sign Up',
        component: SignUpWorkflow,
        navbar: {
            showBeforeLogin: true,
            showAfterLogin: false
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/dash",
        menuName: 'Dashboard',
        component: DataPage,
        navbar: {
            showBeforeLogin: false,
            showAfterLogin: true
        },
        router: {
            requireLogin: true
        }
    },
    {
        path: "/userActivation/:_id?/:verificationPIN?",
        menuName: 'User Activation',
        component: UserActivationPage,
        navbar: {
            showBeforeLogin: false,
            showAfterLogin: false
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/terms",
        exact: true,
        menuName: 'Terms And Condition',
        component: TermsAndConditionPage,
        navbar: {
            showBeforeLogin: true,
            showAfterLogin: true
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/",
        exact: true,
        menuName: 'Welcome to P001',
        component: IndexPage,
        navbar: {
            showBeforeLogin: true,
            showAfterLogin: true
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/resetPassword",
        exact: true,
        menuName: 'Reset Your Password',
        component: ResetPasswordPage,
        navbar: {
            showBeforeLogin: false,
            showAfterLogin: false
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/quotation",
        exact: true,
        menuName: 'Quotation',
        component: QuotationPage,
        navbar: {
            showBeforeLogin: true,
            showAfterLogin: true
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/confirmSalesOrder",
        exact: true,
        menuName: 'Confirm Sales Order',
        component: SalesOrderConfirmPage,
        navbar: {
            showBeforeLogin: false,
            showAfterLogin: true
        },
        router: {
            requireLogin: true
        }    
    }
]

export default routes