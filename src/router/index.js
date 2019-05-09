import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index'
const Activity = resolve => require(['@/components/user/activity'], resolve);     // 图片活动展示
const Agreement = resolve => require(['@/components/user/agreement'], resolve);      // 协议
const Login = resolve => require(['@/components/user/phonelogin'], resolve);      // 绑定手机号
const Authentication = resolve => require(['@/components/user/authentication'], resolve);  // 添加问诊人信息
const UserMsg = resolve => require(['@/components/user/usermsg'], resolve);  // 认证提示

const Personal = resolve => require(['@/components/user/personal'], resolve);  // 个人中心
const Userdata = resolve => require(['@/components/user/userdata'], resolve);  // 个人中心,点击头像进入的
const HealthData = resolve => require(['@/components/user/healthdata'], resolve);  // 健康数据
const AuthenticationYes = resolve => require(['@/components/user/authenticationYes'], resolve);  // 问诊信息确认

import Finddoctor from '@/components/doctor/finddoctor'  // 我的医生
import DoctorDetail from '@/components/doctor/doctordetail'  // 医生详情
import DoctorShop from '@/components/doctor/doctorshop'  // 医生店铺
import ShopDetail from '@/components/doctor/shopdetail'  // 医生店铺商品详情
import Doctororder from '@/components/doctor/doctororder'  // 商品下单

const Consultdoctor = resolve => require(['@/components/doctor/consultdoctor'], resolve);  // 咨询页 医生详情的工作室

const Dingdan = resolve => require(['@/components/goods/dingdan'], resolve);   // 商品订单
import AddorderDetail from '@/components/goods/goodsdetails/addorderdetail'   // 待支付订单详情
import TakeorderDetail from '@/components/goods/goodsdetails/takeorderdetail'   // 待收货订单详情
import SuccessOrder from '@/components/goods/goodsdetails/successOrder'   // 已完成 和 已取消 的订单详情

import OerderSite from '@/components/site/oerdersite';                // 购买商品选择列表
import SetOrder from '@/components/site/setorder';                // 再次购买商品选择列表
const SiteList = resolve => require(['@/components/site/sitelist'],resolve);                 // 地址管理列表
const AddSite  = resolve => require(['@/components/site/addsite'],resolve);                 // 添加地址
const EditSite = resolve => require(['@/components/site/editsite'],resolve);                 // 编辑地址

const RecipeList = r => require.ensure([], () => r(require('@/components/doctor/recipelist')), 'fang');        //  处方订单
const RecipeMsg = r => require.ensure([], () => r(require('@/components/doctor/recipeDetail/recipeMsg')), 'fang');  // 处方信息
const ImgDetails = r => require.ensure([], () => r(require('@/components/doctor/recipeDetail/imgdetails')), 'fang');  // 处方详情

const SearchDoctor = resolve => require(['@/components/doctor/searchdoctor'], resolve);        //  更多医生
const DoctorShopList = resolve => require(['@/components/doctor/doctorshoplist'], resolve);     // 更多医生店铺
const Error404 = resolve => require(['@/components/Errors/err404'], resolve);

Vue.use(Router) 

const router = new Router({
  mode: 'history',
  // base: 'wechat',
  routes: [
    // {
    //   path: '/',
    //   title: '云医康在线',
    //   component: Index
    // },
    {
      path:'/agreement',
      title: '用户协议',
      component: Agreement
    },
    {
      path:'/err404',
      title: '错误页面',
      component: Error404
    },
    {
      path:'/phone:id?',
      title: '绑定手机号',
      component: Login
    },
    {
      path: '/authentication',
      title: '添加问诊人信息',
      component: Authentication
    },
    {
      path: '/usermsg',
      title: '认证成功',
      component: UserMsg
    },
    {
      path: '/activity',
      title: '活动展示',
      component: Activity
    },
    {
      path: '/personal:id?',
      title: '个人中心',
      component: Personal
    },
    {
      path: '/userdata',
      title: '个人信息',
      component: Userdata
    },
    {
      path: '/finddoctor',
      title: '我的医生',
      component: Finddoctor
    },
    {
      path: '/doctordetail/:id',
      title: '医生详情',
      name: 'doctordetail',
      component: DoctorDetail
    },
    {
      path: '/doctorshop/:id',
      title: '医生店铺',
      name: 'doctorshop',
      component: DoctorShop
    },
    {
      path: '/shopdetail:id?',
      title: '商品详情',
      name: 'shopdetail',
      component: ShopDetail
    },
    {
      path: '/doctororder/:id',
      title: '商品下单',
      name: 'doctororder',
      component: Doctororder
    },
    {
      path: '/authenticationYes',
      title: '问诊信息确认',
      component: AuthenticationYes
    },
    {
      path: '/healthdata',
      title: '健康数据',
      component: HealthData
    },
    {
      path: '/searchdoctor:id?',
      title: '更多医生',
      name: 'searchdoctor',
      component: SearchDoctor
    },
    {
      path: '/doctorshoplist:id?',
      title: '更多医生店铺',
      component: DoctorShopList
    },
    {
      path: '/consultdoctor:id?',
      title: '咨询医生详情',
      name: 'consultdoctor',
      component: Consultdoctor
    },

                                  // 以下为订单
    
    {
      path: '/dingdan',
      title: '商品订单',
      meta: { keeepAlive: true },
      component: Dingdan
    },
    {
      path: '/addorderdetail/:id',  // 待付款详情
      title: '订单详情',
      name: 'addorderdetail',
      component: AddorderDetail
    },
    {
      path: '/takeorderdetail/:id', // 再次购买页
      title: '下单',
      name: 'takeorderdetail',
      component: TakeorderDetail
    },
    {
      path: '/successOrder/:id',  // 取消和已完成 和  待收货详情
      title: '订单详情',
      name: 'successOrder',
      component: SuccessOrder
    },
    
    
                                        //  收货地址管理
    {
      path: '/oerdersites:id?',
      title: '选择收货地址1',
      name: 'oerdersites',
      component: OerderSite
    },
    {
      path: '/setorder:id?',
      title: '选择收货地址2',
      name: 'setorder',
      component: SetOrder
    },
    {
      path: '/sitelist',
      title: '收货地址管理',
      component: SiteList
    },
    {
      path: '/addsite/:id?',
      title: '新增收货地址',
      component: AddSite
    },
    {
      path: '/editsite:id?',
      title: '编辑收货地址',
      component: EditSite
    },
                                      // 处方订单
    {
      path: '/recipelist',
      title: '处方订单',
      component: RecipeList
    },
    {
      path: '/recipeMsg/:id',
      title: '处方信息',
      name: 'recipeMsg',
      component: RecipeMsg
    },
    {
      path: '/chufdetails:id?',
      title: '处方详情',
      name: 'chufdetails',
      component: ImgDetails
    },
    
  ]
})


// router.onError((error) => {
//   console.log(error)
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if(isChunkLoadFailed){
//       router.replace(targetPath);
//   }
// })

export default router