// pages/login/login.js
const url_microService = require('../../utils/config.js').url_microService;
const app = getApp()
Page({
  data: {
    username: '',
    password: ''
  },
	 // 生命周期函数--监听页面加载
	onLoad: function (options) {
		// 记住账户名密码
		this.setData({
			username: wx.getStorageSync('username'),
			password: wx.getStorageSync('password')
		})
	},
  formSubmit: function (e) {
		if(e.detail.value.username.length == "" || e.detail.value.password == ""){
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
    wx.request({
      url: url_microService + '/user', //仅为示例，并非真实的接口地址
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
     
        if (res.statusCode == 200) {
          if (res.data.success == true) {
						wx.showToast({
						  title: "登录成功",
						  icon: 'success',
						  duration: 3000
						});
						wx.setStorage({
								key: 'type',
								data: '0'
							});
						wx.setStorage({
								key: 'username',
								data: e.detail.value.username
							});
						wx.setStorage({
								key: 'password',
								data: e.detail.value.password
							});
						wx.setStorage({
								key: 'cid',
								data: res.data.data.id
							});
							console.log(wx.getStorageSync('cid'))
            if (wx.getStorageSync('cid') === 0) {
              wx.navigateTo({
                url: '../geliform/geliform',
              })
            } else if (wx.getStorageSync('cid') >= 0){
              wx.navigateTo({
                url: '../index/index',
              })
            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: '服务器出现错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})