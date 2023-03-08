import APIError from "./apiError.utils.js";
import APIFeatures, {docsFilter} from "./apiFeatures.utils.js";
import asyncHandler from "./asyncHandler.utils.js";

export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    //_FOR_NESTED_ROUTES_//
    let filter = {};
    if (req.filterObj) filter = req.filterObj;

    //_NUM_OF_DOCUMENTS_//
    const totalNumOfDocs = await Model.countDocuments(docsFilter(req.query));

    // Build query
    const apiFeatures = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .fields()
      .search()
      .paginate(totalNumOfDocs);

    const {query, paginationStatus} = apiFeatures;

    //Execute query
    const docs = await query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      totalNumOfDocs,
      paginationStatus,
      data: {
        docs,
      },
    });
  });

export const getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    //Build Query
    let query = Model.findById(id).select("-__v");
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    //Execute query
    const doc = await query;

    //NOTFOUND Document Error
    if (!doc) {
      return next(
        new APIError(`There is no document match this id : ${id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    //NOTFOUND Document Error
    if (!doc) {
      return next(
        new APIError(`There is no document match this id : ${id}`, 404)
      );
    }
    //Activate the "save" event when update, to trigger Schema.post("save")
    doc.save();
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const doc = await Model.findByIdAndDelete(id);

    //NOTFOUND Document Error
    if (!doc) {
      return next(
        new APIError(`There is no document match this id : ${id}`, 404)
      );
    }

    //Activate the "remove" event when delete, to trigger Schema.post("remove")
    doc.remove();
    res.status(204).json({
      status: "success",
    });
  });
