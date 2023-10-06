const User = require("../models/User");
const Conversation = require("../models/Conversation");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입 된 유저입니다.");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "success", user, token });
      }
    }
    throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.findUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

userController.findUserInMessage = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const { userId } = req.body;
    const conversation = await Conversation.findOne({ _id: conversationId });

    const friendId = conversation.members.find((i) => i !== userId);
    const friendInfo = await User.findOne({ _id: friendId });

    if (friendInfo) {
      res.status(200).json({ status: "success", friendInfo });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

userController.findAllUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const allUsers = await User.find({
      _id: { $ne: userId },
    });
    console.log(allUsers);
    if (allUsers) {
      res.status(200).json({ status: "success", allUsers });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

userController.getUser = async (req, res) => {
  try {
    const id = req.body.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

module.exports = userController;
