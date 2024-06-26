"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://localhost:8080";
function navigateTo(url) {
  common_vendor.wx$1.navigateTo({
    url: "/pages" + url
  });
}
function getToken() {
  const userInfo = common_vendor.wx$1.getStorageSync("userInfo");
  if (userInfo) {
    console.log("从缓存中获取token", userInfo.token);
    return userInfo.token;
  } else {
    return "[object Undefined]";
  }
}
function getUid() {
  const userInfo = common_vendor.wx$1.getStorageSync("userInfo");
  if (userInfo) {
    console.log("从缓存中获取uid", userInfo.user.id);
    return userInfo.user.id;
  } else {
    return "[object Undefined]";
  }
}
function requestApi(url, data = {}, method = "GET") {
  console.log("网络请求的参数为:", data);
  return new Promise((resolev, reject) => {
    common_vendor.wx$1.request({
      url: baseUrl + url,
      method,
      data,
      header: {
        "content-type": "application/json",
        "token": getToken()
      },
      success: (res) => {
        console.log("网络请求的结果为", res);
        const status = Number(res.data.statusCode);
        console.log("status=", status);
        switch (status) {
          case 200:
            resolev(res.data);
            common_vendor.wx$1.hideLoading();
            break;
          case 404:
            console.error("接口不存在");
            console.error(res.data.message);
            reject("404");
            common_vendor.wx$1.hideLoading();
            break;
          case 401:
            showToast("请先登录");
            console.error("无访问权限");
            console.error(res.data.message);
            common_vendor.index.navigateTo({ url: "/pages/login/index" });
            common_vendor.wx$1.hideLoading();
            break;
          case 500:
            showToast("发生异常错误");
            console.error("服务器错误");
            console.error(res.data.message);
            reject("500");
            common_vendor.wx$1.hideLoading();
            break;
          case 501:
            showToast("发生异常错误");
            console.error("服务器错误");
            console.error(res.data.message);
            reject("501");
            common_vendor.wx$1.hideLoading();
            break;
          case 502:
            showToast("发生异常错误");
            console.error("服务器错误");
            console.error(res.data.message);
            reject("502");
            common_vendor.wx$1.hideLoading();
            break;
          case 400:
            console.error("参数不对");
            console.error(res.data.message);
            reject("400");
            common_vendor.wx$1.hideLoading();
            break;
        }
      },
      fail: (err) => {
        console.log(err);
        reject(err);
        common_vendor.wx$1.hideLoading();
      }
    });
  });
}
function showToast(title) {
  common_vendor.wx$1.showToast({
    title,
    icon: "none",
    duration: 1500
  });
}
exports.getToken = getToken;
exports.getUid = getUid;
exports.navigateTo = navigateTo;
exports.requestApi = requestApi;
exports.showToast = showToast;
