import axiosClient from "../axiosClient/axiosClient";

const userApi = {
    getUserCustomer: (params: any) =>{
        const url = `/users`
        return axiosClient.get(url, params)
    },
}
export default userApi;