const url_microService = require('../../utils/config.js').url_microService;
var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp()
Page({
	data: {
		type: '',
		phone: '',
		// 性别
		jrxb: '男',
		isnan: true,
		// 表单数据
		form:{
			cname: '',
			cidcard: ''
		},
		// input禁用状态
		isDisabled:false,
		ybindex: null,
		ybPicker: ['父母', '子女', '亲戚', '朋友', '保姆', '其他'],
		items: [{
				name: '1',
				value: '正常'
			},
			{
				name: '2',
				value: '持续干咳',
				checked: 'true'
			}
		],
		items1: [{
				name: '1',
				value: '正常'
			},
			{
				name: '2',
				value: '持续乏力',
				checked: 'true'
			}
		],
		items2: [{
				name: '1',
				value: '正常'
			},
			{
				name: '2',
				value: '持续呼吸困难',
				checked: 'true'
			}
		],
		// 既往史
		items3: [{
				name: '1',
				value: '高血压'
			},
			{
				name: '2',
				value: '糖尿病'
			},
			{
				name: '3',
				value: '冠心病'
			},
			{
				name: '4',
				value: '其他'
			}
		],
	},
	onLoad:function(){
		this.getCookie();
		var that = this;
		wx.request({
			url: url_microService + `/customerInfo/${this.data.cid}`,
			method:'GET',
			success: function(res) {
				that.setData({
					isDisabled: true,
					'form.cname': res.data.data.cname,
					'form.cidcard': res.data.data.cidcard
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
	// 添加家人
	showModal(e) {
	    this.setData({
	      modalName: e.currentTarget.dataset.target
	    })
	  },
	// 选择既往史
	checkChange4: function(e) {
		this.data.form.cgeneticHistory = e.detail.value
		this.data.form.cgeneticHistory = this.data.form.cgeneticHistory.toString()
		console.log(this.data.form.cgeneticHistory)
	},
	// 选择家人
	PickerChangeyb(e) {
		console.log(e);
		this.setData({
			ybindex: e.detail.value
		})
	},
	// 性别选择
	cageChange(e) {
		if (e.detail.value) {
			this.data.form.jrxb = "男"
		} else {
			this.data.form.jrxb = "女"
		}
		console.log(this.data.form.jrxb)
	},
	// 持续干咳
	checkChange1: function(e) {
		console.log(e.detail.value);
	},
	// 持续乏力
	checkChange2: function(e) {
		console.log(e.detail.value);
	},
	// 持续呼吸困难
	checkChange3: function(e) {
		console.log(e.detail.value);
	},
	//表单提交
	formSubmit: function (e) {
		var htemperature = e.detail.value.htemperature;
		if(htemperature==''){
			wx.showToast({
				title: '体温不能为空',
				icon:"none"
			})
			return false
		}
    wx.request({
      url: url_microService + `/healthy/${this.data.cid}`,
			method:'POST',
      data: {
				"htemperature": e.detail.value.htemperature,
				"hcough": e.detail.value.hcough,
				"hweak": e.detail.value.hweak,
				"hdyspnea": e.detail.value.hdyspnea
				// htemperature: parseInt(e.detail.value.htemperature),      
    //     hcough: parseInt(e.detail.value.hcough),
    //     hweak: parseInt(e.detail.value.hweak),
    //     hdyspnea: parseInt(e.detail.value.hdyspnea)
			},
      success: function (res) {
				wx.showToast({
					title: "提交成功",
					icon: 'success',
					duration: 3000
				})
				wx.navigateTo({
				  url: '../../pages/index/index'
				})
      }
    })
	},
	// 取消添加家人
	hideModal(e) {
		this.setData({
			modalName: null
		})
	},
	// 添加家人提交
	formSubmit1: function(e) {
		if(e.detail.value.jrname == ''){
			wx.showToast({
				title: "姓名不能为空",
				icon: 'none',
				duration: 3000
			})
			return false
		}
		if(e.detail.value.jrgx == null){
			wx.showToast({
				title: "请选择与本人关系",
				icon: 'none',
				duration: 3000
			})
			return false
		}
		if(e.detail.value.jrsfz == ''){
			wx.showToast({
				title: "请填写家人身份证",
				icon: 'none',
				duration: 3000
			})
			return false
		}else if(e.detail.value.jrsfz.length <= 17){
			wx.showToast({
				title: "身份证格式不正确",
				icon: 'none',
				duration: 3000
			})
			return false
		}
		if(e.detail.value.jrnl == ''){
			wx.showToast({
				title: "年龄不能为空",
				icon: 'none',
				duration: 3000
			})
			return false
		}
		wx.request({
		  url: url_microService + `/customerInfo/family/${this.data.cid}`,
			method:'POST',
		  data: {
				"cname": e.detail.value.jrname,
				"cEelationship": parseInt(e.detail.value.jrgx)+ 1,
				"cidcard": e.detail.value.jrsfz,
				"csix": this.data.jrxb,
				"cage": e.detail.value.jrnl,
				"cgeneticHistory": this.data.form.cgeneticHistory
			},
		  success: function (res) {
				if(res.data.success){
					wx.redirectTo({
						 url: '../../pages/jiankang/jiankang'
					})
					wx.showToast({
						title: "提交成功",
						icon: 'success',
						duration: 3000
					})
				}else{
					wx.showToast({
						title: "提交失败",
						icon: 'none',
						duration: 3000
					})
				}
		  }
		})
	}
})
