// pages/yuanquform/yuanquform.js
import WxValidate from '../../utils/WxValidate'
const url_microService = require('../../utils/config.js').url_microService;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    form: {
			// 排查总户数
			rhousehold: '',
      rcloseContact:'',
      rcure: '',
      rdeath:  '',
      rdiagnosis:  '',
      rpeople:  '',
      rremoveIsolation:  '',
      rsuspectyqusered:  '',
      rtreatment:  ''
		}

  },
	onLoad() {
		// 获取cookie
		this.getCookie();
		// 验证规则
		 this.initValidate();
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
			  duration: 3000
			})
		}
	},
	// 提示框
	showModal(error) {
		wx.showModal({
			content: error.msg,
			showCancel: false,
		})
	},
  	//表单提交
	formSubmit: function(e) {
		// 输入框赋值
		this.data.form.rhousehold = e.detail.value.rhousehold;
		this.data.form.rpeople = e.detail.value.rpeople;
		this.data.form.rsuspected = e.detail.value.rsuspected;
		this.data.form.rdiagnosis = e.detail.value.rdiagnosis;
		this.data.form.rdeath = e.detail.value.rdeath;
		this.data.form.rcure = e.detail.value.rcure;
		this.data.form.rtreatment = e.detail.value.rtreatment;
		this.data.form.rcloseContact = e.detail.value.rcloseContact;
		this.data.form.rremoveIsolation = e.detail.value.rremoveIsolation;

		
		// 表单提交校验
		const params = e.detail.value
		if (!this.WxValidate.checkForm(params)) {
			const error = this.WxValidate.errorList[0]
			this.showModal(error)
			return false
		}
		// 验证通过以后->
		wx.request({
			method: 'POST',
			url: url_microService + `/report/${this.data.yquser}`,
			header: {
				'Content-Type': 'application/json'
			},
      data: this.data.form,
			success: function(res) {
				if(res.data.success){
					console.log(res)
					wx.showToast({
					  title: '提交成功',
					  icon: 'success',
					  duration: 3000
					})
					wx.navigateTo({
					  url: '../../pages/index_yuanqu/index_yuanqu'
					})
				}else{
					wx.showToast({
					  title: '提交失败',
					  icon: 'none',
					  duration: 3000
					})
				}
			}
		})
		
	},
  //张艳雄
  initValidate() {
		// 验证字段的规则
		const rules = {
			rhousehold: {
				required: true,
				number: true
			},
      rpeople: {
				required: true,
				number: true
			},
			rsuspected: {
				required: true,
				number: true
			},
			rdiagnosis: {
				required: true,
				number: true,
      },
      rdeath: {
				required: true,
				number: true,
      },
      rcure: {
				required: true,
				number: true,
      },
      rtreatment: {
				required: true,
				number: true,
      },
      rcloseContact: {
				required: true,
				number: true,
      },
      rremoveIsolation: {
				required: true,
				number: true,
			},
		}
		// 验证字段的提示信息，若不传则调用默认的信息
		const messages = {
			rhousehold: {
				required: '请输入排查总户数',
				number: '排查总户数只能为数字'
			},
			rpeople: {
				required: '请输入排查总人数',
				number: '排查总人数只能为数字',
			},
      rsuspected: {
				required: '请输入疑似总数',
				number: '疑似总数只能为数字',
			},
			rdiagnosis: {
				required: '请输入确诊总数',
				number: '确诊总数只能为数字',
      },
      rdeath: {
				required: '请输入死亡人数',
				number: '死亡人数只能为数字',
      },
      rcure: {
				required: '请输入治愈人数',
				number: '治愈人数只能为数字',
      },
      rtreatment: {
				required: '请输入送医治疗人数',
				number: '送医治疗人数只能为数字',
      },
      rcloseContact: {
				required: '请输入密切接触者人数',
				number: '密切接触者人数只能为数字',
      },
      rremoveIsolation:{
				required: '请输入解除隔离人数',
				number: '解除隔离人数只能为数字',
      },
		}
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
})