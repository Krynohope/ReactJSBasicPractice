import { FormData } from "../auth/validation"
import request from "../utils/request"

export const loginProcess = async (formData: FormData) => {
    const res = await request.post('account/login', formData, { withCredentials: true, })
    return res
}

export const registerProcess = async (formData: FormData) => {
    const res = await request.post('account/register', formData)
    return res
}

export const getUserProfile = async (uid: string) => {
    const res = await request.get(`account/profile/${uid}`);
    return res.data
}

export const getUserOrders = async (uid: string) => {
    const res = await request.get(`api/bills/${uid}`);
    return res.data
}

export const updateUserProfile = async (uid: string, formData: FormData) => {
    const res = await request.patch(`account/profile/edit/${uid}`, formData)
    return res
}
export const getOrderDetail = async (orderId: string) => {
    const res = await request.get(`api/bills/detail/${orderId}`)
    return res.data[0]
}
