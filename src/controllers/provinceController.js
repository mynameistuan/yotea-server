import Province from "../models/provinceModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const province = await new Province(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        province,
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
    const features = new APIFeatutes(Province, req.query).filter().sort().limitFields();
    const provinces = await features.query;

    res.json({
      status: true,
      payload: {
        provinces,
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
    const { code } = req.params;
    const province = await Province.findOne({ code }).exec();

    res.json({
      status: true,
      payload: {
        province,
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
    const province = await Province.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        province,
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
    const province = await Province.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        province,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
