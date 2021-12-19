const router = require('express').Router();
const isAuthorized = require('../utils/isAuthorized');
const signupController = require('./auth/sighup');
const loginController = require('./auth/login');

const { Business_profile } = require('../models');

const { signupValidator } = require('../validators/userValidator');
const { createBusinessProfileValidator } = require('../validators/business');
const { createScheduleValidator } = require('../validators/schedule');

const { createBusinessProfileController, updateBusinessProfileControler, getBusinessProfileController } = require('./business');
const { createScheduleController, updateScheduleController, deleteScheduleController, getAllScheduleController, getSingleScheduleController } = require('./schedule');
const { createClassValidator } = require('../validators/class');
const { createClassController, updateClassController, getClassesController, getSingleClassController } = require('./class');
const { createContact, updateContact, createStaffContact, updateStaffContact, getAllContacts } = require('./contact');
const { createStaffValidator } = require('../validators/staff');
const { createStaff, updateStaff, deleteStaff, getAllStaff, getSingleStaff } = require('./staff');
const tokenController = require('./auth/token');
const { logoutController } = require('./auth/logout');
const { myInfoController } = require('./myInfo');
const { getCampaings, createCampaings } = require('./campaings');


/*
// Auth routes 
*/
router.post('/api/signup', signupValidator, signupController);
router.post('/api/token', tokenController);
router.post('/api/login', loginController);
router.post('/api/logout', isAuthorized, logoutController);

// Protected routes
router.use('/api', isAuthorized);

// Business routes
router.get('/api/my_info', isAuthorized, myInfoController);

// Business routes
router.get('/api/business_profile/my_info', businessProfileCheck, getBusinessProfileController);
router.post('/api/business_profile/create', createBusinessProfileValidator, createBusinessProfileController);
router.put('/api/business_profile/update', businessProfileCheck, updateBusinessProfileControler);

// Need business profile to access below routes
router.use('/api', businessProfileCheck);

// Class routes
router.get('/api/class/all_classes', getClassesController);
router.get('/api/class/:id', getSingleClassController);
router.post('/api/class/create', createClassValidator, createClassController);
router.put('/api/class/update', updateClassController);

// Schedule routes
router.get('/api/schedule/all_schedules', getAllScheduleController);
router.get('/api/schedule/:id', getSingleScheduleController);
router.post('/api/schedule/create', createScheduleValidator, createScheduleController);
router.put('/api/schedule/update/:id', updateScheduleController);
router.delete('/api/schedule/delete/:id', deleteScheduleController);

// Campaings routes
router.get('/api/campaings/all_campaings', getCampaings)
router.post('/api/campaings/create', createCampaings);

// Staff routes
router.get('/api/staff/all_staffs', getAllStaff);
router.get('/api/staff/:id', getSingleStaff);
router.post('/api/staff/create', createStaffValidator, createStaff);
router.put('/api/staff/update/:id', updateStaff);
router.delete('/api/staff/delete/:id', deleteStaff);

// Contact routes
router.get('/api/contact/all_contacts', getAllContacts); // Get all business profile contacts
router.post('/api/contact/create', createContact); // Add business profile contact
router.put('/api/contact/update/', updateContact); // Update business profile contact

// Admin panel routes
router.get('/admin', (req, res) => {
  res.status(200).render('admin', { title: "Admin panel" });
})

// Business profile checker
async function businessProfileCheck(req, res, next) {
  const isExist = await Business_profile.findByPk(req.User.id);
  if (!isExist) {
    return res.status(400).json({ success: false, error: "You do not have business profile yet. Create a business profile first" });
  }

  next();
}


module.exports = router;
