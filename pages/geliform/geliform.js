// 时间选择引入
var dateTimePicker = require('../../utils/dateTimePicker.js')
const url_microService = require('../../utils/config.js').url_microService;
// 验证规则引入
import WxValidate from '../../utils/WxValidate'

const app = getApp()

Page({
	data: {
		isnan: true,
		ybPicker: ['浐灞总办', '金融园办', '总部园办', "湿地园办", "鹿鸣湖园办", "商贸园办", "世园园办"],
		lxindex: null,
		lxPicker: ['集中隔离', '居家隔离'],
		items: [{
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
		region: ['广东省', '广州市', '海珠区'],
		modalName: null,
		// 定义时间
		dateTime1: null,
		dateTimeArray1: null,
		dateTime2: null,
		dateTimeArray2: null,
		dateTime3: null,
		dateTimeArray3: null,
		// 获取当前时间
		gettime: '',
		// 定义form数据
		form: {
			// 家庭地址
			cadd: '',
			// 自我隔离地址
			caddq: '',
			// 年龄
			cage: '',
			//接触地点
			ccCity: '',
			// 是否接触病患
			ccontact: '1',
			// 接触时间
			cctime: '',
			// 出行地
			cecity: '',
			// 主号id
			ceelationship: '',
			//是否去过疫区（1没有  2有）
			cepidemic: '1',
			//返回时间
			cetime: '',
			//既往史数据类型2 关联数据字典数据 以，分割
			cgeneticHistory: '',
			//户籍
			chouseholdRegister: '',
			//客户标识
			cid: '',
			//身份证号
			cidcard: '',
			// 身份证照
			cidcardIMG: '',
			//隔离方式（1集中隔离  2居家隔离）
			cisolationMode: '',
			//紧急联系人
			cjjName: '',
			//紧急联系方式
			cjjTel: '',
			//隔离地精度
			clatitude: '',
			//隔离地纬度
			clongitude: '',
			//所属单位
			cmechanism: '',
			//返回方式
			cmethod: '',
			//姓名
			cname: '',
			//微信openId
			copenId: '',
			//所属园办编号
			cpid: '',
			//自我隔离起始日期
			cquarantineTime: '',
			//隔离原因
			creasonsForIsolation: '',
			//备注
			cremarks: '',
			//用户状态（默认为1 隔离状态 2为解除隔离）
			csid: '',
			//性别
			csix: '',
			//联系方式
			ctel: ''
		}
	},
	onLoad: function(options) {
		this.getCookie();
		// 获取时间
		this.getTimeDate();
		// 性别
		if (this.data.isnan) {
			this.data.form.csix = '男'
		} else {
			this.data.form.csix = '女'
		};
		// 验证
		this.initValidate();
	},
	// 获取cookie
	getCookie() {
		this.data.cid = wx.getStorageSync('cid');
		this.data.tel = wx.getStorageSync('username');
		this.setData({
			"form.ctel": this.data.tel
		})
		console.log(this.data.cid)
		if (this.data.cid === 0) {
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
	// h获取时间
	getTimeDate() {
		let that = this;

		// 获取完整的年月日 时分秒，以及默认显示的数组
		var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
		var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
		// 精确到分的处理，将数组的秒去掉
		//var lastArray = obj1.dateTimeArray.pop();
		//var lastTime = obj1.dateTime.pop();
		this.setData({
			dateTime1: obj1.dateTime,
			dateTimeArray1: obj1.dateTimeArray,
			dateTime2: obj1.dateTime,
			dateTimeArray2: obj1.dateTimeArray,
			dateTime3: obj1.dateTime,
			dateTimeArray3: obj1.dateTimeArray,

			gettime: obj1.dateTimeArray[0][obj1.dateTime[0]] + '-' + obj1.dateTimeArray[1][obj1.dateTime[1]] + '-' + obj1.dateTimeArray[
				2][obj1.dateTime[2]] + ' ' + obj1.dateTimeArray[3][obj1.dateTime[3]] + ':' + obj1.dateTimeArray[4][obj1.dateTime[
				4]] + ':' + obj1.dateTimeArray[5][obj1.dateTime[5]]
		});
	},
	// 隔离日期
	changeDateTime1(e) {
		this.setData({
			dateTime1: e.detail.value
		});
	},
	changeDateTimeColumn1(e) {
		var arr = this.data.dateTime1,
			dateArr = this.data.dateTimeArray1;

		arr[e.detail.column] = e.detail.value;
		dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
		this.data.form.cquarantineTime = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' +
			dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]] + ':' + dateArr[5][arr[5]]
		console.log(this.data.form.cquarantineTime)
	},
	// 返回时间
	changeDateTime2(e) {
		this.setData({
			dateTime2: e.detail.value
		});
	},
	changeDateTimeColumn2(e) {
		var arr = this.data.dateTime2,
			dateArr = this.data.dateTimeArray2;

		arr[e.detail.column] = e.detail.value;
		dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
		this.data.form.cetime = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3]
			[arr[3]] + ':' + dateArr[4][arr[4]] + ':' + dateArr[5][arr[5]]
	},
	// 接触时间
	changeDateTime3(e) {
		this.setData({
			dateTime3: e.detail.value
		});
	},
	changeDateTimeColumn3(e) {
		var arr = this.data.dateTime3,
			dateArr = this.data.dateTimeArray3;

		arr[e.detail.column] = e.detail.value;
		dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
		this.data.form.cctime = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3]
			[arr[3]] + ':' + dateArr[4][arr[4]] + ':' + dateArr[5][arr[5]]
	},
	// 性别选择
	cageChange(e) {
		if (e.detail.value) {
			this.data.form.csix = '男'
		} else {
			this.data.form.csix = '女'
		}
	},
	// 所属园办
	PickerChangeyb(e) {
		this.setData({
			ybindex: e.detail.value,
		})
		this.data.form.cpid = parseInt(e.detail.value) + 1
	},

	// 隔离类型
	PickerChangelx(e) {
		this.setData({
			lxindex: e.detail.value,
			isnum2: parseInt(e.detail.value) + 1
		})
		this.data.form.cisolationMode = this.data.lxPicker[parseInt(e.detail.value)]
	},

	// 选择既往史
	checkChange: function(e) {
		this.data.form.cgeneticHistory = e.detail.value
		this.data.form.cgeneticHistory = this.data.form.cgeneticHistory.toString()
		console.log(this.data.form.cgeneticHistory)
	},
	// 选择户籍
	RegionChange: function(e) {
		this.setData({
			region: e.detail.value,
			"form.chouseholdRegister": e.detail.value
		})
		this.data.form.chouseholdRegister = e.detail.value
		this.data.form.chouseholdRegister = this.data.form.chouseholdRegister.toString()
		console.log(this.data.form.chouseholdRegister)
	},


	// 是否疫区
	switch1Change(e) {
		this.setData({
			shows: e.detail.value
		})
		if (e.detail.value) {
			this.data.form.cepidemic = 2
		} else {
			this.data.form.cepidemic = 1
		}
		console.log(this.data.form.cepidemic)
	},
	// 是否接触病患
	switch2Change(e) {
		this.setData({
			shows1: e.detail.value
		});
		if (e.detail.value) {
			this.data.form.ccontact = 2
		} else {
			this.data.form.ccontact = 1
		}
		console.log(this.data.form.ccontact)
	},
	handleInputChange(e) {
		// 取出定义的变量名
		console.log(e.currentTarget.dataset.modal);
		let targetData = e.currentTarget.dataset.modal;
		// 取出定义的变量名
		let currentValue = e.detail.value;
		// 将 input 值赋值给 定义的变量名，this.name 可以直接取到在 data 中定义的 name 值，其效果跟 this[变量名] 是对等的，这是 js 基础
		this[targetData] = currentValue;
		console.log(currentValue);
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
		this.data.form.cname = e.detail.value.cname;
		this.data.form.cidcard = e.detail.value.cidcard;
		this.data.form.cage = e.detail.value.cage;
		this.data.form.ctel = e.detail.value.ctel;
		this.data.form.cjjName = e.detail.value.cjjName;
		this.data.form.cjjTel = e.detail.value.cjjTel;
		this.data.form.cmechanism = e.detail.value.cmechanism;
		this.data.form.cadd = e.detail.value.cadd;
		this.data.form.creasonsForIsolation = e.detail.value.creasonsForIsolation;
		this.data.form.caddq = e.detail.value.caddq;
		this.data.form.cecity = e.detail.value.cecity;
		this.data.form.cmethod = e.detail.value.cmethod;
		this.data.form.ccCity = e.detail.value.ccCity;
		this.data.form.cremarks = e.detail.value.cremarks;

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
			url: url_microService + `/customerInfo/${this.data.cid}`,
			header: {
				'Content-Type': 'application/json'
			},
			data: this.data.form,
			success: function(res) {
				console.log(res)
				if (res.data.success) {
					wx.setStorage({
						data: res.data.data.cid,
						key: 'cid',
					})
					wx.showToast({
						title: '提交成功',
						icon: 'success',
						duration: 2000
					})
					wx.navigateTo({
						url: '../../pages/index/index'
					})
				}
			}
		})

	},
	initValidate() {
		// 验证字段的规则
		const rules = {
			cname: {
				required: true,
				rangelength: [2, 4]
			},
			cidcard: {
				required: true,
				idcard: true,
			},
			cage: {
				required: true,
				number: true
			},
			ctel: {
				required: true,
				tel: true,
			},
		}
		// 验证字段的提示信息，若不传则调用默认的信息
		const messages = {
			cname: {
				required: '请输入姓名',
				rangelength: '姓名只能为2-4个汉字'
			},
			cidcard: {
				required: '请输入身份证号码',
				idcard: '请输入正确的身份证号码'
			},
			cage: {
				required: '请输入年龄',
				number: '年龄只能为数字'
			},
			ctel: {
				required: '请输入手机号',
				tel: '请输入正确的手机号'
			}
		}
		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	}
})
