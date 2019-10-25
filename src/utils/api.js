import service from './request'



//预约单
export const getReOrder = data => {
    return service({
        url: '/reOrder/wap/booking',
        method: 'post',
        data
    })
}


//获取可用票
export const getTicket = id => {
    return service({
        url: `/reOrder/wap/getTicket/${id}`,
        method: 'get'
    })
}

//获取日历

export const getCalendar = id => {
    return service({
        url: `/reOrder/wap/getCalendar/${id}`,
        method: 'get'
    })
}

//获取场次
export const getShow = data => {
    return service({
        url: `/reOrder/wap/getShow`,
        method: 'post',
        data
    })
}

//获取用户订单信息
export const getUserOrderInfo = id => {
    return service({
        url: `/reOrder/wap/getUserOrderInfo/${id}`,
        method: 'get'
    })
}


//下预约单
export const downOrder = data => {
    return service({
        url: '/reOrder/wap/downOrder',
        method: 'post',
        data
    })
}




//获取子订单
export const getOrder = id => {
    return service({
        url: `/reChildOrder/wap/getByReOrderId/${id}`,
        method: 'get'
    })
}

//获取多选票的剩余预约数
export const getSurplusNumber = id => {
    return service({
        url: `/reOrder/wap/getLastTicketByMany/${id}`,
        method: 'get'
    })
}