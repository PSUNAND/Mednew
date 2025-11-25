/**
 * Medicine Controller
 * Handle medicine CRUD operations
 */

const Medicine = require('../models/Medicine.model');

/**
 * Create medicine
 * POST /api/medicines
 */
const createMedicine = async (req, res, next) => {
  try {
    const { name, description, category, price } = req.body;
    
    const medicine = new Medicine({
      name,
      description,
      category,
      price
    });
    
    await medicine.save();
    
    return res.status(201).json({
      success: true,
      message: 'Medicine created successfully',
      data: { medicine },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error creating medicine:', error);
    next(error);
  }
};

/**
 * Get all medicines
 * GET /api/medicines
 */
const getMedicines = async (req, res, next) => {
  try {
    const medicines = await Medicine.find();
    return res.status(200).json({
      success: true,
      message: 'Medicines retrieved successfully',
      data: { medicines },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting medicines:', error);
    next(error);
  }
};

/**
 * Get medicine by ID
 * GET /api/medicines/:id
 */
const getMedicineById = async (req, res, next) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Medicine retrieved successfully',
      data: { medicine },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting medicine:', error);
    next(error);
  }
};

/**
 * Update medicine
 * PUT /api/medicines/:id
 */
const updateMedicine = async (req, res, next) => {
  try {
    const { name, description, category, price } = req.body;
    
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price },
      { new: true, runValidators: true }
    );
    
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Medicine updated successfully',
      data: { medicine },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error updating medicine:', error);
    next(error);
  }
};

/**
 * Delete medicine
 * DELETE /api/medicines/:id
 */
const deleteMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    
    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: 'Medicine not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Medicine deleted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error deleting medicine:', error);
    next(error);
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
};
