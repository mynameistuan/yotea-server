import User from "../models/userModel";

export const createOrUpdateUser = async (req, res) => {
  try {
    let { name, picture, email } = req.user;
    if (!name) name = email.split("@")[0];
    if (!picture) picture = process.env.DEFAULT_AVATAR;

    const userExits = await User.findOne({ email }).exec();
    if (userExits) {
      const user = await User.findOneAndUpdate({ email }, { name, email, avatar: picture }, { new: true }).exec();

      res.json({
        status: true,
        payload: {
          user,
        },
      });
    } else {
      const user = await new User({ name, email, avatar: picture }).save();

      res.status(201).json({
        status: true,
        payload: {
          user,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email }).exec();

    res.json({
      status: true,
      payload: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
