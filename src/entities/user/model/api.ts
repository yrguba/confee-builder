import { axiosClient } from 'shared/configs';

class UserApi {
    handleCheckNickname() {
        return async (data: { nickname: string }) => {
            const response = await axiosClient.get('/api/v2/users/check-nickname', { params: { nickname: data.nickname } });
            return response.data;
        };
    }

    handleCheckEmail() {
        return async (data: { email: string }) => {
            const response = await axiosClient.get('/api/v2/check-identifier', { params: { identifier: data.email } });
            return response.data;
        };
    }

    handleCheckPhone() {
        return async (data: { phone: string | number }) => {
            const response = await axiosClient.get('/api/v2/check-identifier', { params: { identifier: data.phone } });
            return response.data;
        };
    }
}

export default new UserApi();
