import {
  Address,
  Customize,
  ForgetPassword,
  Help,
  Home,
  Login,
  LoginEmail,
  MyOrders,
  OrderDetail,
  OrderStatus,
  Settings,
  Signup,
} from "../screens";
import Cart from "../screens/Cart/Cart";
const ROUTES = [
  {
    path: "/Login",
    component: Login,
    authRequired: false,
    accessRequired: true,
  },
  {
    path: "/Login-email",
    component: LoginEmail,
    authRequired: false,
    accessRequired: true,
  },
  {
    path: "/Forget-password",
    component: ForgetPassword,
    authRequired: false,
    accessRequired: true,
  },
  {
    path: "/Signup",
    component: Signup,
    authRequired: false,
    accessRequired: true,
  },
  {
    path: "/Home",
    component: Home,
    authRequired: false,
    accessRequired: false,
  },
  {
    path: "/OrderDetail",
    component: OrderDetail,
    authRequired: false,
    accessRequired: false,
  },
  {
    path: "/Help",
    component: Help,
    authRequired: false,
    accessRequired: false,
  },
  {
    path: "/Settings",
    component: Settings,
    authRequired: true,
    accessRequired: false,
  },
  {
    path: "/Addresses",
    component: Address,
    authRequired: true,
    accessRequired: false,
  },
  {
    path: "/MyOrders",
    component: MyOrders,
    authRequired: true,
    accessRequired: false,
  },
  {
    path: "/OrderStatus/:id",
    component: OrderStatus,
    authRequired: true,
    accessRequired: false,
  },
  {
    path: "/Customize",
    component: Customize,
    authRequired: true,
    accessRequired: false,
  },
  {
    path: "/Cart",
    component: Cart,
    authRequired: true,
    accessRequired: false,
  },
];

const HEADER_NAV = [
  {
    id: 0,
    name: "Home",
    navigate: "/Home",
  },
  {
    id: 1,
    name: "My Orders",
    navigate: "/MyOrders",
  },
  {
    id: 2,
    name: "My Address",
    navigate: "/Addresses",
  },
  {
    id: 3,
    name: "Help",
    navigate: "/Help",
  },
  {
    id: 4,
    name: "Settings",
    navigate: "/Settings",
  },

];

const HELP_NAV = [
  {
    id: 0,
    name: "Product Page",
    navigate: "https://market.nativebase.io/view/react-native-food-delivery-backend-app",
  },
  {
    id: 1,
    name: "Document",
    navigate: "https://enatega.gitbook.io/enatega-full-app",
  },
  {
    id: 2,
    name: "Blog",
    navigate: "https://blog.nativebase.io/enatega-full-food-delivery-app-is-finally-here-a6039de4a09d",
  },
  {
    id: 3,
    name: "About Us",
    navigate: "https://ninjascode.com/pages/ourteam.html",
  },
];

const ADDRESS_LABEL = [
  {
    title: "Home",
    value: "Home",
  },
  {
    title: "Work",
    value: "Work",
  },
  {
    title: "Other",
    value: "Other",
  },
];

const ACTIVE_ORDERS = ["PENDING", "PICKED", "ACCEPTED"];
const INACTIVE_ORDERS = ["DELIVERED", "COMPLETED"];

export { ROUTES, HEADER_NAV, HELP_NAV, ADDRESS_LABEL, ACTIVE_ORDERS, INACTIVE_ORDERS };