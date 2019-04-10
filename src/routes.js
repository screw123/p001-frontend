import IndexPage from "./page/IndexPage.js"
import FeaturesPage from "./page/FeaturesPage.js"
import PricingPage from "./page/PricingPage.js"
import OurClientsPage from "./page/OurClientsPage.js"
import AboutUsPage from "./page/AboutUsPage.js"
import LoginPage from "./page/LoginPage.js"

import UserDashboardPage from "./page/UserDashboardPage.js"
import SignUpWorkflow from "./page/SignUpWorkflow.js"
import ResetPasswordPage from "./page/ResetPasswordPage.js"
import UserActivationPage from "./page/UserActivationPage.js"
import TermsAndConditionPage from "./page/TermsAndConditionPage.js"
import QuotationPage from "./page/QuotationPage.js"
import SalesOrderConfirmPage from "./page/SalesOrderConfirmPage.js"
import UserProfilePage from "./page/UserProfilePage.js"
import EditAccountPage from "./page/EditAccountPage.js"
import ROListPage from "./page/ROListPage.js"
import RODetailsPage from "./page/RODetailsPage.js"
import ThankYouForOrderPage from "./page/ThankYouForOrderPage.js"
import AddPickUpOrderPage from "./page/AddPickUpOrderPage.js"
import AddDeliveryOrderPage from "./page/AddDeliveryOrderPage.js"
import PUODOListPage from "./page/PUODOListPage.js"
import PUODetailsPage from "./page/PUODetailsPage.js"
import DODetailsPage from "./page/DODetailsPage.js"
import ContainerListPage from "./page/ContainerListPage.js"
import ContainerDetailsPage from "./page/ContainerDetailsPage.js"

export {NotFoundPage as NotFound} from "./page/NotFoundPage.js"

const routes = [
	{
		path: '/login', //this should be removed as Login should be a right side icon item
		menuName: 'Login',
		component: LoginPage,
		navbar: {
			firstLevel: true,
			itemId: 11,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: false
		}
	},
	{
		path: '/signup', //this should be removed as sign up is right side icon item
		menuName: 'Sign Up',
		component: SignUpWorkflow,
		navbar: {
			itemId: 12,
			firstLevel: true,
			showBeforeLogin: false,
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
		menuName: "Move Your Box",
		navbar: {
			itemId: 200,
			firstLevel: true,
			showBeforeLogin: false,
			showAfterLogin: true
		}
	},
	{
		menuName: "Records",
		navbar: {
			itemId: 400,
			firstLevel: true,
			showBeforeLogin: false,
			showAfterLogin: true
		}
	},
	{
		path: "/dash",
		menuName: "Dashboard",
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
		path: '/userActivation/:_id?/:verificationPIN?', //will not show in NavBar
		linkURL: '/userActivation',
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
		path: '/terms', //is temp, will update and change
		exact: true,
		menuName: 'Terms And Condition',
		component: TermsAndConditionPage,
		navbar: {
			itemId: 701,
			firstLevel: true,
			showBeforeLogin: false,
			showAfterLogin: true
		},
		router: {
			requireLogin: false
		}
	},
	{
		path: '/', //main page
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
		path: '/features',
		exact: true,
		menuName: 'Features',
		component: FeaturesPage,
		navbar: {
			itemId: 2,
			firstLevel: true,
			showBeforeLogin: true,
			showAfterLogin: false
		},
		router: {
			requireLogin: false
		}
	},
	{
		path: '/pricing',
		exact: true,
		menuName: 'Pricing',
		component: PricingPage,
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
		path: "/clients",
		exact: true,
		menuName: "Our Clients",
		component: OurClientsPage,
		navbar: {
			itemId: 4,
			firstLevel: true,
			showBeforeLogin: true,
			showAfterLogin: false
		},
		router: {
			requireLogin: false
		}
	},
	{
		path: "/aboutus",
		exact: true,
		menuName: "About Us",
		component: AboutUsPage,
		navbar: {
			itemId: 5,
			firstLevel: true,
			showBeforeLogin: true,
			showAfterLogin: false
		},
		router: {
			requireLogin: false
		}
	},
	{
		path: '/resetPassword', //this should be removed as reset password should only be shown in login page
		exact: true,
		menuName: 'Reset Your Password',
		component: ResetPasswordPage,
		navbar: {
			itemId: 702,
			firstLevel: true,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: false
		}
	},
	{
		path: '/quotation',
		exact: true,
		menuName: 'Quotation',
		component: QuotationPage,
		navbar: {
			itemId: 801,
			firstLevel: true,
			showBeforeLogin: true,
			showAfterLogin: true
		},
		router: {
			requireLogin: false
		}
	},
	{
		path: '/confirmSalesOrder/:quotation_id?', //should be removed???
		linkURL: '/confirmSalesOrder',
		exact: true,
		menuName: 'Confirm Sales Order',
		component: SalesOrderConfirmPage,
		navbar: {
			itemId: 901,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: "/editUser",
		exact: true,
		menuName: 'Edit User',
		component: UserProfilePage,
		navbar: {
			itemId: 112,
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
		path: '/editAccount/:account_id?/:mode?',
		linkURL: '/editAccount',
		exact: true,
		menuName: 'Edit Account',
		component: EditAccountPage,
		navbar: {
			itemId: 113,
			parentId: 100,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: "/ROList",
		menuName: "Rental Record",
		component: ROListPage,
		navbar: {
			itemId: 401,
			parentId: 400,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: true
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: '/RODetails/:id?',
		menuName: 'Box Rental Details',
		component: RODetailsPage,
		navbar: {
			itemId: 402,
			parentId: 400,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: '/ArrangePickUp',
		menuName: 'Send Box To Wisekeep',
		component: AddPickUpOrderPage,
		navbar: {
			itemId: 201,
			parentId: 200,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: true
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: '/ArrangeDelivery',
		menuName: 'Get your stuff',
		component: AddDeliveryOrderPage,
		navbar: {
			itemId: 202,
			parentId: 200,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: true
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: "/PUODOList",
		menuName: "Movement Record",
		component: PUODOListPage,
		navbar: {
			itemId: 411,
			parentId: 400,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: true
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: '/ThankYou',
		menuName: 'Thank you for your order',
		component: ThankYouForOrderPage,
		navbar: {
			itemId: 902,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: '/PUODetails/:id?',
		menuName: 'Box Movement Details (Pick Up)',
		component: PUODetailsPage,
		navbar: {
			itemId: 412,
			parentId: 100,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: '/DODetails/:id?',
		menuName: 'Box Movement Details (Delivery)',
		component: DODetailsPage,
		navbar: {
			itemId: 413,
			parentId: 100,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: '/ContainerList',
		menuName: 'All your stuffs',
		component: ContainerListPage,
		navbar: {
			itemId: 501,
			firstLevel: true,
			showBeforeLogin: false,
			showAfterLogin: true
		},
		router: {
			requireLogin: true
		}
	},
	{
		path: '/ContainerDetails/:container_id?',
		menuName: 'Container Details',
		component: ContainerDetailsPage,
		navbar: {
			itemId: 402,
			parentId: 100,
			firstLevel: false,
			showBeforeLogin: false,
			showAfterLogin: false
		},
		router: {
			requireLogin: true
		}
	}
]

export default routes
