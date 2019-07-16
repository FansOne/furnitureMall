import wepy from 'wepy'
import api from '../api/api'

const request  = (url,method = 'GET',data = {})=>{
  wx.showLoading({title: '加载中...',mask: true});
  let token = wx.getStorageSync('token');
  return wepy.request({
    url: url,
    method: method,
    data: data,
    header: {
      Accept : 'application/vnd.houzz.v1+json',
      Authorization : `Bearer ${token}`,
    }
  }).catch(res=>{
    wx.showToast({title:"请求服务器数据异常",icon:'none'})
  });
}
const toast = (title,success)=>{
  wx.showToast({
    title: title,
    icon: success?'success':'none'
  })
}
//验证是否是手机号码
const vailPhone = (number)=> {
  let flag = false;
  let myreg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
  if (number.length != 11) {
    flag = flag;
  }else if (!myreg.test(number)) {
    flag = flag;
  }else{
    flag = true;
  }
  return flag;
}
// 收藏
const collects = (id,type,source_type)=>{
    let url = api.browseRecords;
    let data = {
        msg_id : id,
        type : type, //1-商品；2-店铺；3-案例；4-心得
        source_type : source_type, //	收藏1 浏览2
    };
    return request(url,'POST',data)
}
// 支付API
const weChatPay = (res)=>{
  wx.requestPayment({
    timeStamp: res.data.message.timestamp,
    nonceStr: res.data.message.nonceStr,
    package: res.data.message.package,
    signType: 'MD5',
    paySign: res.data.message.paySign,
    success:(res)=> {
        wx.redirectTo({
            url: './payMentSuccess'
        })
    },
    fail(res) { toast('已取消支付') }
  })
}
module.exports = {
    request,
    toast,
    vailPhone,
    collects,
    weChatPay
  }