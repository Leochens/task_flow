//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    isLogin: false,
    hasAuth: false,
    currentIndex: 0,
    navbarData: {
      showCapsule: 1,
      title: '我的主页'
    },
    height: app.globalData.height * 6,  
    completedTaskFlowList: [{
      "taskID": "000239",
      "taskName": "情人节活动",
      "leader": {
        "openID": "fjhegfakdbajksbfsjfhsvfafs",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
        "city": "Baoding",
        "country": "China",
        "gender": 1,
        "language": "zh_CN",
        "nickName": "Ryan Hardy",
        "province": "Hebei",
        "phoneNumber": "18332518328"
      },
      "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
      "isCompleted": true,
      "beginDate": "2019.2.5",
      "endDate": "2019.2.16",
      "members": [{
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        },
        {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        },
        {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        },
        {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        },
        {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        }
      ],
    }, {
      "taskID": "000239",
      "taskName": "情人节活动",
      "leader": {
        "openID": "fjhegfakdbajksbfsjfhsvfafs",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
        "city": "Baoding",
        "country": "China",
        "gender": 1,
        "language": "zh_CN",
        "nickName": "Ryan Hardy",
        "province": "Hebei",
        "phoneNumber": "18332518328"
      },
      "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
      "isCompleted": true,
      "beginDate": "2019.2.5",
      "endDate": "2019.2.16",
      "members": [{
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        },
        {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        },
        {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        },
        {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        },
        {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "nickName": "Ryan Hardy"
        }
      ],
    }, ],
    taskFlowList: [{
        "taskID": "000239",
        "taskName": "情人节活动",
        "leader": {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "city": "Baoding",
          "country": "China",
          "gender": 1,
          "language": "zh_CN",
          "nickName": "Ryan Hardy",
          "province": "Hebei",
          "phoneNumber": "18332518328"
        },
        "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
        "isCompleted": false,
        "beginDate": "2019.2.5",
        "endDate": "2019.2.16",
        "members": [{
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          }
        ],
      }, {
        "taskID": "000239",
        "taskName": "情人节活动",
        "leader": {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "city": "Baoding",
          "country": "China",
          "gender": 1,
          "language": "zh_CN",
          "nickName": "Ryan Hardy",
          "province": "Hebei",
          "phoneNumber": "18332518328"
        },
        "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
        "isCompleted": false,
        "beginDate": "2019.2.5",
        "endDate": "2019.2.16",
        "members": [{
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          }
        ],
      }, {
        "taskID": "000239",
        "taskName": "情人节活动",
        "leader": {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "city": "Baoding",
          "country": "China",
          "gender": 1,
          "language": "zh_CN",
          "nickName": "Ryan Hardy",
          "province": "Hebei",
          "phoneNumber": "18332518328"
        },
        "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
        "isCompleted": false,
        "beginDate": "2019.2.5",
        "endDate": "2019.2.16",
        "members": [{
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          }
        ],
      }, {
        "taskID": "000239",
        "taskName": "情人节活动",
        "leader": {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "city": "Baoding",
          "country": "China",
          "gender": 1,
          "language": "zh_CN",
          "nickName": "Ryan Hardy",
          "province": "Hebei",
          "phoneNumber": "18332518328"
        },
        "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
        "isCompleted": false,
        "beginDate": "2019.2.5",
        "endDate": "2019.2.16",
        "members": [{
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          }
        ],
      },
      {
        "taskID": "000239",
        "taskName": "情人节活动",
        "leader": {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "city": "Baoding",
          "country": "China",
          "gender": 1,
          "language": "zh_CN",
          "nickName": "Ryan Hardy",
          "province": "Hebei",
          "phoneNumber": "18332518328"
        },
        "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
        "isCompleted": false,
        "beginDate": "2019.2.5",
        "endDate": "2019.2.16",
        "members": [{
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          }
        ],
      },
      {
        "taskID": "000239",
        "taskName": "情人节活动",
        "leader": {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "city": "Baoding",
          "country": "China",
          "gender": 1,
          "language": "zh_CN",
          "nickName": "Ryan Hardy",
          "province": "Hebei",
          "phoneNumber": "18332518328"
        },
        "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
        "isCompleted": false,
        "beginDate": "2019.2.5",
        "endDate": "2019.2.16",
        "members": [{
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          }
        ],
      },
      {
        "taskID": "000239",
        "taskName": "情人节活动",
        "leader": {
          "openID": "fjhegfakdbajksbfsjfhsvfafs",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
          "city": "Baoding",
          "country": "China",
          "gender": 1,
          "language": "zh_CN",
          "nickName": "Ryan Hardy",
          "province": "Hebei",
          "phoneNumber": "18332518328"
        },
        "describe": "情人节就要到了，公司准备举办一个情人节活动，具体包括给公司的情侣送花…",
        "isCompleted": false,
        "beginDate": "2019.2.5",
        "endDate": "2019.2.16",
        "members": [{
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          },
          {
            "openID": "fjhegfakdbajksbfsjfhsvfafs",
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/nqMXuic5mkp7E1sqceEicZBG6UP2gSf6OlCVObTjUOao7UjuwGDuZIBdk7Derlk56ia743IzGFheNzwKOlVSqGquA/132",
            "nickName": "Ryan Hardy"
          }
        ],
      }
    ]
  },
  //swiper切换时会调用
  pagechange: function(e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  toTaskFlowDetail: function() {
    wx.navigateTo({
      url: '../task_flow/task_flow',
      success: function(res) {
        console.log(res);
      },
      fail: function(err) {
        console.log(err);
      }
    })
  },
  addNewTaskFlow: function() {
    wx.navigateTo({
      url: '../create_task_flow/create_task_flow'
    })
  },
  //用户点击tab时调用
  titleClick: function(e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  getSetting: function() {
    const that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.setData({
            hasAuth: true
          })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          that.setData({
            hasAuth: false
          })
        }
      }
    })
  },
  onShow: function() {

  },
  //事件处理函数
  onLoad: function() {
    this.getSetting();
    const hasAuth = wx.getStorageSync("HASAUTH");
    console.log(hasAuth);
    this.setData({
      hasAuth
    });
  },
  // 用户分享
  onShareAppMessage: function(res) {
    return {
      title: '任务流邀请',
      path: '/pages/test/test?taskID=t000223',
      success: function(res) {
        console.log("suc", res);
      },
      fail: function(res) {
        console.log("fai", res);

      }
    }
  }


})