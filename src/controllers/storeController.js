import Store from "../models/storeModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    // website chỉ có 1 địa chỉ trên header - footer
    const currentStore = await Store.findOne({ currentStore: true }).exec();
    if (currentStore && req.body.currentStore) {
      return res.status(400).json({
        status: false,
        message: "Đã tồn tại địa chỉ",
      });
    }

    const store = await new Store(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        store,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const features = await new APIFeatutes(Store, req.query).filter().sort().limitFields().paginate();
    const stores = await features.query;

    res.json({
      status: true,
      payload: {
        stores,
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
    const { id: _id } = req.params;
    const store = await Store.findOne({ _id }).exec();

    res.json({
      status: true,
      payload: {
        store,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        store,
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
    const store = await Store.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        store,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
