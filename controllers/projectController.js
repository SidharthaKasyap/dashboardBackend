const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const Project = require("../models/projectModel");
const cloudinary = require("cloudinary");

//create Project
exports.createProject = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.uploader.upload(req.body.documents, {
    folder: "projects",
  });
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  req.body.documents = image;
  req.body.creator = req.user.id;

  const project = await Project.create(req.body);
  res.status(201).json({
    success: true,
    project,
  });
});

//get all Technology--Mentor
exports.getAllProjectMentor = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;

  const apiFeature = new ApiFeatures(
    Project.find({ creator: req.params.id })
      .populate("members", "name")
      .populate("technology", "name"),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  const projects = await apiFeature.query;

  const filteredProjectCount = await Project.find(
    apiFeature.query._conditions
  ).countDocuments();

  res.status(200).json({ success: true, projects, filteredProjectCount });
});
//get all Technology--employee
exports.getAllProjectMember = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;

  const apiFeature = new ApiFeatures(
    Project.find({ members: req.params.id })
      .populate("members", "name")
      .populate("technology", "name"),
    req.query
  )
    .search()
    .filter()
    .pagination(resultPerPage);

  const projects = await apiFeature.query;
  const filteredProjectCount = await Project.find(
    apiFeature.query._conditions
  ).countDocuments();

  res.status(200).json({ success: true, projects, filteredProjectCount });
});

//update Project

exports.updateProject = catchAsyncErrors(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) return next(new ErrorHandler("not found", 404));
 
  if (req.body.documents) {
    await cloudinary.v2.uploader.destroy(project.documents.public_id);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.documents, {
      folder: "projects",
      width: 150,
      crop: "scale",
    });
    const image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    req.body.documents = image;
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    project,
  });
});

// delete project

exports.deleteProject = catchAsyncErrors(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) return next(new ErrorHandler("not found", 404));

  await Project.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Project Delete Successfully",
  });
});

//get single project

exports.getProjectDetails = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) return next(new ErrorHandler("not found", 404));

  res.status(200).json({
    success: true,
    project,
  });
});
