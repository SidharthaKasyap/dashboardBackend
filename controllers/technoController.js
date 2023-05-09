const Technology = require("../models/technoModel.js");
// const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create Technology
exports.createTechnology = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.uploader.upload(req.body.images, {
    folder: "tech",
    width: 150,
    crop: "scale",
  });
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  req.body.images = image;
  const technology = await Technology.create(req.body);

  res.status(201).json({
    success: true,
    technology,
  });
});

//get all Technology
exports.getAllTechnology = catchAsyncErrors(async (req, res) => {
  const resultPerPage = req.query.resultPerPage || 5;

  const techCount = await Technology.countDocuments();

  const apiFeature = new ApiFeatures(Technology.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const technologies = await apiFeature.query;

  const filteredTechCount = await Technology.find(
    apiFeature.query._conditions
  ).countDocuments();

  res.status(200).json({
    success: true,
    technology: technologies,
    techCount,
    filteredTechCount,
  });
});
//get all Technology
exports.getTechnology = catchAsyncErrors(async (req, res) => {
  const techCount = await Technology.countDocuments();
  const technologies = await Technology.find();

  res.status(200).json({
    success: true,
    technology: technologies,
    techCount,
  });
});

//update Tech

exports.updateTechnology = catchAsyncErrors(async (req, res) => {
  let tech = await Technology.findById(req.params.id);

  if (!tech) return next(new ErrorHandler("not found", 404));

  if (req.body.images) {
    await cloudinary.v2.uploader.destroy(tech.images.public_id);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "tech",
      width: 150,
      crop: "scale",
    });
    const image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
    req.body.images = image;
  }
  tech = await Technology.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    tech,
  });
});

// delete tech

exports.deleteTechnology = catchAsyncErrors(async (req, res) => {
  const tech = await Technology.findById(req.params.id);

  if (!tech) return next(new ErrorHandler("not found", 404));

  await Technology.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Technology Delete Successfully",
  });
});

//get single tech

exports.getTechDetails = catchAsyncErrors(async (req, res, next) => {
  const tech = await Technology.findById(req.params.id);

  if (!tech) return next(new ErrorHandler("not found", 404));

  res.status(200).json({
    success: true,
    tech,
  });
});
