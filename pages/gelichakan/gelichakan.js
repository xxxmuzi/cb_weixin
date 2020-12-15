// 时间选择引入
const url_microService = require('../../utils/config.js').url_microService;
const app = getApp()
Page({
  data: {
		ybPicker: ['浐灞总办', '金融园办', '总部园办', "湿地园办", "鹿鸣湖园办", "商贸园办", "世园园办"]
  },
	onLoad(){
		this.getCookie();
		//回显用户信息
		this.getuserxinxi();
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
	cageChange(e) {
		wx.navigateTo({
			url: '../geliform/geliform',
		})
	},
	// 获取用户信息
	getuserxinxi() {
		var that = this;
		wx.request({
			url: url_microService + `/customerInfo/${this.data.cid}`,
			method: 'GET',
			success: function(res) {
				console.log(res)
				that.setData({
					'cname': res.data.data.cname,
					'cidcard': res.data.data.cidcard,
					'cadd': res.data.data.cadd,
					'caddq': res.data.data.caddq,
					'cage': res.data.data.cage,
					'ccCity': res.data.data.ccCity,
					'ccontact': res.data.data.ccontact,
					'cctime': res.data.data.cctime,
					'cgeneticHistory': res.data.data.cgeneticHistory,
					'chouseholdRegister': res.data.data.chouseholdRegister,
					'cisolationMode': res.data.data.cisolationMode,
					'cjjName': res.data.data.cjjName,
					'cjjTel': res.data.data.cjjTel,
					'cmechanism': res.data.data.cmechanism,
					'cmethod': res.data.data.cmethod,
					'copenId': res.data.data.copenId,
					'cpid': res.data.data.cpid,
					'cquarantineTime': res.data.data.cquarantineTime,
					'creasonsForIsolation': res.data.data.creasonsForIsolation,
					'cremarks': res.data.data.cremarks,
					'csid': res.data.data.csid,
					'csix': res.data.data.csix,
					'ctel': res.data.data.ctel,
					'cepidemic':res.data.data.cepidemic,
					'cecity': res.data.data.cecity,
					'cetime': res.data.data.cetime
				})
			},
			fail: function(res) {
				wx.showToast({
					title: "获取用户信息失败",
					icon: 'none',
					duration: 3000
				})
			}
		})
	}
})