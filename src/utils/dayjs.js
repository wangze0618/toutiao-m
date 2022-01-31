import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 全局使用
dayjs.locale('zh-cn')

// 引入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)


Vue.filter('relativeTime', value => {
    // dayjs() 获取最新时间
    return dayjs().to(dayjs(value))
})






