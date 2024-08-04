import request from "../utils/request"

export const getNewProduct = async () => {
    const res = await request.get(`api/products/new`)
    return res.data
}

export const getBslProduct = async () => {
    const res = await request.get(`api/products/bestSeller`)
    return res.data
}

export const getMixProduct = async () => {
    const res = await request.get(`api/products/page/2/limit/8`)
    return res.data
}

export const getProductByCate = async (id: string) => {
    const res = await request.get(`api/products/categoryid/${id}`)
    return res.data
}
export const getProductLimit = async (limit: number) => {
    const res = await request.get(`api/products/page/1/limit/${limit}`)
    return res.data
}

