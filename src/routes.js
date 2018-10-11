import LoginPage from './page/LoginPage.js'
import IndexPage from './page/IndexPage.js'
import UserDashboardPage from './page/UserDashboardPage.js'
import SignUpWorkflow from './page/SignUpWorkflow.js'
import ResetPasswordPage from './page/ResetPasswordPage.js'
import UserActivationPage from './page/UserActivationPage.js'
import TermsAndConditionPage from './page/TermsAndConditionPage.js'
import QuotationPage from './page/QuotationPage.js'
import SalesOrderConfirmPage from './page/SalesOrderConfirmPage.js'
import TestPage from './page/TestPage.js'

const routes = [
    {
        path: "/login",  //this should be removed as Login should be a right side icon item
        menuName: 'Login',
        component: LoginPage,
        navbar: {
            itemID: 2,
            showBeforeLogin: true,
            showAfterLogin: false
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/signup",  //this should be removed as sign up is right side icon item
        menuName: 'Sign Up',
        component: SignUpWorkflow,
        navbar: {
            itemID: 3,
            showBeforeLogin: true,
            showAfterLogin: false
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/dash",
        menuName: 'My Keep',
        component: UserDashboardPage,
        navbar: {
            itemID: 11,
            firstLevel: true,
            showBeforeLogin: false,
            showAfterLogin: true
        },
        router: {
            requireLogin: true
        }
    },
    {
        path: "/userActivation/:_id?/:verificationPIN?",  //will not show in NavBar
        linkURL: "/userActivation",
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
        path: "/terms",  //is temp, will update and change
        exact: true,
        menuName: 'Terms And Condition',
        component: TermsAndConditionPage,
        navbar: {
            itemID: 701,
            firstLevel: false,
            showBeforeLogin: true,
            showAfterLogin: true
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/",  //main page
        exact: true,
        menuName: 'Home',
        component: IndexPage,
        navbar: {
            itemID: 1,
            firstLevel: true,
            showBeforeLogin: true,
            showAfterLogin: false
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/resetPassword",  //this should be removed as reset password should only be shown in login page
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
        path: "/quotation/:quotation_id?",
        linkURL: "/quotation",
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
        path: "/confirmSalesOrder",  //should be removed???
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
    },
    {
        path: "/testPage",
        exact: true,
        menuName: 'Testing Zone',
        component: TestPage,
        navbar: {
            itemID: 999,
            firstLevel: true,
            showBeforeLogin: true,
            showAfterLogin: true
        },
        router: {
            requireLogin: false
        }
    },
]

export default routes