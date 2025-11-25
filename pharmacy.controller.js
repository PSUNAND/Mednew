/**
 * Pharmacy Controller
 * Handle pharmacy CRUD operations
 */

const Pharmacy = require('../models/Pharmacy.model');

/**
 * Create pharmacy
 * POST /api/pharmacies
 */
const createPharmacy = async (req, res, next) => {
  try {
    const { name, ownerName, email, phone, address, location } = req.body;
    
    const pharmacy = new Pharmacy({
      name,
      ownerName,
      email,
      phone,
      address,
      location
    });
    
    await pharmacy.save();
    
    return res.status(201).json({
      success: true,
      message: 'Pharmacy created successfully',
      data: { pharmacy },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error creating pharmacy:', error);
    next(error);
  }
};

/**
 * Get all pharmacies
 * GET /api/pharmacies
 */
const getPharmacies = async (req, res, next) => {
  try {
    const pharmacies = await Pharmacy.find();
    return res.status(200).json({
      success: true,
      message: 'Pharmacies retrieved successfully',
      data: { pharmacies },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting pharmacies:', error);
    next(error);
  }
};

/**
 * Get pharmacy by ID
 * GET /api/pharmacies/:id
 */
const getPharmacyById = async (req, res, next) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
    
    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: 'Pharmacy not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Pharmacy retrieved successfully',
      data: { pharmacy },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting pharmacy:', error);
    next(error);
  }
};

/**
 * Update pharmacy
 * PUT /api/pharmacies/:id
 */
const updatePharmacy = async (req, res, next) => {
  try {
    const { name, ownerName, email, phone, address, location, isApproved } = req.body;
    
    const pharmacy = await Pharmacy.findByIdAndUpdate(
      req.params.id,
      { name, ownerName, email, phone, address, location, isApproved },
      { new: true, runValidators: true }
    );
    
    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: 'Pharmacy not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Pharmacy updated successfully',
      data: { pharmacy },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error updating pharmacy:', error);
    next(error);
  }
};

/**
 * Delete pharmacy
 * DELETE /api/pharmacies/:id
 */
const deletePharmacy = async (req, res, next) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    
    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: 'Pharmacy not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Pharmacy deleted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error deleting pharmacy:', error);
    next(error);
  }
};

module.exports = {
  createPharmacy,
  getPharmacies,
  getPharmacyById,
  updatePharmacy,
  deletePharmacy
};
