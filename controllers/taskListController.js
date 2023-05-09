const TaskList = require("../models/tasklistModel.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const ErrorHandler = require("../utils/errorhandler");
const ApiFeatures2 = require("../utils/apiFeatures2.js");

//create tasklist
exports.createTaskList = catchAsyncErrors(async (req, res) => {
  const tasks = await TaskList.create(req.body);
  res.status(201).json({
    success: true,
    tasks,
  });
});
//get all tasklist
exports.getTaskList = catchAsyncErrors(async (req, res) => {
  const allTasks = await TaskList.find({ project: req.params.id }).populate(
    "project",
    "name"
  );
  const resultPerPage = 5;
  const apiFeature = new ApiFeatures2(
    TaskList.find({ project: req.params.id }).populate("project", "name"),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  const tasks = await apiFeature.query;
  const filteredTaskCount = await TaskList.find(
    apiFeature.query._conditions
  ).countDocuments();

  res.status(200).json({ success: true, allTasks, tasks, filteredTaskCount });
});

//update Task

exports.updateTask = catchAsyncErrors(async (req, res) => {
  let task = await TaskList.findById(req.params.id);
  if (!task) return next(new ErrorHandler("Task not found", 404));

  task = await TaskList.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    task,
  });
});

// delete Task

exports.deleteTask = catchAsyncErrors(async (req, res) => {
  const task = await TaskList.findById(req.params.id);
  if (!task) return next(new ErrorHandler("task not found", 404));

  await TaskList.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Task Delete Successfully",
  });
});

//get single project

exports.getTaskDetails = catchAsyncErrors(async (req, res, next) => {
  const task = await TaskList.findById(req.params.id);
  if (!task) return next(new ErrorHandler("Task not found", 404));

  res.status(200).json({
    success: true,
    task,
  });
});

// exports.updateStatus = catchAsyncErrors(async (req, res) => {
//   let task = await TaskList.findById(req.params.id);
//   if (!task) return next(new ErrorHandler("Task not found", 404));

//   // Update the status of the project in the database

//   task = await TaskList.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.status(200).json({
//     success: true,
//     task,
//   });
// });
