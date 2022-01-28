/*
    封装 本地存储 操作方法
*/

// 存储
export const setItem = (key, value) => {
    value = JSON.stringify(value) || value
    localStorage.setItem(key, value)
}

// 获取
export const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key))

}

// 删除 
export const removeItem = (key) => {
    localStorage.removeItem(key)
}
