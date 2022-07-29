import District from "../models/districtModel";
import Province from "../models/provinceModel";
import Ward from "../models/wardModel";
import { APIFeatutes } from "../utils/apiFeatutes";

export const add = async (req, res) => {
  try {
    const district = await new District(req.body).save();

    res.status(201).json({
      status: true,
      payload: {
        district,
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
    const features = new APIFeatutes(District, req.query).filter().sort().limitFields();
    const districts = await features.query;

    res.json({
      status: true,
      payload: {
        districts,
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
    const district = await District.findOne({ code }).exec();

    res.json({
      status: true,
      payload: {
        district,
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
    const district = await District.findOneAndUpdate({ _id: id }, req.body, { new: true });

    res.json({
      status: true,
      payload: {
        district,
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
    const district = await District.findOneAndDelete({ _id }).exec();

    res.json({
      status: true,
      payload: {
        district,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const getFullAddress = async (req, res) => {
  try {
    const { wardCode, districtCode, provinceCode } = req.body;
    const ward = await Ward.findOne({ code: wardCode }).exec();
    const district = await District.findOne({ code: districtCode }).exec();
    const province = await Province.findOne({ code: provinceCode }).exec();

    const [resWard, resDistrict, resProvince] = await Promise.all([ward, district, province]);
    res.json({
      status: true,
      payload: `${resWard.name}, ${resDistrict.name}, ${resProvince.name}`,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
