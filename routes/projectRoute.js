const express = require("express");
const {
  createProject,
  getAllProjectMentor,
  getAllProjectMember,
  updateProject,
  deleteProject,
  getProjectDetails,
} = require("../controllers/projectController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/project/new").post(isAuthenticatedUser, createProject);

router
  .route("/projects/mentor/:id")
  .get(isAuthenticatedUser, getAllProjectMentor);

router
  .route("/projects/member/:id")
  .get(isAuthenticatedUser, getAllProjectMember);

router
  .route("/project/:id")
  .put(updateProject)
  .delete(deleteProject)
  .get(getProjectDetails);

module.exports = router;
