import CateProduct from "../models/cateProductModel";

export const getAll = async (req, res) => {
  try {
    const categories = await CateProduct.find().exec();

    res.json({
      status: true,
      data: {
        categories,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CateProduct.find({ _id: id }).exec();

    res.json({
      status: true,
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const add = async (req, res) => {
  try {
    const category = await new CateProduct(req.body).save();

    res.status(201).json({
      status: true,
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CateProduct.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec();

    res.json({
      status: true,
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CateProduct.findOneAndDelete({ _id: id }).exec();

    res.json({
      status: true,
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
