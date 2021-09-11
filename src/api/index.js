import { reqLogin } from './loginApi'
import {
    reqCreateArea,
    reqCreateAreaAdmin,
    reqGetAreaPage,
    reqGetAreaDayAmount,
    reqGetAreaAdmin,
} from './bossApi'

import {
    reqCreatePark,
    reqCreateParkAdmin,
    reqGetParkAdmin,
    reqGetAreaParkPage,
    reqGetParkDayAmount,
} from './adminApi'

import {
    reqFreezePark,
    reqUnfreezePark,
    reqCreatePlace,
    reqGetPlacePage,
    reqGetDayRecords,
} from './guardApi'

export {
    // 登陆
    reqLogin,
    // boss
    reqCreateArea,
    reqCreateAreaAdmin,
    reqGetAreaPage,
    reqGetAreaDayAmount,
    reqGetAreaAdmin,
    // admin
    reqCreatePark,
    reqCreateParkAdmin,
    reqGetParkAdmin,
    reqGetAreaParkPage,
    reqGetParkDayAmount,
    // guard
    reqFreezePark,
    reqUnfreezePark,
    reqCreatePlace,
    reqGetPlacePage,
    reqGetDayRecords,
}