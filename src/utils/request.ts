import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:3000/"
})

export const get = async (path: string, options = {}) => {
    const response = await request.get(path, options);
    return response.data
}
export const post = async (path: string, data: any, options = {}) => {
    const response = await request.post(path, data, options)
    return response.data
}
export const patch = async (path: string, data: any, options = {}) => {
    const response = await request.patch(path, data, options)
    return response.data
}


export default request;