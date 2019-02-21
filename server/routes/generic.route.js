const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const genericCtrl = require('../controllers/generic.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))


router.route('/dynamicdrp')
  .post(asyncHandler(genericCtrl.dynamicdrp));

router.route('/dynamicinsert')
  .post(asyncHandler(genericCtrl.dynamicinsert));

router.route('/testrelationship')
  .post(asyncHandler(genericCtrl.testrelationship));
  
router.route('/filestreamfs')
  .post(asyncHandler(genericCtrl.filestreamfs));

router.route('/selectgeneric')
  .post(asyncHandler(genericCtrl.selectgeneric));

router.route('/insertgeneric')
  .post(asyncHandler(genericCtrl.insertgeneric));

router.route('/updategeneric')
  .post(asyncHandler(genericCtrl.updategeneric));

router.route('/selectdrpgeneric')
  .post(asyncHandler(genericCtrl.selectdrpgeneric));
  
router.route('/selectsubdrpgeneric')
  .post(asyncHandler(genericCtrl.selectsubdrpgeneric));
  
router.route('/selecteditgeneric')
  .post(asyncHandler(genericCtrl.selecteditgeneric));
  
router.route('/selecteditgeneric2')
  .post(asyncHandler(genericCtrl.selecteditgeneric2));

router.route('/selectgenericquery')
  .post(asyncHandler(genericCtrl.selectgenericquery));

router.route('/selectgenericquerydynamictbl')
  .post(asyncHandler(genericCtrl.selectgenericquerydynamictbl));

router.route('/selectautocompletegeneric')
  .post(asyncHandler(genericCtrl.selectautocompletegeneric));