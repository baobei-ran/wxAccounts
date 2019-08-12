import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index'
const Phones = r => require.ensure([], () => r(require('../components/user/phonelogin')), 'ph');      // 绑定手机号
const Authentication = r => require.ensure([], () => r(require('../components/user/authentication')), 'ph');  // 添加问诊人信息
const UserMsg = r => require.ensure([], () => r(require('../components/user/usermsg')), 'ph');  // 认证提示
const Agreement = r => require.ensure([], () => r(require('../components/user/agreement')), 'ph');      // 协议


const Personal = resolve => require(['../components/user/personal'], resolve);  // 个人中心
const Userdata = resolve => require(['../components/user/userdata'], resolve);  // 个人中心,点击头像进入的
const HealthData = resolve => require(['../components/user/healthdata'], resolve);  // 健康数据
const AuthenticationYes = resolve => require(['../components/user/authenticationYes'], resolve);  // 问诊信息确认

// import Finddoctor from '../components/doctor/finddoctor'  // (旧)我的医生

import Mydoctor from '../components/doctor/mydoctor'  // 我的医生(1.1.0)
const Docrecord = r => require.ensure([], () => r(require('../components/doctor/docrecord')), 'amr') // 咨询记录(1.1.0)
// 10

import DoctorDetail from '../components/doctor/doctordetail'  // 医生详情
import Yuyuedoc from '../components/doctor/yuyuedoc'          // 预约医生信息(1.1.0)
import WxpaySucceed from '../components/doctor/wxpaySucceed'  // 预约支付成功(1.1.0)
import DoctorShop from '../components/doctor/doctorshop'  // 医生店铺
import ShopDetail from '../components/doctor/shopdetail'  // 医生店铺商品详情
import Doctororder from '../components/doctor/doctororder'  // 商品下单


const Dingdan = resolve => require(['../components/goods/orderList'], resolve);   // 商品订单（1.2）
import Orderdetails from "../components/goods/orderdetails";                      // 订单信息（1.2）

// const Dingdan = resolve => require(['../components/goods/dingdan'], resolve);   // 商品订单
import AddorderDetail from '../components/goods/goodsdetails/addorderdetail'   // 待支付订单详情
import TakeorderDetail from '../components/goods/goodsdetails/orderbuyagain'   // 再次购买
import SuccessOrder from '../components/goods/goodsdetails/successOrder'   // 已完成 和 已取消 的订单详情
// 21

import OerderSite from '../components/site/oerdersite';                // 购买商品选择列表
import SetOrder from '../components/site/setorder';                // 再次购买商品选择列表
const SiteList = resolve => require(['@/components/site/sitelist'],resolve);                 // 地址管理列表
const AddSite  = resolve => require(['@/components/site/addsite'],resolve);                 // 添加地址
const EditSite = resolve => require(['@/components/site/editsite'],resolve);                 // 编辑地址

const RecipeList = r => require.ensure([], () => r(require('@/components/recipes/recipelist')), 'fang');  //  处方订单列表
const RecipeMsg = r => require.ensure([], () => r(require('@/components/recipes/recipeMsg')), 'fang');    //  处方信息
const ImgDetails = r => require.ensure([], () => r(require('@/components/recipes/imgdetails2')), 'fang');  //  处方详情


import RecipeAudit from '@/components/recipes/recipeAudit';       // 电子处方 药品药师审核页(1.2)
import Recipeorder from '@/components/recipes/recipeorder';       // 电子处方 药品下单（1.2）
import Drugpaysuccess from '@/components/recipes/drugpaysuccess'; // 电子处方 下单支付成功提示页（1.2）
import Recipedrug from '../components/recipes/recipedrug.vue';    // 药店订单处方信息（1.2）
import Drugdetail from '../components/recipes/drugdetail.vue';    // 处方药品的药品详情 （1.2.0）
// 34
const SearchDoctor = resolve => require(['@/components/doctor/searchdoctor'], resolve);        //  更多医生
const DoctorShopList = resolve => require(['@/components/doctor/doctorshoplist'], resolve);     // 更多医生店铺
import Error404 from '../components/errors/err404';


// 预约门诊记录(1.1.0)
import Subscribe from '../components/Subscribe/subscribe.vue'; 
import CancelSubscribe from '../components/Subscribe/cancelSubscribe.vue';  // 取消预约
import SubscribeDetail from '../components/Subscribe/subscribeDetail.vue';  // 预约记录详情
import PayDetails from '../components/Subscribe/payDetails.vue';            // 待支付预约记录详情

// 成员管理(1.1.0)
const Administration = r => require.ensure([], () => r(require('../components/Administration/administration.vue')), 'administration');
const GetAdministration = r => require.ensure([], () => r(require('../components/Administration/getAdministration.vue')), 'administration');  // 选择成员列表
const Addmember = r => require.ensure([], () => r(require('../components/Administration/addmember.vue')), 'administration');     // 添加成员
const Editmember = r => require.ensure([], () => r(require('../components/Administration/editmember.vue')), 'administration');   // 编辑成员信息
// 45

// 从微信公众号信息进行跳转进来的页面
const Consultdoctor = r => require.ensure([], () => r(require('../components/wxView/consultdoctor')), 'amr');  // 咨询页 医生详情的工作室
const Activity = resolve => require(['../components/wxView/activity'], resolve);            // 图片活动展示
import Docrecommend from '@/components/wxView/docrecommend';                                // 推荐预约医生(1.1.0)
import DocSuspend from '@/components/wxView/docSuspend';                                    // 医生停诊通知(1.1.0)
import RecommendDrug from '@/components/wxView/recommendDrug';                              // 推荐药品 （1.2.0）
import YaoRecipeorder from '@/components/goods/yao-recipeorder';                            // 推荐药品 药品下单页（1.2）

// 电子病历
import Emrecordlist from '../components/emrecord/emrecordlist.vue';   // 电子病历列表 (1.3)
import Emrecorddetail from '../components/emrecord/emrecorddetail.vue'; // 患者 电子病历详情 (1.3)
import Emrdetails from '../components/emrecord/emrdetail2.vue';         // 医生 电子病历详情 (1.3)
import AddrecordsUserinfo from '../components/emrecord/addrecordsFile/addrecordsUserinfo.vue'; // 添加电子病历 (1.3)
import AddrecordsUserClinic from '../components/emrecord/addrecordsFile/addrecordsUserClinic.vue'; // 添加电子病历2 (1.3)
// 56

Vue.use(Router) 

const router = new Router({
  mode: 'history',
  base: 'wechat',
  routes: [
    // {
    //   path: '/',
    //   title: '云医康在线',
    //   component: Index
    // },
    {
      path: '/activity',
      title: '图片',
      meta: { 
        keeepAlive: true,
      },
      component: Activity
    },
    {
      path:'/agreement',
      meta: {
        keeepAlive: true,
        title: '用户协议'
      },
      component: Agreement
    },
    {
      path:'/err404',
      meta: {
        title: '错误',
      },
      component: Error404
    },
    {
      path:'/phone:id?',
      meta: {
        title: '绑定手机号',
      },
      component: Phones
    },
    {
      path: '/authentication',
      meta: {
        title: '添加问诊人信息',
      },
      component: Authentication
    },
    {
      path: '/usermsg',
      meta: {
        title: '认证成功',
      },
      component: UserMsg
    },
    
    {
      path: '/personal:id?',
      meta: { title: '个人中心',keeepAlive: true },
      component: Personal
    },
    {
      path: '/userdata',
      meta: { 
        title: '个人信息',
        keeepAlive: true 
      },
      component: Userdata
    },
    {
      path: '/mydoctor',
      meta: {
        title: '我的医生',
        keeepAlive: true
      },
      component: Mydoctor
    },
    {
      path: '/docrecord:id?',  // 聊天记录
      meta: {
        title: '咨询记录',
      },
      name: 'docrecord',
      component: Docrecord
    },
    


    {
      path: '/doctordetail/:id',
      title: '医生详情',
      name: 'doctordetail',
      component: DoctorDetail
    },
    {
      path: '/yuyuedoc:id?',          // 预约医生和支付
      meta: {title: '预约医生信息', },
      name: 'yuyuedoc',
      component: Yuyuedoc
    },
    {
      path: '/wxpaySucceed:rid?', 
      meta: { title: '支付成功' },   // 预约医生支付成功页
      name: 'wxpaySucceed',
      component: WxpaySucceed
    },
    {
      path: '/doctorshop/:id',
      title: '医生店铺',
      name: 'doctorshop',
      component: DoctorShop
    },
    {
      path: '/shopdetail:id?',
      meta: {
        title: '商品详情',
      },
      name: 'shopdetail',
      component: ShopDetail
    },
    {
      path: '/doctororder:id?',
      meta: {
        title: '商品下单',
      },
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
      name: 'searchdoctor',
      meta: { 
        title: '更多医生',
        keeepAlive: true,
        x:0, y:0
      },
      component: SearchDoctor
    },
    {
      path: '/doctorshoplist:id?',
      meta: { title: '更多医生店铺', keeepAlive: true, x:0, y:0},
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
      meta: { title: '商品订单', keeepAlive: true },
      component: Dingdan
    },
    {
      path: '/addorderdetail/:id',  // 医生店铺的待付款详情
      meta: {
        title: '订单详情',
      },
      name: 'addorderdetail',
      component: AddorderDetail
    },
    {
      path: '/takeorderdetail/:id', // 医生店铺的再次购买页
      meta: {
        title: '下单详情',
      },
      name: 'orderbuyagain',
      component: TakeorderDetail
    },
    {
      path: '/successOrder:id?',  // 医生店铺的取消和已完成 和  待收货详情 和 待发货
      meta: {
        title: '订单详情',
      },
      name: 'successOrder',
      component: SuccessOrder
    },
    {
      path: '/orderdetails:id?',  // 药店购买的药品详情
      meta: {
        title: '查看订单',
      },
      name: 'orderdetails',
      component: Orderdetails
    },
    
                                        //  收货地址管理
    {
      path: '/oerdersites:id?',     // id 下单选择地址
      name: 'oerdersites',
      meta: { title: '收货地址列表', keeepAlive: true },
      component: OerderSite
    },
    {
      path: '/setorder:id?',    // 订单号选择地址
      meta: {
        title: '收货地址列表',
      },
      name: 'setorder',
      component: SetOrder
    },
    {
      path: '/sitelist',
      meta: { title: '收货地址管理', keeepAlive: true},
      component: SiteList
    },
    {
      path: '/addsite/:id?',
      meta: {title: '新增收货地址'},
      component: AddSite
    },
    {
      path: '/editsite:id?',
      meta: {title: '编辑收货地址'},
      component: EditSite
    },
                                      // 处方订单
    {
      path: '/recipelist',
      meta: {title: '处方订单列表', keeepAlive: true, x:0, y:0},
      component: RecipeList
    },
    {
      path: '/recipeMsg/:id',
      meta: {title: '处方信息'},
      name: 'recipeMsg',
      component: RecipeMsg
    },
    {
      path: '/recipedrug:id?',
      meta: {title: '处方信息'},
      name: 'recipedrug',
      component: Recipedrug
    },
    {
      path: '/chufdetails:id?',
      meta: {title: '处方详情'},
      name: 'chufdetails',
      component: ImgDetails
    },
    {
      path: '/recipeAudit:id?',
      meta: {title: '电子处方'},
      name: 'recipeAudit',
      component: RecipeAudit 
    },
    {
      path: '/recipeorder:id?',
      meta: {title: '确认订单', keeepAlive: true},
      name: 'recipeorder',
      component: Recipeorder
    },
    {
      path: '/drugpaysuccess:id?', // 支付成功页
      meta: {title: '查看订单'},
      name: 'drugpaysuccess',
      component: Drugpaysuccess
    },
    {
      path: '/drugdetail:id?',           // 处方药品 的药品详情
      meta: {title: '药品详情', },  
      name: 'drugdetail',
      component: Drugdetail
    },

    // 预约门诊记录
    {
      path: '/subscribe',          // 列表
      meta: {title: '预约记录', keeepAlive: true,  x:0, y:0 },
      name: 'subscribe',
      component: Subscribe
    },
    {
      path: '/cancelSubscribe:rid?',   // 取消预约
      meta: {title: '取消预约'},
      name: 'cancelSubscribe',
      component: CancelSubscribe
    },
    {
      path: '/subscribeDetail:rid?', // 预约详情
      meta: {title: '预约信息'},
      name: 'subscribeDetail',
      component: SubscribeDetail
    },
    {
      path: '/payDetails:rid?', // 预约详情
      meta: {title: '预约信息'},
      name: 'payDetails',
      component: PayDetails
    },
    


    // 就诊成员管理
    {
      path: '/administration',
      meta: {title: '就诊成员管理', keeepAlive: true},
      name: 'administration',
      component: Administration
    },
    {
      path: '/getAdministration',
      meta: {title: '就诊成员列表', keeepAlive: true},
      name: 'getAdministration',
      component: GetAdministration
    },
    {
      path: '/administration/addmember',
      meta: {title: '添加新成员'},
      name: 'addmember',
      component: Addmember
    },
    {
      path: '/administration/editmember',
      meta: {title: '修改成员信息'},
      name: 'editmember',
      component: Editmember
    },



    {
      path: '/docrecommend:id?',          //  医生推荐的预约
      meta: {title: '预约医生', },  
      name: 'docrecommend',
      component: Docrecommend
    },
    {
      path: '/docSuspend:id?',           //  医生停诊通知
      meta: {title: '停诊通知', },  
      name: 'docSuspend',
      component: DocSuspend
    },
    {
      path: '/recommendDrug:id?',           // 推荐药品
      meta: {title: '推荐药品', },  
      name: 'recommendDrug',
      component: RecommendDrug
    },
    {
      path: '/yaorecipeorder:id?',         // 药品推荐 下单页
      meta: {title: '确认订单'},
      name: 'yaorecipeorder',
      component: YaoRecipeorder
    },

      // 电子病历列表
    {
      path: '/emrecordlist',         // 电子病历列表
      meta: {title: '电子病历', keeepAlive: true},
      name: 'emrecordlist',
      component: Emrecordlist
    },
    {
      path: '/emrecorddetail:id?',         // 患者自己添加的电子病历详情
      meta: {title: '病历详情'},
      name: 'emrecorddetail',
      component: Emrecorddetail
    },
    {
      path: '/emrdetails:id?',         // 医生添加的电子病历详情
      meta: {title: '病历详情'},
      name: 'emrdetails',
      component: Emrdetails
    },
    {
      path: '/addrecordsUserinfo:id?',         // 添加电子病历
      meta: {title: '添加病历'},
      name: 'addrecordsUserinfo',
      component: AddrecordsUserinfo
    },
    {
      path: '/addrecordsUserClinic:id?',         // 添加电子病历
      meta: {title: '添加病历'},
      name: 'addrecordsUserClinic',
      component: AddrecordsUserClinic
    },
    
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   console.log(to, from, savedPosition)
  //   if (savedPosition) {
  //     console.log('go')
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       console.log(document.body.scrollTop)
  //       from.meta.savedPosition = document.body.scrollTop
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // }
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

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    window.document.title = to.meta.title
  }
  next()
  
})

export default router