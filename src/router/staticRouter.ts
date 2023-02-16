/*
 * @Description: 静态路由文件
 * @Auth: xsl
 * @Date: 2022-10-13 14:50:30
 * @LastEditors: xsl
 * @LastEditTime: 2022-12-30 09:16:32
 */
import Layout from '@/layout/index.vue'
const staticRouter = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  // 用户管理
  {
    path: '/userMgmt',
    component: Layout,
    meta: { title: '用户管理', icon: 'User'},
    children: [
      {
        path: '/user',
        name: 'User',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/userManagement/user/index.vue'),
      },
      {
        path: '/dept',
        name: 'Dept',
        meta: {
          title: '部门管理'
        },
        component: () => import('@/views/userManagement/dept/index.vue'),
      }
    ]
  },
  // 系统管理
  {
    path: '/systemMgmt',
    meta: { title: '系统管理', icon: 'Setting'},
    component: Layout,
    children: [
      {
        path: '/account',
        name: 'Account',
        meta: {
          title: '账户管理'
        },
        component: () => import('@/views/systemManagement/account/index.vue'),
      },
      {
        path: '/role',
        name: 'Role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/views/systemManagement/role/index.vue'),
      },
      {
        path: '/autority',
        name: 'Autority',
        meta: {
          title: '权限管理'
        },
        component: () => import('@/views/systemManagement/autority/index.vue'),
      },
      {
        path: '/operation',
        name: 'Operation',
        meta: {
          title: '日志管理'
        },
        component: () => import('@/views/systemManagement/operation/index.vue'),
      }
    ]
  },
  // 消费管理
  {
    path: '/consumptionMgmt',
    meta: { title: '消费管理', icon: 'ChatSquare'},
    component: Layout,
    children: [
      {
        path: '/machine',
        name: 'Machine',
        meta: {
          title: '消费机管理'
        },
        component: () => import('@/views/consumptionManagement/machine/index.vue'),
      },
      {
        path: '/card',
        name: 'Card',
        meta: {
          title: '消费卡管理'
        },
        component: () => import('@/views/consumptionManagement/card/index.vue'),
      },
      {
        path: '/time',
        name: 'Time',
        meta: {
          title: '消费时段管理'
        },
        component: () => import('@/views/consumptionManagement/time/index.vue'),
      },
      {
        path: '/mode',
        name: 'Mode',
        meta: {
          title: '消费模式管理'
        },
        component: () => import('@/views/consumptionManagement/mode/index.vue'),
      }
    ]
  },
  // 充值管理
  {
    path: '/rechargeMgmt',
    meta: { title: '充值管理', icon: 'Tickets'},
    component: Layout,
    children: [
      {
        path: '/recharge',
        name: 'Recharge',
        meta: {
          title: '充值管理'
        },
        component: () => import('@/views/rechargeManagement/recharge/index.vue'),
      },
      {
        path: '/dimission',
        name: 'Dimission',
        meta: {
          title: '离职结转'
        },
        component: () => import('@/views/rechargeManagement/dimission/index.vue'),
      },
      {
        path: '/strategy',
        name: 'Strategy',
        meta: {
          title: '策略列表'
        },
        component: () => import('@/views/rechargeManagement/strategy/index.vue'),
      },
      {
        path: '/rechargeStrategy',
        name: 'RechargeStrategy',
        meta: {
          title: '充值策略管理'
        },
        component: () => import('@/views/rechargeManagement/rechargeStrategy/index.vue'),
      },
      {
        path: '/carryoverStrategy',
        name: 'CarryoverStrategy',
        meta: {
          title: '结转策略管理'
        },
        component: () => import('@/views/rechargeManagement/carryoverStrategy/index.vue'),
      },
      {
        path: '/clearStrategy',
        name: 'ClearStrategy',
        meta: {
          title: '清零策略管理'
        },
        component: () => import('@/views/rechargeManagement/clearStrategy/index.vue'),
      }
    ]
  },
  // 消费记录管理
  {
    path: '/recordMgmt',
    meta: { title: '消费记录管理', icon: 'Notebook'},
    component: Layout,
    children: [
      {
        path: '/dining',
        name: 'Dining',
        meta: {
          title: '食堂消费记录'
        },
        component: () => import('@/views/consumptionRecordManagement/dining/index.vue'),
      },
      {
        path: '/return',
        name: 'Return',
        meta: {
          title: '消费退补记录'
        },
        component: () => import('@/views/consumptionRecordManagement/return/index.vue'),
      },
      {
        path: '/bill',
        name: 'Bill',
        meta: {
          title: '账单记录'
        },
        component: () => import('@/views/consumptionRecordManagement/bill/index.vue'),
      },
      {
        path: '/exchange',
        name: 'Exchange',
        meta: {
          title: '数据统计'
        },
        component: () => import('@/views/consumptionRecordManagement/exchange/index.vue'),
      },
      {
        path: '/cut',
        name: 'Cut',
        meta: {
          title: '手动扣款记录'
        },
        component: () => import('@/views/consumptionRecordManagement/cutMoeny/index.vue'),
      },
    ]
  },
  // 小超市管理
  {
    path: '/exchangeMgmt',
    meta: { title: '兑换库管理', icon: 'House'},
    component: Layout,
    children: [
      {
        path: '/goods',
        name: 'Goods',
        meta: {
          title: '商品管理'
        },
        component: () => import('@/views/exchangeManagement/goods/index.vue'),
      },
      {
        path: '/incoming',
        name: 'Incoming',
        meta: {
          title: '入库管理'
        },
        component: () => import('@/views/exchangeManagement/incoming/index.vue'),
      },
      {
        path: '/delivery',
        name: 'Delivery',
        meta: {
          title: '退货管理'
        },
        component: () => import('@/views/exchangeManagement/delivery/index.vue'),
      },
      {
        path: '/stock',
        name: 'Stock',
        meta: {
          title: '库存管理'
        },
        component: () => import('@/views/exchangeManagement/stock/index.vue'),
      },
      {
        path: '/profit',
        name: 'Profit',
        meta: {
          title: '数据统计'
        },
        component: () => import('@/views/exchangeManagement/profit/index.vue'),
      },
    ]
  },
  // 通知管理
  {
    path: '/nocticeMgmt',
    meta: { title: '通知管理', icon: 'Bell'},
    component: Layout,
    children: [
      {
        path: '/config',
        name: 'Config',
        meta: {
          title: '通知配置'
        },
        component: () => import('@/views/noticeManagement/config/index.vue'),
      },
      {
        path: '/message',
        name: 'Message',
        meta: {
          title: '短信通知'
        },
        component: () => import('@/views/noticeManagement/message/index.vue'),
      },
      {
        path: '/list',
        name: 'List',
        meta: {
          title: '短信列表'
        },
        component: () => import('@/views/noticeManagement/list/index.vue'),
      }
    ]
  },
  // 收银管理
  {
    path: '/cashierMgmt',
    meta: { title: '收银管理', icon: 'ShoppingTrolley'},
    component: Layout,
    children: [
      {
        path: '/cashier',
        name: 'Cashier',
        meta: {
          title: '开单收银'
        },
        component: () => import('@/views/cashierManagement/index.vue'),
      },
    ]
  },
]
export default staticRouter