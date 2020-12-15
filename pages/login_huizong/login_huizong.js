// pages/login/login.js
const url_microService = require('../../utils/config.js').url_microService;
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    no: '',
    pwd: ''
  },
	//  生命周期函数--监听页面加载
	onLoad: function (options) {
		// 判断用户名缓存是否存在,存在直接跳转到园区
		if(wx.getStorageSync('tjuser') !== ""){
			wx.navigateTo({
			  url: '../tongji/tongji',
			})
		}
	},
  formSubmit: function (e) {
		if(e.detail.value.no == "" || e.detail.value.pwd == ""){
			wx.showToast({
			  title: "用户名密码不能为空",
			  icon: 'none',
			  duration: 3000
			})
			return false
		}
    wx.showLoading({
      title: '登录中...',
    })
    console.log(e);
    wx.request({
      url: url_microService + '/adminInfo',
			method: 'POST',
      data: {
        acname: e.detail.value.no,
        apwd: e.detail.value.pwd
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
				console.log(res)
				if(res.data.success){
					wx.showToast({
					  title: "登录成功",
					  icon: 'success',
					  duration: 3000
					});
					wx.navigateTo({
					  url: '../tongji/tongji',
					})
					wx.setStorage({
						key: 'tjtype',
						data: '2'
					});
					wx.setStorage({
						key: 'tjuser',
						data: res.data.data.aadminId
					});
				}else{
					wx.showToast({
					  title: res.data.msg,
					  icon: 'none',
					  duration: 3000
					});
				}
      }
    })
  }
})