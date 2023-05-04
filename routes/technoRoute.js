const express = require("express");
const {
  getAllTechnology,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  getTechDetails,
  getTechnology,
} = require("../controllers/technoController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/technologies").get(isAuthenticatedUser, getAllTechnology);
router.route("/technologies/all").get(isAuthenticatedUser, getTechnology);

router.route("/technology/new").post(isAuthenticatedUser, createTechnology);

router
  .route("/technology/:id")
  .put(isAuthenticatedUser, updateTechnology)
  .delete(isAuthenticatedUser, deleteTechnology)
  .get(isAuthenticatedUser, getTechDetails);

module.exports = router;

//authorizeRoles("mentor"),
