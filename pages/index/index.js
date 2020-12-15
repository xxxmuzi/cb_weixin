// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
//   GetName:function(){
//   wx.setStorage({
//     key: 'cookie',
//     data: result.header["Set-Cookie"], // 从返回数据的响应头中取cookie
//     success: (result)=>{
//         wx.navigateTo({
//             url: '../jiankang/jiankang'
//         })
//     }
// })

// wx.getStorage({
//   key: 'cookie',
//   success: (cookie)=>{
//     wx.request({
//       url: 'http://6m9e74.natappfree.cc/customerInfo',
//       data: {},
//       header: {
//         'content-type':'application/json',
//         'cookie': cookie.data // 设置cookie
//       },
//       method: 'GET',
//       dataType: 'json',
//       responseType: 'text',
//       success: (result)=>{
//         console.log(result.data)
//       },
//       fail: () => {
//         console.log("失败")
//       },
//     })
//   }
// })
// },

  // 表单提交
  // GetName: function(e) {
  //   // console.log('form发生了submit事件，提交数据：', e.detail.value)
  //   wx.request({
  //     url: 'http://6m9e74.natappfree.cc/customerInfo',
  //     data: {},
      
  //     method:'GET',
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       console.log("返回的结果" + JSON.stringify(res.data))
  //     },
  //     fail: function(res) {
  //       console.log("失败！")
  //     },
  //   })
  // },

  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})