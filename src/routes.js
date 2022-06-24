import * as React from 'react';

import Home from './pages/home';
import NotFound from './pages/not-found';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import FitnessSignUp from './pages/subscriptions/fitness';
import DoctorSignUp from './pages/subscriptions/doctor';
import Browse from './pages/broswe';
import Doctors from './pages/doctors';
import DoctorDetails from './pages/doctors/doctor-details';
import DoctorAppointment from './pages/doctors/appointment';
import DoctorAppointmentPay from './pages/doctors/appointmentpay';
import AppointmentDone from './pages/doctors/appointment-done';
import medicalCenterAppointment from './pages/medical-center/appointment';
import medicalCenterAppointmentDone from './pages/medical-center/appointment-done';
import Drugs from './pages/drugs';
import DrugDetails from './pages/drugs/details';
import CheckoutDone from './pages/checkout/done';

import Subscriptions from './pages/subscriptions';
import SubscriptionDone from './pages/subscriptions/done';

import PersonalInfo from './pages/account/personal-info';
import Account from './pages/account';
import Fitness from './pages/fitness';
import Notifications from './pages/notifications';
import PrivacyPolicy from './pages/about/privacyPolicy'
import TermsAndC from './pages/about/terms'
import About from './pages/about/about'
import Forgot from './pages/auth/forgot';
import ResetPassword from './pages/auth/resetpassword';
import HealthAppointmentPay from './pages/medical-center/appointment-pay';
const routes = [
	{
		id: 1,
		path: '/',
		component: Home,
		auth: false,
		exact: true,
		route: true,
		pageTitle: 'Home',
	},
	{
		id: 2,
		path: '/login',
		component: Login,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Login',
	},
	{
		id: 2.1,
		path: '/signup',
		component: SignUp,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Sign Up',
	},

	{
		id: 2.2,
		path: '/forgot',
		component: Forgot,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Forgot Password',
	},

	{
		id: 2.4,
		path: '/reset-password',
		component: ResetPassword,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Reset Password',
	},

	{
		id: 3,
		path: '/doctors',
		component: Doctors,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Doctors',
	},
	{
		id: 4.1,
		path: '/doctor/:uuid',
		component: DoctorDetails,
		auth: false,
		exact: true,
		route: true,
		pageTitle: 'Doctor Details',
	},
	{
		id: 4.2,
		path: '/doctor/:uuid/appointment',
		component: DoctorAppointment,
		auth: false,
		exact: true,
		route: true,
		pageTitle: `Doctor's Appointment`,
	},

	//for doctor appointment payment 
	{
		id: 4.3,
		path: '/doctor/:uuid/appointment/pay',
		component: DoctorAppointmentPay,
		auth: false,
		exact: true,
		route: true,
		pageTitle: `Doctor's Appointment`,
	},
	
		//for hospital appointment payment 
		{
			id: 4.5,
			path: '/appointment/pay',
			component: HealthAppointmentPay,
			auth: true,
			exact: true,
			route: true,
			pageTitle: `Health Center Appointment`,
		},

	{
		id: 7,
		path: '/drugs',
		component: Drugs,
		auth: false,
		exact: true,
		route: true,
		pageTitle: 'Drugs',
	},
	{
		id: 8,
		path: '/drug/:uuid',
		component: DrugDetails,
		auth: false,
		exact: true,
		route: true,
		pageTitle: 'Drug Details',
	},
	{
		id: 8,
		path: '/checkout-completed',
		component: CheckoutDone,
		auth: false,
		exact: true,
		route: true,
		pageTitle: 'Order Summary',
	},
	{
		id: 9,
		path: '/account',
		component: Account,
		auth: true,
		exact: false,
		route: true,
		pageTitle: 'Account',
	},
	{
		id: 10,
		path: '/doctor-signup',
		component: DoctorSignUp,
		auth: true,
		exact: false,
		route: true,
		pageTitle: 'Doctor Subscription',
	},
	{
		id: 11,
		path: '/fitness-signup',
		component: FitnessSignUp,
		auth: true,
		exact: false,
		route: true,
		pageTitle: 'Fitness Subscription',
	},
	{
		id: 12,
		path: '/appointment',
		component: medicalCenterAppointment,
		auth: true,
		exact: true,
		route: true,
		pageTitle: 'Appointment',
	},
	{
		id: 12.1,
		path: '/appointment/done',
		component: medicalCenterAppointmentDone,
		auth: true,
		exact: true,
		route: true,
		pageTitle: 'Appointment',
	},
	{
		id: 13,
		path: '/appointment-done',
		component: AppointmentDone,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Appointment Done',
	},
	{
		id: 14,
		path: '/subscriptions',
		component: Subscriptions,
		auth: true,
		exact: false,
		route: true,
		pageTitle: 'Plan Subscriptions',
	},
	{
		id: 14.1,
		path: '/subscription-done',
		component: SubscriptionDone,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Notifications',
	},
	{
		id: 15,
		path: '/browse',
		component: Browse,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Browse',
	},
	{
		id: 16,
		path: '/fitness',
		component: Fitness,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Browse',
	},
	{
		id: 17,
		path: '/notifications',
		component: Notifications,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Notifications',
	},
	{
		id: 18,
		path: '/privacy_policy',
		component: PrivacyPolicy,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Privacy',
	},

	{
		id: 19,
		path: '/terms_and_conditions',
		component: TermsAndC,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Privacy',
	},


	{
		id: 20,
		path: '/about',
		component: About,
		auth: false,
		exact: false,
		route: true,
		pageTitle: 'Privacy',
	},
	{
		id: 404,
		path: '/*',
		component: NotFound,
		exact: false,
		route: true,
		pageTitle: 'Page Not Found!',
		menu: { status: false }
	},
];

export default routes;
