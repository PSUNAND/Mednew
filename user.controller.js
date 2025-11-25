/**
 * User Controller
 * Handle user CRUD operations
 */

const User = require('../models/User.model');

/**
 * Get all users
 * GET /api/users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: { users },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting users:', error);
    next(error);
  }
};

/**
 * Get user by ID
 * GET /api/users/:id
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: { user },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting user:', error);
    next(error);
  }
};

/**
 * Update user
 * PUT /api/users/:id
 */
const updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { user },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error updating user:', error);
    next(error);
  }
};

/**
 * Delete user
 * DELETE /api/users/:id
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
