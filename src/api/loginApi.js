import ajax from './ajax'

export const reqLogin = (data) => ajax('/auth/adminLogin', data, 'POST')