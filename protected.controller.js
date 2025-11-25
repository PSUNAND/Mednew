/**
 * Protected Controller
 * Test controller to verify JWT authentication
 */

/**
 * Protected route - requires authentication
 * GET /api/auth/protected
 */
const getProtected = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Access granted',
    data: {
      message: 'You have access to this protected route',
      user: req.user
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getProtected
};
