import Post from "../models/postModel";
import CatePost from "../models/catePostModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const getAll = async (req, res) => {
  try {
    const features = await new APIFeatutes(Post, req.query).filter().sort().limitFields().paginate();
    // execute query
    const posts = await features.query;

    res.json({
      status: true,
      payload: {
        posts,
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
    const post = await Post.findOne({ _id: id }).exec();

    res.json({
      status: true,
      payload: {
        post,
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
    const post = await new Post(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        post,
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
    const post = await Post.findOneAndUpdate({ _id }, req.body, { new: true }).exec();

    res.json({
      status: true,
      payload: {
        post,
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
    const post = await Post.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        post,
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
export const getPostByCate = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await CatePost.findOne({ slug }).exec();
    const features = await new APIFeatutes(Post.find({ categoryId: category._id }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const posts = await features.query;

    // const [posts, category] = await Promise.all([postQuery, categoryQuery]);

    res.json({
      status: true,
      payload: {
        posts,
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
    const { id: postId } = req.params;
    const postData = await Post.findOne({ _id: postId }).exec();
    const features = await new APIFeatutes(
      Post.find({ categoryId: postData.categoryId, _id: { $ne: postId } }),
      req.query,
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const posts = await features.query;

    res.json({
      status: true,
      payload: {
        posts: posts,
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
