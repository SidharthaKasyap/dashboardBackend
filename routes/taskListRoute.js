const express = require("express");
const {
  createTaskList,
  getTaskList,
  updateTask,
  deleteTask,
  getTaskDetails,
} = require("../controllers/taskListController");

const router = express.Router();

router.route("/tasklist/new").post(createTaskList);

router.route("/tasklist/:id").get(getTaskList);

router
  .route("/task/:id")
  .put(updateTask)
  .delete(deleteTask)
  .get(getTaskDetails);


module.exports = router;
