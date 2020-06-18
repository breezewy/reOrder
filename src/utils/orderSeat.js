import service from './request'


export const getOrderSeat = (parkId,orderId) => {
    return service({
        url: `/offline/wap/getByOrderSeat/${parkId}/${orderId}`,
        method: 'get'
    })
}