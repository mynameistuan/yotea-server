import Product from "../models/productModel";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().exec();

    res.json({
      status: true,
      payload: {
        products,
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
    const product = await Product.find({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        product,
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
    const product = await new Product(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        product,
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
    const { id: _id } = req.params;
    const product = await Product.findOneAndUpdate({ _id }, req.body, { new: true }).exec();

    res.json({
      status: true,
      payload: {
        product,
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
    const { id: _id } = req.params;
    const product = await Product.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
