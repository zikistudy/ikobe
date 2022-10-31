import { requestData } from "./service";

// 注册用户
let Register = (params) => {
  return requestData("api/register", params);
};
// 获取验证码
let GetMobileCode = (params) => {
  return requestData("api/sendMobileCode", params);
};
// 登录用户
let Login = (params) => {
  return requestData("api/login", params);
};
// 修改密码
let UpdatePassword = (params) => {
  return requestData("api/updatePassword", params);
};
// 获取用户基本信息
let GetUserInfo = (params) => {
  return requestData("my/getUserInfo", params);
};
// 更改用户昵称和头像
let UpdateUserInfo = (params) => {
  return requestData("my/update/userInfo", params);
};
// 发送留言
let sendMessage = (params) => {
  return requestData("my/sendMessage", params);
};
// 获取留言表
let getMessageInfo = (params) => {
  return requestData("api/getMessageInfo", params);
};
// 留言点赞
let addFavorite = (params) => {
  return requestData("my/addFavorite", params);
};
// 取消留言点赞
let reduceFavorite = (params) => {
  return requestData("my/reduceFavorite", params);
};
// 根据当前登陆人获取留言已点赞数据
let getLikes = (params) => {
  return requestData("my/getLikes", params);
};
// 获取生涯回顾内容
let getReviewList = (params) => {
  return requestData("api/getReviewList", params);
};
// 获取上传oss的临时sts凭证
let getStsInfo = (params) => {
  return requestData("my/getStsInfo", params);
};
// 上传视频地址
let uploadVideo = (params) => {
  return requestData("my/uploadVideo", params);
};
// 获取视频列表
let getVideoInfo = (params) => {
  return requestData("api/getVideoInfo", params);
};
// 视频点赞
let addVideoFavorite = (params) => {
  return requestData("my/addVideoFavorite", params);
};
// 取消视频点赞
let cancelVideoFavorite = (params) => {
  return requestData("my/cancelVideoFavorite", params);
};
// 根据当前登陆人获取视频已点赞数据
let getVideoLikes = (params) => {
  return requestData("my/getVideoLikes", params);
};
// 人脸识别
let facehandel = (params) => {
  return requestData("api/facehandel", params);
};
export {
  Register,
  GetMobileCode,
  Login,
  GetUserInfo,
  UpdatePassword,
  UpdateUserInfo,
  sendMessage,
  getMessageInfo,
  addFavorite,
  reduceFavorite,
  getLikes,
  getReviewList,
  getStsInfo,
  uploadVideo,
  getVideoInfo,
  addVideoFavorite,
  cancelVideoFavorite,
  getVideoLikes,
  facehandel
};
