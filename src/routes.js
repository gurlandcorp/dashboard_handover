// ........For Seller
import AllProperties from "layouts/allproperties";
import AddProperty from "layouts/addproperty";
import SellerBilling from "layouts/billing";
import DetailPage from "layouts/detailPropertyPage";

// ........For Buyer
import MyBidding from "layouts/myBiddings";
import BuyedProperties from "layouts/buyedProperties";
import BuyerBilling from "layouts/BuyerBilling";
import PropertyBid from "layouts/BidProperty";

//.....................................................
// ........For Admin
//.....................................................

// Soft UI Dashboard React layouts
// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";

// import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import UserProfile from "layouts/userprofile";
import AllUsers from "layouts/allusers";
import AllMessages from "layouts/allmessages";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
// import Shop from "examples/Icons/Shop";
// import Office from "examples/Icons/Office";
// import Settings from "examples/Icons/Settings";
// import Document from "examples/Icons/Document";
// import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
// import Cube from "examples/Icons/Cube";
// For Site Routes................
// import Home from "layouts/site/home";
// import Home2 from "layouts/site/components/Socials";

var userType = JSON.parse(localStorage.getItem("userData"))?.userType;
var isAdmin = localStorage.getItem("adminAuth");

var routes = [
	{
		type: isAdmin == null ? "collapse" : "",
		name: userType === "Buyer" ? "My Biddings" : "Properties",
		key: userType === "Buyer" ? "myBiddings" : "myProperties",
		route: userType === "Buyer" ? "/myBiddings" : "/properties",
		icon: <CustomerSupport size="12px" />,
		component: userType === "Buyer" ? MyBidding : AllProperties,
		noCollapse: true,
	},
	{
		type: isAdmin == null ? "collapse" : "",
		name: userType === "Buyer" ? "Buy Properties" : "Add Property",
		key: userType === "Buyer" ? "Buy Properties" : "addProperty",
		route: userType === "Buyer" ? "/buyProperty" : "/property/add",
		icon: <CustomerSupport size="12px" />,
		component: userType === "Buyer" ? BuyedProperties : AddProperty,
		noCollapse: true,
	},
	{
		type: isAdmin == null ? "collapse" : "",
		name: "Billing",
		key: "billing",
		route: "/billing",
		icon: <CreditCard size="12px" />,
		component: userType === "Buyer" ? BuyerBilling : SellerBilling,
		noCollapse: true,
	},
	// {
	// 	type: "collapse",
	// 	name: "My Properties",
	// 	key: "myProperties",
	// 	route: "/allproperties",
	// 	icon: <CustomerSupport size="12px" />,
	// 	component: AllProperties,
	// 	noCollapse: true,
	// },
	// {
	// 	type: "collapse",
	// 	name: "Add Property",
	// 	key: "addProperty",
	// 	route: "/editproperty",
	// 	icon: <CustomerSupport size="12px" />,
	// 	component: AddProperty,
	// 	noCollapse: true,
	// },
	// {
	// 	type: "collapse",
	// 	name: "Billing",
	// 	key: "billing",
	// 	route: "/billing",
	// 	icon: <CreditCard size="12px" />,
	// 	component: SellerBilling,
	// 	noCollapse: true,
	// },
	{
		type: isAdmin == null ? "collapse" : "",
		name: "Profile",
		key: "Profile Settings",
		route: "/profile",
		icon: <CustomerSupport size="12px" />,
		component: Profile,
		noCollapse: true,
	},
	{
		// type: "collapse",
		// name: "detailpage",
		// key: "detailpage",
		route: "/detailpage",
		// icon: <CustomerSupport size="12px" />,
		component: DetailPage,
		// noCollapse: true,
	},
	{
		// type: "collapse",
		// name: "User Profile",
		// key: "userProfile",
		route: "/userprofile",
		// icon: <CustomerSupport size="12px" />,
		component: UserProfile,
		// noCollapse: true,
	},

	{
		// type: "collapse",
		// name: "Sign In",
		// key: "sign-in",
		route: "/authentication/sign-in",
		// icon: <Document size="12px" />,
		component: SignIn,
		// noCollapse: true,
	},
	{
		// type: "collapse",
		// name: "Sign Up",
		// key: "sign-up",
		route: "/authentication/sign-up",
		// icon: <SpaceShip size="12px" />,
		component: SignUp,
		// noCollapse: true,
	},
	{
		// type: "collapse",
		// name: "All Users",
		// key: "table",
		route: "/allusers",
		// icon: <CustomerSupport size="12px" />,
		component: AllUsers,
		// noCollapse: true,
	},
	//Admin Routes....................................................................
	{
		type: isAdmin == null ? "" : "collapse",
		name: "All Properties",
		key: "all Properties",
		route: "/admin/allproperties",
		icon: <CustomerSupport size="12px" />,
		component: AllProperties,
		noCollapse: true,
	},
	{
		type: isAdmin == null ? "" : "collapse",
		name: "All Users",
		key: "table",
		route: "/admin/allusers",
		icon: <CustomerSupport size="12px" />,
		component: AllUsers,
		noCollapse: true,
	},
	{
		type: isAdmin == null ? "" : "collapse",
		name: "All Messages",
		key: "messages",
		route: "/admin/allmessages",
		icon: <CustomerSupport size="12px" />,
		component: AllMessages,
		noCollapse: true,
	},
	{
		type: isAdmin == null ? "" : "collapse",
		name: "Bid a property",
		key: "bid",
		route: '/property/bid/:id',
		icon: <CustomerSupport size="12px" />,
		component: PropertyBid,
		noCollapse: true
	}
];
export default routes;
