import Ward from "../models/wardModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const ward = await new Ward(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        ward,
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
    const features = new APIFeatutes(Ward, req.query).filter().sort().limitFields();
    const wards = await features.query;

    res.json({
      status: true,
      payload: {
        wards,
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
    const ward = await Ward.findOne({ code }).exec();

    res.json({
      status: true,
      payload: {
        ward,
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
    const { code } = req.params;
    const ward = await Ward.findOneAndUpdate({ code }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        ward,
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
    const ward = await Ward.findOneAndDelete({ _id }).exec();
    res.json({
      status: true,
      payload: {
        ward,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
