import Product from "../models/productModel";

export const getAll = async (req, res) => {
  try {
    // build query
    // 1. Filter (?name=&price=)
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. Advanced filter (price[lte]=)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // 3. Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-price name");
    }

    // 4. Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 3;
    const skip = (page - 1) * limit;

    const numRows = await Product.countDocuments();
    if (req.query.page && skip >= numRows) {
      return res.status(404).json({
        status: false,
        message: "Page not found",
      });
    }
    query = query.skip(skip).limit(limit);

    // 5. Limit field
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // execute query
    const products = await query.exec();

    res.json({
      status: true,
      payload: {
        products,
        result: products.length,
        totalPage: Math.ceil(numRows / limit),
        currentPage: page,
        perPage: limit,
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
