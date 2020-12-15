// 时间选择引入
var dateTimePicker = require('../../utils/dateTimePicker.js');
const url_microService = require('../../utils/config.js').url_microService;
const app = getApp()
Page({
	data: {
		// 当前时间
		todaytime: '',
		// 当前时间分
		todaytimef: '',
		// 今日确诊
		todayrdiagnosis: 0,
		// 今日疑似
		todayrsuspected: 0,
		// 今日送医
		todayrtreatment: 0,
		// 今日死亡
		todayrdeath: 0,
		// 今日治愈
		todayrcure: 0,
		// 总确诊
		rdiagnosis: 0,
		// 总疑似
		rsuspected: 0,
		// 总送医
		rtreatment: 0,
		// 总死亡
		rdeath: 0,
		// 总治愈
		rcure: 0,
		// 排查
		rhousehold: 0,
		// 共计
		rpeople: 0,
		// 密切接触
		rcloseContact: 0,
		// 解除隔离
		rremoveIsolation: 0,

		// 近十日信息
		tenlist: []

	},
	onLoad() {
		// 获取cookie
		this.getCookie();
		// 获取当前时间
		this.getTime();
		// 获取某个园区每日上报信息汇总
		this.gettodaylist();
		// 获取某个园区所有上报信息汇总
		this.getalllist();
		// 获取近十日信息
		this.getTenlist();
	},
	// 获取cookie
	getCookie() {
		this.data.tjuser = wx.getStorageSync('tjuser');
		if (this.data.tjuser == '') {
			wx.redirectTo({
				url: '../login_huizong/login_huizong',
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
			todaytime: obj1.dateTimeArray[0][obj1.dateTime[0]] + '-' + obj1.dateTimeArray[1][obj1.dateTime[1]] + '-' + obj1.dateTimeArray[
				2][obj1.dateTime[2]] + ' ' + obj1.dateTimeArray[3][obj1.dateTime[3]] + '时',
			todaytimef: obj1.dateTimeArray[0][obj1.dateTime[0]] + '-' + obj1.dateTimeArray[1][obj1.dateTime[1]] + '-' + obj1
				.dateTimeArray[2][obj1.dateTime[2]] + ' ' + obj1.dateTimeArray[3][obj1.dateTime[3]] + ':' + obj1.dateTimeArray[
					4][obj1.dateTime[4]] + '分'
		});
	},
	// 获取每日上报信息
	gettodaylist() {
		var that = this;
		wx.request({
			url: url_microService + `/report/today/${this.data.tjuser}`,
			method: 'GET',
			success: function(res) {
				that.setData({
					todayrdiagnosis: res.data.data.rdiagnosis,
					todayrsuspected: res.data.data.rsuspected,
					todayrtreatment: res.data.data.rtreatment,
					todayrdeath: res.data.data.rdeath,
					todayrcure: res.data.data.rcure
				})
			}
		})
	},
	// 获取统计总信息
	getalllist() {
		var that = this;
		wx.request({
			url: url_microService + `/report/list/total/${this.data.tjuser}`,
			method: 'GET',
			success: function(res) {
				that.setData({
					rdiagnosis: res.data.data.rdiagnosis,
					rsuspected: res.data.data.rsuspected,
					rtreatment: res.data.data.rtreatment,
					rdeath: res.data.data.rdeath,
					rcure: res.data.data.rcure,
					rhousehold: res.data.data.rhousehold,
					rpeople: res.data.data.rpeople,
					rcloseContact: res.data.data.rcloseContact,
					rremoveIsolation: res.data.data.rremoveIsolation
				})
			}
		})
	},
	// 获取近十日信息
	getTenlist() {
		var that = this;
		wx.request({
			url: url_microService + `/report/list/recent/${this.data.tjuser}`,
			method: 'GET',
			success: function(res) {
				let dataList = res.data.data;
				dataList.forEach((item) => {
					item.rdate = item.rdate.substring(0, 10);
				})
				that.setData({
					tenlist: dataList
				})
			}
		})
	}
})
