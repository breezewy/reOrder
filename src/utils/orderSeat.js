import service from './request'


// 座位详情
export const getOrderSeat = (parkId,orderId) => {
    return service({
        url: `/offline/wap/getByOrderSeat/${parkId}/${orderId}`,
        method: 'get'
    })
}

// 获取座位列表
export const getParkOrderList = (data) => {
    return service({
        url: `/offline/wap/orderList`,
        method: 'post',
        data
    })
}