import ajax from './ajax'

export const reqCreatePark = (data) => ajax('/area/createPark', data, 'POST');

export const reqCreateParkAdmin = (data) => ajax('/area/createParkAdmin', data, 'POST');

export const reqGetParkAdmin = (params) => ajax('/area/getParkAdmin', params, 'GET');

export const reqGetAreaParkPage = (params) => ajax('/area/getAreaParkPage', params, 'GET');

export const reqGetParkDayAmount = (data) => ajax('/area/getParkDayAmount', data, 'POST');




