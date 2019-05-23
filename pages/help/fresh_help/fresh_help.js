// pages/help/fresh_help/fresh_help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll: 0,
    helpPages: [{
      text: ['我们以一个素拓活动为例,此处只会介绍简单的功能,确保能让您迅速学会如何使用本小程序。','如需了解更多功能,请在我的->帮助页面查看。'],
      image:'http://mokis.top/open_imgs/task_flow/copyright.jpg'
    }, {
      text: ['首先在首页的顶端设有快捷操作条','点击+号即可添加一个任务流'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/index_op_bar.jpg'
    },
    {
      text: ['在创建任务流界面中填写必填字段','我们将创建一个为期9天的素拓活动，创建完成后点击完成按钮即可'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/create_task_flow.jpg'

    },
    {
      text: ['这时首页将会出现您刚刚创建的素拓活动任务流'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/index_with_taskflow.jpg'
    },
    {
      text: ['进入任务流面板,可以看到下方有操作栏。','现在我们添加一个统计参与素拓活动人数的子任务。'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/task_flow_tab.jpg'
    },
    {
      text: ['输入必填项，选择任务人为您自己，点击完成'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/create_task.jpg'
    },
    {
      text: ['之后任务流面板将会出现您刚刚创建的子任务'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/task_flow.jpg'
    },
    {
      text: ['点击可以查看子任务详情'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/task_detail.jpg'
    },
    {
      text: ['此时我们要邀请更多的成员来参加到素拓活动的准备中，点击任务流页面的加新成员按钮','将该任务流分享到您的微信群或者微信好友'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/add_new_member.jpg'
    },
    {
      text: ['好友参与进来后，你们就可以一同准备这个素拓活动了','简易教程到此为止,还有更多功能敬请探索！'],
      image:'http://mokis.top/open_imgs/task_flow/help/fresh_help/demo.jpg'
    },
  
  ]
  },
  swipperChage: function (e) {
    const idx = e.detail.current;
    this.setData({
      scroll: idx
    })
  },
  scrollSteps() {
    this.setData({
      scroll: this.data.scroll == 9 ? 0 : this.data.scroll + 1
    })
  }
})