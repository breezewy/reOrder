import service from './request'

//获取可用票
export const getGuidance = id => {
    return service({
        url: `/guidance/get/${id}`,
        method: 'get'
    })
}
