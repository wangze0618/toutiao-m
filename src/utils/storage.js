/*
    封装 本地存储 操作方法
*/

// 存储
export const setItem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
}

// 获取
export const getItem = (key) => {
    const data = localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

// 删除 
export const removeItem = (key) => {
    localStorage.removeItem(key)
}
