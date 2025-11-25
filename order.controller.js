/**
 * Order Controller
 * Handle order operations
 */

const Order = require('../models/Order.model');

/**
 * Create order
 * POST /api/orders
 */
const createOrder = async (req, res, next) => {
  try {
    const { userId, pharmacyId, items, totalPrice } = req.body;
    
    const order = new Order({
      userId,
      pharmacyId,
      items,
      totalPrice
    });
    
    await order.save();
    
    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    next(error);
  }
};

/**
 * Get user orders
 * GET /api/orders/user/:userId
 */
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('pharmacyId')
      .populate('items.medicineId')
      .populate('deliveryPartnerId');
    
    return res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: { orders },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting user orders:', error);
    next(error);
  }
};

/**
 * Get pharmacy orders
 * GET /api/orders/pharmacy/:pharmacyId
 */
const getPharmacyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ pharmacyId: req.params.pharmacyId })
      .populate('userId')
      .populate('items.medicineId')
      .populate('deliveryPartnerId');
    
    return res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: { orders },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting pharmacy orders:', error);
    next(error);
  }
};

/**
 * Update order status
 * PUT /api/orders/:id/status
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, deliveryPartnerId } = req.body;
    
    const updateData = { status };
    if (deliveryPartnerId) {
      updateData.deliveryPartnerId = deliveryPartnerId;
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: { order },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getPharmacyOrders,
  updateOrderStatus
};
