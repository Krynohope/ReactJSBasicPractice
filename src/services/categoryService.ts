import request from "../utils/request"

export const getCategories = async () => {
    const res = await request.get(`api/categories`)
    return res.data
}
