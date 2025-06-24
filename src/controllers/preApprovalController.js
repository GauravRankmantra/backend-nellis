const ErrorHandler   = require("../utils/ErrorHandler.js");
const asyncHandler   = require("../utils/asyncHandler.js");
const sendResponse   = require("../utils/sendResponse");
const PreApproval    = require("../models/PreApproval.js");

// @desc    Create new pre-approval application
// @route   POST /api/v1/preapprovals
// @access  Public
exports.createPreApproval = asyncHandler(async (req, res, next) => {
  const newApp = await PreApproval.create(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "Pre-approval application created successfully!",
    data: newApp,
  });
});

// @desc    Get all pre-approval applications
// @route   GET /api/v1/preapprovals
// @access  Private/Admin
exports.getAllPreApprovals = asyncHandler(async (req, res, next) => {
  // -- filtering (if you want) --
  const queryObj = { ...req.query };
  ['page','sort','limit','fields'].forEach(f => delete queryObj[f]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, m => `$${m}`);
  
  let query = PreApproval.find(JSON.parse(queryStr));
  
  // -- sorting --
  if (req.query.sort) {
    query = query.sort(req.query.sort.split(',').join(' '));
  } else {
    query = query.sort('-createdAt');
  }
  
  // -- field limiting --
  if (req.query.fields) {
    query = query.select(req.query.fields.split(',').join(' '));
  } else {
    query = query.select('-__v');
  }
  
  // -- pagination --
  const page  = parseInt(req.query.page,10)  || 1;
  const limit = parseInt(req.query.limit,10) || 20;
  const skip  = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  
  const total = await PreApproval.countDocuments(JSON.parse(queryStr));
  const apps  = await query;
  
  if (!apps.length && page > 1) {
    return next(new ErrorHandler("This page does not exist.", 404));
  }
  
  sendResponse(res, {
    statusCode: 200,
    message: "Pre-approval applications fetched successfully!",
    results: apps.length,
    pagination: {
      currentPage: page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalResults: total
    },
    data: apps,
  });
});

exports.getPreApproval = asyncHandler(async (req, res, next) => {
  const app = await PreApproval.findById(req.params.id);
  if (!app) {
    return next(new ErrorHandler(`No application found for ID ${req.params.id}`, 404));
  }
  sendResponse(res, {
    statusCode: 200,
    message: "Application fetched successfully!",
    data: app,
  });
});

exports.updatePreApproval = asyncHandler(async (req, res, next) => {
  const updated = await PreApproval.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updated) {
    return next(new ErrorHandler(`No application found for ID ${req.params.id}`, 404));
  }
  sendResponse(res, {
    statusCode: 200,
    message: "Application updated successfully!",
    data: updated,
  });
});

// @desc    Delete an application
// @route   DELETE /api/v1/preapprovals/:id
// @access  Private/Admin
exports.deletePreApproval = asyncHandler(async (req, res, next) => {
  const deleted = await PreApproval.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return next(new ErrorHandler(`No application found for ID ${req.params.id}`, 404));
  }
  sendResponse(res, {
    statusCode: 204,
    message: "Application deleted successfully!",
    data: null,
  });
});

// @desc    Get total count of applications
// @route   GET /api/v1/preapprovals/count
// @access  Private/Admin
exports.totalPreApprovals = asyncHandler(async (req, res, next) => {
  const count = await PreApproval.countDocuments();
  sendResponse(res, {
    statusCode: 200,
    message: "Total pre-approval applications count",
    data: { count },
  });
});
