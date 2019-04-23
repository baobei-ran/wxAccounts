import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index'
const Activity = resolve => require(['@/components/user/activity'], resolve);     // 图片活动展示
const Agreement = resolve => require(['@/components/user/agreement'], resolve);      // 协议
const Login = resolve => require(['@/components/user/phonelogin'], resolve);      // 绑定手机号
const Authentication = resolve => require(['@/components/user/authentication'], resolve);  // 添加问诊人信息

const Personal = resolve => require(['@/components/user/personal'], resolve);  // 个人中心
import Userdata from '@/components/user/userdata'  // 个人中心,点击头像进入的
import HealthData from '@/components/user/healthdata'  // 健康数据

import AuthenticationYes from '@/components/user/authenticationYes'  // 问诊信息确认
import RecipeMsg from '@/components/doctor/recipeDetail/recipeMsg'  // 处方信息
import ImgDetails from '@/components/doctor/recipeDetail/imgDetails'  // 处方详情
import Finddoctor from '@/components/doctor/finddoctor'  // 我的医生
import DoctorDetail from '@/components/doctor/doctordetail'  // 医生详情
import DoctorShop from '@/components/doctor/doctorshop'  // 医生店铺
import ShopDetail from '@/components/doctor/shopdetail'  // 医生店铺商品详情
import Doctororder from '@/components/doctor/doctororder'  // 商品下单

import Consultdoctor from '@/components/doctor/consultdoctor'  // 咨询页 医生详情的工作室

const Dingdan = resolve => require(['@/components/goods/dingdan'], resolve);   // 商品订单
import AddorderDetail from '@/components/goods/goodsdetails/addorderdetail'   // 待支付订单详情
import TakeorderDetail from '@/components/goods/goodsdetails/takeorderdetail'   // 待收货订单详情
import SuccessOrder from '@/components/goods/goodsdetails/successOrder'   // 已完成 和 已取消 的订单详情

import OerderSite from '@/components/site/oerdersite';                // 购买商品选择列表
import SetOrder from '@/components/site/setorder';                // 再次购买商品选择列表
const SiteList = resolve => require(['@/components/site/sitelist'],resolve);                 // 地址管理列表
const AddSite  = resolve => require(['@/components/site/addsite'],resolve);                 // 添加地址
const EditSite = resolve => require(['@/components/site/editsite'],resolve);                 // 编辑地址

import RecipeList from '@/components/doctor/recipelist'        //  处方订单
import SearchDoctor from '@/components/doctor/searchdoctor'        //  更多医生
import DoctorShopList from '@/components/doctor/doctorshoplist'     // 更多医生店铺


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
      path: '/imgdetails/:id',
      title: '处方详情',
      name: 'imgdetails',
      component: ImgDetails
    },
    
  ]
})


router.onError((error) => {
  console.log(error)
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if(isChunkLoadFailed){
      router.replace(targetPath);
  }
})

export default router