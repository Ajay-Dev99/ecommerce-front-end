import { axiosInstance } from "../axios/axiosInstance"

export const listProducts = () => {
    return axiosInstance.get("product/get-products")
}