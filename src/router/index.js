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
import Docrecord from '../components/doctor/docrecord' // 咨询记录(1.1.0)


import DoctorDetail from '../components/doctor/doctordetail'  // 医生详情
import Yuyuedoc from '../components/doctor/yuyuedoc'          // 预约医生信息(1.1.0)
import WxpaySucceed from '../components/doctor/wxpaySucceed'  // 预约支付成功(1.1.0)
import DoctorShop from '../components/doctor/doctorshop'  // 医生店铺
import ShopDetail from '../components/doctor/shopdetail'  // 医生店铺商品详情
import Doctororder from '../components/doctor/doctororder'  // 商品下单


const Dingdan = resolve => require(['../components/goods/dingdan'], resolve);   // 商品订单
import AddorderDetail from '../components/goods/goodsdetails/addorderdetail'   // 待支付订单详情
import TakeorderDetail from '../components/goods/goodsdetails/takeorderdetail'   // 待收货订单详情
import SuccessOrder from '../components/goods/goodsdetails/successOrder'   // 已完成 和 已取消 的订单详情

import OerderSite from '../components/site/oerdersite';                // 购买商品选择列表
import SetOrder from '../components/site/setorder';                // 再次购买商品选择列表
const SiteList = resolve => require(['@/components/site/sitelist'],resolve);                 // 地址管理列表
const AddSite  = resolve => require(['@/components/site/addsite'],resolve);                 // 添加地址
const EditSite = resolve => require(['@/components/site/editsite'],resolve);                 // 编辑地址

const RecipeList = r => require.ensure([], () => r(require('@/components/doctor/recipeDetail/recipelist')), 'fang');  //  处方订单列表
const RecipeMsg = r => require.ensure([], () => r(require('@/components/doctor/recipeDetail/recipeMsg')), 'fang');    //  处方信息
const ImgDetails = r => require.ensure([], () => r(require('@/components/doctor/recipeDetail/imgdetails')), 'fang');  //  处方详情

const SearchDoctor = resolve => require(['@/components/doctor/searchdoctor'], resolve);        //  更多医生
const DoctorShopList = resolve => require(['@/components/doctor/doctorshoplist'], resolve);     // 更多医生店铺
import Error404 from '../components/Errors/err404';


// 预约门诊记录(1.1.0)
const Subscribe = r => require.ensure([], () => r(require('../components/Subscribe/subscribe.vue')), 'Subscribe'); 
const CancelSubscribe = r => require.ensure([], () => r(require('../components/Subscribe/cancelSubscribe.vue')), 'Subscribe');  // 取消预约
const SubscribeDetail = r => require.ensure([], () => r(require('../components/Subscribe/subscribeDetail.vue')), 'Subscribe');  // 预约记录详情

// 成员管理(1.1.0)
const Administration = r => require.ensure([], () => r(require('../components/Administration/administration.vue')), 'administration');
const GetAdministration = r => require.ensure([], () => r(require('../components/Administration/getAdministration.vue')), 'administration');  // 选择成员列表
const Addmember = r => require.ensure([], () => r(require('../components/Administration/addmember.vue')), 'administration');     // 添加成员
const Editmember = r => require.ensure([], () => r(require('../components/Administration/editmember.vue')), 'administration');   // 编辑成员信息


// 从微信公众号信息进行跳转进来的页面
const Consultdoctor = resolve => require(['../components/wxView/consultdoctor'], resolve);  // 咨询页 医生详情的工作室
const Activity = resolve => require(['../components/wxView/activity'], resolve);            // 图片活动展示
const Docrecommend = resolve => require(['@/components/wxView/docrecommend'],resolve);      // 推荐预约医生(1.1.0)
const DocSuspend = resolve => require(['@/components/wxView/docSuspend'],resolve);          // 医生停诊通知(1.1.0)

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
      },
      component: Mydoctor
    },
    {
      path: '/mydoctor/docrecord:id?',
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
      path: '/wxpaySucceed:id?', 
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
      path: '/addorderdetail/:id',  // 待付款详情
      meta: {
        title: '订单详情',
      },
      name: 'addorderdetail',
      component: AddorderDetail
    },
    {
      path: '/takeorderdetail/:id', // 再次购买页
      meta: {
        title: '下单详情',
      },
      name: 'takeorderdetail',
      component: TakeorderDetail
    },
    {
      path: '/successOrder:id?',  // 取消和已完成 和  待收货详情 和 待发货
      meta: {
        title: '订单详情',
      },
      name: 'successOrder',
      component: SuccessOrder
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
      meta: { title: '收货地址管理'},
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
      meta: {title: '处方订单列表'},
      component: RecipeList
    },
    {
      path: '/recipeMsg/:id',
      meta: {title: '处方信息'},
      name: 'recipeMsg',
      component: RecipeMsg
    },
    {
      path: '/chufdetails:id?',
      meta: {title: '处方详情'},
      name: 'chufdetails',
      component: ImgDetails
    },

    // 预约门诊记录
    {
      path: '/subscribe',          // 列表
      meta: {title: '预约记录', keeepAlive: true },
      name: 'subscribe',
      component: Subscribe
    },
    {
      path: '/subscribe/cancelSubscribe:did?',   // 取消预约
      meta: {title: '取消预约'},
      name: 'cancelSubscribe',
      component: CancelSubscribe
    },
    {
      path: '/subscribe/subscribeDetail:id?', // 预约详情
      meta: {title: '预约信息'},
      name: 'subscribeDetail',
      component: SubscribeDetail
    },
    


    // 就诊成员管理
    {
      path: '/administration',
      meta: {title: '就诊成员管理'},
      name: 'administration',
      component: Administration
    },
    {
      path: '/getAdministration',
      meta: {title: '就诊成员列表'},
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
      path: '/wxView/docrecommend:id?',          //  医生推荐的预约
      meta: {title: '预约医生', },  
      name: 'docrecommend',
      component: Docrecommend
    },
    {
      path: '/wxView/docSuspend:id?',           //  医生停诊通知
      meta: {title: '停诊通知', },  
      name: 'docSuspend',
      component: DocSuspend
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