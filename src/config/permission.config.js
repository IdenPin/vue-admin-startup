import router from '../router'
import store from '../store'
import NProgress from 'nprogress'
import Config from '@/config'
import 'nprogress/nprogress.css'
import { setDocumentTitle } from '@/utils/tools'

/**
 * NProgress 配置
 */

NProgress.configure(Config.project.nProgress)

/**
 * 解决 动态路由或角色 刷新 component 丢失问题
 */
const { IS_DYNAMIC_ROUTES, PERMISSION_TREE } = Config.router
if (store.getters['user/token'] && IS_DYNAMIC_ROUTES) {
  PERMISSION_TREE ? store.dispatch('user/createRoutesByTree') : store.dispatch('user/createRoutesByRoles')
}

/**
 * 全局前置守卫，路由拦截
 */

router.beforeEach((to, from, next) => {
  NProgress.start()

  const token = store.getters['user/token']
  const toPath = to.path

  /**
   * 设置网站不同页面 title
   */

  setDocumentTitle(to.meta && to.meta.title)

  /**
   * 路由拦截判断
   */

  if (!token) {
    /**
     * token 不存在且访问的地址不在白名单里面
     */
    if (Config.router.whiteListPath.indexOf(toPath) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  } else {
    /**
     * 如果 token 存在又访问登录界面，则重定向到首页
     */

    if (toPath === '/login') {
      next('/')
      NProgress.done()
    } else {
      next()
    }
  }
})

/**
 * 全局后置守卫
 */

router.afterEach((to, from, next) => {
  NProgress.done()
})
