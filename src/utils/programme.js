import service from './request'

//获取微信节目单
export const getGuidance = () => {
    return service({
        url: '/guidance/get',
        method: 'get'
    })
}

//获取微信节目单
export const getTraffic = () => {
    return service({
        url: '/guidance/get',
        method: 'get'
    })
}