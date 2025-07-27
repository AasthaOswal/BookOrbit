const express = require('express');
const router = express.Router();

const {getOrders, updateOrderStatus,createOrder} = require('../controllers/orderController');
const { authenticateToken } = require('../middlewares/userAuth');

router.post('/',authenticateToken,createOrder);
router.get('/', authenticateToken,getOrders);

router.put('/:orderId/status', authenticateToken, updateOrderStatus);

module.exports = router;