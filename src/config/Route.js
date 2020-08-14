/*public components*/
import Login from 'page/login'
import ForgotPassword from 'page/forgot-password'

/*private components*/
import Home from 'page/home'
import SettlementRevenue from 'page/settlement/Revenue'
import ProductRegistration from 'page/productRegistration'
import Order from 'page/order';
import Product from 'page/product';
import Tracking from 'page/tracking';
import OrderDetail from 'page/order/Detail';

const publicRoute = [
    {exact: true,path: '/login',name: 'Login',component: Login},
    {exact: true,path: '/forgot-password',name: 'Forgot Password',component: ForgotPassword},
]

const privateRoute = [
    {exact: true,path: '/',name: 'Home',component: Home},
    {exact: true,path: '/settlement/revenue',name: 'Settlement Revenue',component: SettlementRevenue},
    {exact: true,path: '/productRegistration',name: 'Product Registration',component: ProductRegistration},
    // { exact: true, path: '/settlement/balance/pencairan-saldo', name: 'Settlement Balance', component: SettlementPencairanSaldo },
    // { exact: true, path: '/settlement/balance/verifikasi-pencairan-saldo', name: 'Settlement Balance', component: SettlementVerifikasiPencairanSaldo },
    // { exact: true, path: '/settlement/balance/success', name: 'Settlement Balance', component: SettlementPencairanSaldoSuccess},
    {exact: true,path: '/product/:slug',name: 'Displayed',component: Product},
    {exact: true,path: '/order/detail/:deliveryId',name: 'Order Detail',component: OrderDetail},
    {exact: true,path: '/order/:slug',name: 'Order Status',component: Order},
    {exact: true,path: '/order/:slug/tracking/:courier/:trackingId',name: 'Lacak Pengiriman',component: Tracking}
]

const routes = {'public': publicRoute,'private': privateRoute}

export default routes