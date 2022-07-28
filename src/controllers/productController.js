import Product from "../models/productModel";
import CateProduct from "../models/cateProductModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const getAll = async (req, res) => {
  try {
    const features = await new APIFeatutes(Product, req.query).filter().sort().limitFields().paginate();
    // execute query
    const products = await features.query;

    res.json({
      status: true,
      payload: {
        products,
        total: features.total,
        totalPage: Math.ceil(features.total / features.limit),
        currentPage: features.page,
        perPage: features.limit,
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
    const product = await Product.findOne({ _id: id }).exec();

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

export const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).exec();

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

// sản phẩm theo danh mục
export const getProductByCate = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const features = await new APIFeatutes(Product.find({ categoryId }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const productQuery = await features.query;
    const categoryQuery = await CateProduct.findOne({ _id: categoryId }).exec();

    const [products, category] = await Promise.all([productQuery, categoryQuery]);

    res.json({
      status: true,
      payload: {
        products,
        category,
        total: features.total,
        totalPage: Math.ceil(features.total / features.limit),
        currentPage: features.page,
        perPage: features.limit,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

// sp liên quan
export const getRelated = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const productData = await Product.findOne({ _id: productId }).exec();
    const features = await new APIFeatutes(
      Product.find({ categoryId: productData.categoryId, _id: { $ne: productId } }),
      req.query,
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const products = await features.query;

    res.json({
      status: true,
      payload: {
        products: products,
        total: features.total,
        totalPage: Math.ceil(features.total / features.limit),
        currentPage: features.page,
        perPage: features.limit,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
