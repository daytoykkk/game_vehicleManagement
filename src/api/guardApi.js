import ajax from './ajax'

export const reqFreezePark = () => ajax('/park/freezePark', {}, 'PUT');

export const reqUnfreezePark = () => ajax('/park/unfreezePark', {}, 'PUT');

export const reqCreatePlace = (data) => ajax('/park/createPlace', data, 'POST');

export const reqGetPlacePage = (params) => ajax('/park/getPlacePage', params, 'GET');

export const reqGetDayRecords = (data) => ajax('/park/getDayRecords', data, 'POST');





