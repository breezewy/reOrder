import service from './request'

//获取人脸列表
export const getFaceList = data => {
    return service({
        url: '/face/list',
        method: 'post',
        data
    })
}

//删除人脸
export const deleteFace = id => {
    return service({
        url: `/face/del/${id}`,
        method: 'delete'
    })
}

//重置人脸
export const resetFace = orderNo => {
    return service({
        url: `/face/reset/${orderNo}`,
        method: 'post'
    })
}

//恢复人脸
export const restoreFace = id => {
    return service({
        url: `/face/restore/${id}`,
        method: 'put'
    })
}

//重设人脸
export const rebuildFace = id => {
    return service({
        url: `/face/getBindFaceUrl/${id}`,
        method: 'get'
    })
}
