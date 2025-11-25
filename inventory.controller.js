/**
 * Inventory Controller
 * Handle pharmacy inventory operations
 */

const Inventory = require('../models/Inventory.model');

/**
 * Add inventory
 * POST /api/inventory
 */
const addInventory = async (req, res, next) => {
  try {
    const { pharmacyId, medicineId, quantity } = req.body;
    
    const inventory = new Inventory({
      pharmacyId,
      medicineId,
      quantity
    });
    
    await inventory.save();
    
    return res.status(201).json({
      success: true,
      message: 'Inventory added successfully',
      data: { inventory },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error adding inventory:', error);
    next(error);
  }
};

/**
 * Get inventory by pharmacy
 * GET /api/inventory/pharmacy/:pharmacyId
 */
const getInventoryByPharmacy = async (req, res, next) => {
  try {
    const inventory = await Inventory.find({ pharmacyId: req.params.pharmacyId })
      .populate('medicineId')
      .populate('pharmacyId');
    
    return res.status(200).json({
      success: true,
      message: 'Inventory retrieved successfully',
      data: { inventory },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting inventory:', error);
    next(error);
  }
};

/**
 * Update inventory
 * PUT /api/inventory/:id
 */
const updateInventory = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    
    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      { quantity, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Inventory updated successfully',
      data: { inventory },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error updating inventory:', error);
    next(error);
  }
};

/**
 * Delete inventory
 * DELETE /api/inventory/:id
 */
const deleteInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    
    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: 'Inventory not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Inventory deleted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error deleting inventory:', error);
    next(error);
  }
};

module.exports = {
  addInventory,
  getInventoryByPharmacy,
  updateInventory,
  deleteInventory
};
