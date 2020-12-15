var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const url_microService = require('../../utils/config.js').url_microService;
var qqmapsdk;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    province: '',
    // city: '',
    // district: '',
    // street_number: '',
    formatted_addresses: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		// 页面加载,获取cookie
		this.getCookie();
    qqmapsdk = new QQMapWX({
      key: '3RRBZ-ES2CO-QNVW7-SYYON-WIOQ6-6SBYO' //这里自己的key秘钥进行填充
    });
    this.getUserLocation()
  },
	// 获取cookie
	getCookie() {
		this.data.cid = wx.getStorageSync('cid');
		console.log(this.data.cid)
		if (this.data.cid === 0) {
			wx.redirectTo({
				url: '../geliform/geliform',
			})
			wx.showToast({
				title: "新用户请先填报个人信息",
				icon: 'none',
				duration: 3000
			})
		}
		else if (this.data.cid == '') {
			wx.navigateTo({
				url: '../login/login',
			})
			wx.showToast({
				title: "登录失效,请重新登录",
				icon: 'none',
				duration: 3000
			})
		}
	},
	//地图定位
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },

  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
		wx.showLoading({
			title: '正在获取位置...',
		});
    setInterval(() =>{
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
					wx.hideLoading();
          console.log(JSON.stringify(res))
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy;
          vm.getLocal(latitude, longitude)
        },
        fail: function(res) {
          console.log('fail' + JSON.stringify(res))
        }
      })
    }, 10000)
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        console.log(res);
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
					formatted_addresses: res.result.formatted_addresses.recommend,
          province: province,
          city: city, //城市
          district: res.result.address_component.district,
          street_number: res.result.address_component.street_number,
          latitude: latitude,
          longitude: longitude
        })
        console.log(vm.data.formatted_addresses.formatted_addresses)
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },

  //表单提交
  formSubmit: function(e) {
    console.log('form发生了submit事件，提交数据：', this.data.address)
		// console.log('form发生了submit事件，提交数据：', 	'隔离时间' + this.data.gelitime, '返回时间' + this.data.fanhuitime, '接触时间' + this.data.jiechutime)
		wx.request({
			url: url_microService + `/position/${this.data.type}/${this.data.phone}`,
			data: {
        'plongitude': this.data.longitude,
        'platitude': this.data.latitude,
				'paddData': this.data.address
			},

			method: 'POST',
			header: {
        'Content-Type': 'application/json',
        'cookie': wx.getStorageSync("sessionid")
			},
			success: function(res) {
				wx.showToast({
				  title: "上传成功",
				  icon: 'success',
				  duration: 3000
				});
				wx.navigateTo({
				  url: '../index/index',
				});
			}
		})

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})