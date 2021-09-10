import ajax from './ajax'

export const reqCreateArea = (data) => ajax('/boss/createArea', data, 'POST');

export const reqCreateAreaAdmin = (data) => ajax('/boss/createAreaAdmin', data, 'POST');

export const reqGetAreaPage = (params) => ajax('/boss/getAreaPage', params, 'GET');

export const reqGetAreaAdmin = (params) => ajax('/boss/getAreaAdmin', params, 'GET')

export const reqGetAreaDayAmount = (data) => ajax('/boss/getAreaDayAmount', data, 'POST')