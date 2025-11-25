/**
 * Delivery Partner Controller
 * Handle delivery partner operations
 */

const DeliveryPartner = require('../models/DeliveryPartner.model');

/**
 * Register delivery partner
 * POST /api/delivery
 */
const registerDeliveryPartner = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    
    const deliveryPartner = new DeliveryPartner({
      name,
      email,
      phone
    });
    
    await deliveryPartner.save();
    
    return res.status(201).json({
      success: true,
      message: 'Delivery partner registered successfully',
      data: { deliveryPartner },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error registering delivery partner:', error);
    next(error);
  }
};

/**
 * Get available delivery partners
 * GET /api/delivery/available
 */
const getAvailablePartners = async (req, res, next) => {
  try {
    const partners = await DeliveryPartner.find({ isAvailable: true });
    
    return res.status(200).json({
      success: true,
      message: 'Available partners retrieved successfully',
      data: { partners },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting available partners:', error);
    next(error);
  }
};

/**
 * Update availability
 * PUT /api/delivery/:id/availability
 */
const updateAvailability = async (req, res, next) => {
  try {
    const { isAvailable } = req.body;
    
    const partner = await DeliveryPartner.findByIdAndUpdate(
      req.params.id,
      { isAvailable },
      { new: true, runValidators: true }
    );
    
    if (!partner) {
      return res.status(404).json({
        success: false,
        message: 'Delivery partner not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      data: { partner },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error updating availability:', error);
    next(error);
  }
};

module.exports = {
  registerDeliveryPartner,
  getAvailablePartners,
  updateAvailability
};
