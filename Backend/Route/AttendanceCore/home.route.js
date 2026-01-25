import express, { Router } from 'express';
import objRouterPass from '../../Controller/AttendanceController/home.controller.js';
import { UserAccessMiddleware } from '../../middleware/studentAccessMiddleware.js';

const router = new Router();

// In this router have
// 1) main function - objRouterPass.homeController
// 2) middleware - UserAccessMiddleware => Authenticate the user crendiantials and expired log


// function_details
//        expected paylod -
//                 - gemidlog => objectId of mongodb
//                 - timestamp => mileseconds
//        API key -
//                hearder.authorization = key
//                to verify by - middleware auto;
router.post('/', UserAccessMiddleware, objRouterPass.homeController);
router.post('/unmount', objRouterPass.unmountController)




export default router;