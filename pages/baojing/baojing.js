// 时间选择引入
var dateTimePicker = require('../../utils/dateTimePicker.js');
const url_microService = require('../../utils/config.js').url_microService;
const app = getApp()
Page({
	// 初始化数据
	data: {
		// 园办标题
		pageTitle: '空标题',

		// 应上报人数
		shangbaonum: 0,
		// 未上报位置数量人数
		weizhinum: 0,
		// 未上报健康人员数量
		jiankangnum: 0,
		// 健康异常人员数量
		yichangnum: 0,

		// 未上报位置当前第几页
		total: 1,
		// 未上报位置每页显示多少条
		sizenum: 10,
		// 未上报位置人员信息
		weizhilist: [],
		
		// 未上报健康第几页
		totaljk: 1,
		// 未上报健康信息页显示多少条
		sizenumjk: 10,
		// 未上报健康人员信息
		jiankanglist: [],
		
		// 健康异常第几页
		totalyc: 1,
		// 健康异常信息页显示多少条
		sizenumyc: 10,
		// 健康异常人员信息
		yichanglist: [],

		// 当前时间
		todaytime: 0,

		showIndex: 0,
		showIndexjk: 0,
		showIndexyc: 0
	},
	// 页,面加载
	onLoad() {
		// 获取cookie
		this.getCookie();
		// 获取园办分类
		this.getPageTitle();
		// 获取未上报位置人员数量
		this.getweizhinum();
		// 获取未上报健康数量
		this.getjiankangnum();
		// 获取健康异常人
		this.getyichangnum();
		// 获取未上报位置隔离人员信息
		this.getshangbaocon();
		// 获取未上报健康人员信息
		this.getjiankangcon();
		// 获取健康异常人员信息
		this.getyichangcon();
		// 获取当前时间
		this.getTime();
	},
	// 获取cookie
	getCookie() {
		this.data.yquser = wx.getStorageSync('yquser');
		if(this.data.yquser == ''){
			wx.navigateTo({
			  url: '../login_yuanqu/login_yuanqu',
			})
			wx.showToast({
			  title: "登录失效,请重新登录",
			  icon: 'none',
			  duration: 5000
			})
		}
	},
	// 获取当前时间
	getTime() {
		let that = this;
		// 获取完整的年月日 时分秒，以及默认显示的数组
		var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
		var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
		that.setData({
			todaytime: obj1.dateTimeArray[0][obj1.dateTime[0]] + '-' + obj1.dateTimeArray[1][obj1.dateTime[1]] + '-' + obj1.dateTimeArray[2][obj1.dateTime[2]] + ' ' + obj1.dateTimeArray[3][obj1.dateTime[3]] + '时'
		});
	},
	// 获取应上报上报数量
	getPageTitle() {
		var that= this;
		wx.request({
			url: url_microService + `/customerInfo/count/${this.data.yquser}`,
			method:'GET',
			success: function(res) {
				that.setData({
					pageTitle: res.data.data.pname,
					shangbaonum: res.data.data.count
				})
			}
		})
	},
	// 获取未上报位置人员数量
	getweizhinum() {
		var that= this;
		wx.request({
			url: url_microService + `/customerInfo/count/noPosition/${this.data.yquser}`,
			method:'GET',
			success: function(res) {
				that.setData({
					weizhinum: res.data.data.count
				})
			}
		})
	},
	// 获取未上报健康人员数量
	getjiankangnum() {
		var that= this;
		wx.request({
			url: url_microService + `/customerInfo/count/noHealthy/${this.data.yquser}`,
			method:'GET',
			success: function(res) {
				that.setData({
					jiankangnum: res.data.data.count
				})
			}
		})
	},
	// 获取健康异常人员数量
	getyichangnum() {
		var that= this;
		wx.request({
			url: url_microService + `/customerInfo/count/exception/${this.data.yquser}`,
			method:'GET',
			success: function(res) {
				that.setData({
					yichangnum: res.data.data.count
				})
			}
		})
	},
	// 获取未上报位置隔离人员信息-----------------------------------
	getshangbaocon() {
		var that= this;
		wx.request({
			url: url_microService + `/customerInfo/noPosition/${this.data.yquser}/${this.data.total}/${this.data.sizenum}`,
			method:'GET',
			success: function(res) {
				that.setData({
					weizhilist: res.data.data.records
				})
			}
		})
	},

	// 未上报位置每页显示多少条
	changeSizeWz(e) {
		this.setData({
			sizenum: e.detail.value
		})
		this.getshangbaocon();
	},
	// 未上报位置加页码
	addtotal(){
		let addnum = this.data.total+1
		this.setData({
			total: addnum
		})
		this.getshangbaocon();
		console.log(this.data.total)
	},
	// 未上报位置减页码
	subtotal(){
		let subnum = this.data.total-1
		this.setData({
			total: subnum
		})
		this.getshangbaocon();
		console.log(this.data.total)
	},
	// 展开未上报位置
	panel: function(e) {
		console.log(e)
		if (e.currentTarget.dataset.index != this.data.showIndex) {
			this.setData({
				showIndex: e.currentTarget.dataset.index
			})
		} else {
			this.setData({
				showIndex: 0
			})
		}
	},
	// 获取未上报健康人员信息---------------------------------------------------
	getjiankangcon() {
		var that= this;
		wx.request({
			url: url_microService + `/customerInfo/noHealthy/${this.data.yquser}/${this.data.total}/${this.data.sizenum}`,
			method:'GET',
			success: function(res) {
				that.setData({
					jiankanglist: res.data.data.records
				})
			}
		})
	},
	// 未上报健康每页显示多少条
	changeSizeJk(e) {
		this.setData({
			sizenumjk: e.detail.value
		})
		this.getjiankangcon();
	},
	// 未上报健康加页码
	addtotaljk(){
		let addnum = this.data.totaljk+1
		this.setData({
			totaljk: addnum
		})
		this.getjiankangcon();
		console.log(this.data.totaljk)
	},
	// 未上报健康减页码
	subtotaljk(){
		let subnum = this.data.totaljk-1
		this.setData({
			totaljk: subnum
		})
		this.getjiankangcon();
		console.log(this.data.totaljk)
	},
	// 展开未上报健康数据
	paneljk: function(e) {
		console.log(e)
		if (e.currentTarget.dataset.index != this.data.showIndexjk) {
			this.setData({
				showIndexjk: e.currentTarget.dataset.index
			})
		} else {
			this.setData({
				showIndexjk: 0
			})
		}
	},
	// 获取健康数据异常人员信息----------------------------------------------
	getyichangcon() {
		var that= this;
		wx.request({
			url: url_microService + `/customerInfo/exception/${this.data.yquser}/${this.data.total}/${this.data.sizenum}`,
			method:'GET',
			success: function(res) {
				that.setData({
					yichanglist: res.data.data.records
				})
			}
		})
	},
	// 健康异常信息每页显示多少条
	changeSizeYc(e) {
		this.setData({
			sizenumyc: e.detail.value
		})
		this.getyichangcon();
	},
	// 健康异常信息加页码
	addtotalYc(){
		let addnum = this.data.totalyc+1
		this.setData({
			totalyc: addnum
		})
		this.getyichangcon();
		console.log(this.data.totalyc)
	},
	// 健康异常信息减页码
	subtotalYc(){
		let subnum = this.data.totalyc-1
		this.setData({
			totalyc: subnum
		})
		this.getyichangcon();
		console.log(this.data.totalyc)
	},
	// 展开健康数据异常
	panelyc: function(e) {
		if (e.currentTarget.dataset.index != this.data.showIndexyc) {
			this.setData({
				showIndexyc: e.currentTarget.dataset.index
			})
		} else {
			this.setData({
				showIndexyc: 0
			})
		}
	}
})
