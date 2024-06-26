"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const cityName = common_vendor.ref("武汉");
    const cityId = common_vendor.ref(1);
    const serv = common_vendor.ref([]);
    common_vendor.onShow(async () => {
      console.log("开始请求城市的服务");
      const servData = await api_request.requestApi("/serv/1");
      serv.value = servData.serv;
      console.log("已请求城市服务数据", serv.value);
    });
    function changeCity() {
      common_vendor.index.navigateTo({
        url: "/pages/city_choice/city",
        events: {
          acceptDataFromOpenedPage: async function(data) {
            console.log("data", data);
            cityName.value = data.name;
            cityId.value = data.city_id;
            console.log("开始请求城市的服务", cityId.value);
            const servData = await api_request.requestApi("/serv/" + cityId.value);
            serv.value = servData.serv;
            console.log("已请求城市服务数据", serv.value);
          }
        }
      });
    }
    function toPayChoice(servId) {
      console.log(servId);
      common_vendor.index.navigateTo({
        url: "/pages/detail/pay_choice?servId=" + servId + "&cityId=" + cityId.value + "&cityName=" + cityName.value
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(cityName.value),
        b: common_vendor.o(changeCity),
        c: common_vendor.f(serv.value, (item, index, i0) => {
          return {
            a: item.img_url,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => toPayChoice(item.id), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Project/life-pay-app/前端/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
