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
import PaymentInfoForm from './form/PaymentInfoForm'

const routes = [
    {
        path: "/login",  //this should be removed as Login should be a right side icon item
        menuName: 'Login',
        component: LoginPage,
        navbar: {
            firstLevel: true,
            itemId: 2,
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
            itemId: 3,
            firstLevel: true,
            showBeforeLogin: true,
            showAfterLogin: false
        },
        router: {
            requireLogin: false
        }
    },
    {
        menuName: 'My Keep',
        navbar: {
            itemId: 100,
            firstLevel: true,
            showBeforeLogin: false,
            showAfterLogin: true
        }
    },
    {
        path: "/dash",
        menuName: 'Dashboard',
        component: UserDashboardPage,
        navbar: {
            itemId: 101,
            parentId: 100,
            firstLevel: false,
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
            itemId: 901,
            firstLevel: false,
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
            itemId: 701,
            parentId: 100,
            firstLevel: false,
            showBeforeLogin: false,
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
            itemId: 1,
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
            itemId: 702,
            parentId: 100,
            firstLevel: false,
            showBeforeLogin: false,
            showAfterLogin: true
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
            itemId: 101,
            firstLevel: true,
            showBeforeLogin: true,
            showAfterLogin: true
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/confirmSalesOrder/:quotation_id?",  //should be removed???
        linkURL: "/confirmSalesOrder",
        exact: true,
        menuName: 'Confirm Sales Order',
        component: SalesOrderConfirmPage,
        navbar: {
            itemId: 901,
            firstLevel: true,
            showBeforeLogin: true,
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
            itemId: 999,
            firstLevel: true,
            showBeforeLogin: true,
            showAfterLogin: true
        },
        router: {
            requireLogin: false
        }
    },
    {
        path: "/stripe",
        exact: true,
        component: PaymentInfoForm,
        navbar: {
            itemId: 991,
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