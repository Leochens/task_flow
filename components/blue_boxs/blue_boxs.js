// components/blueBoxs/blue_boxs.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas: {
      type: Array,
      observer: function (newVal, oldVal, changedPath) {
        //更新数据
        this.deal(newVal)
      }
    } // 每日操作量的集合 [{date:'2019-5-18',cnt:13}]
  },


  /**
   * 组件的初始数据
   */
  data: {
    color: ['#DAEAFD', '#7DA6D4', '#3A6EAA', '#214F84', '#2C4767']
  },
  ready: function () {
    const datas = this.properties.datas;
    this.deal(datas);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    deal: function (datas) {
      console.log("datas", datas)
      const cnts = datas.map(d => d.cnt); //获得数据数组
      console.log("cnts", cnts);
      let all = 0;
      let hasOp = 0;
      cnts.forEach(cnt => { if (cnt) { all += cnt; hasOp += 1 } });
      const weight_datas = datas.map(d => {
        const weight = d.cnt / all;
        return {
          ...d,
          // date
          weight
        }
      });
      const weights = weight_datas.slice();

      console.log("weight", weights); // 获得每个项的权重
      weights.sort(function (prev, cur) { // 降序
        return cur.weight - prev.weight;
      }); // 给权重数组进行排序 按照index来看
      // console.log("sort weights", weights);
      const threshold = parseInt(hasOp < this.data.color.length ? 1 : hasOp / this.data.color.length); // 颜色分层的阈值
      let iterator = 0; // 迭代器
      let colorLevel = this.data.color.length - 1; // 0 ~ color.length-1 依次加深
      // console.log("阈值,颜色等级", threshold, colorLevel);

      for (let i = 0; i < weights.length; i++) {// 按照阈值来进行层级划分 每达到一次阈值就使得颜色等级减一
        iterator++;
        // console.log(iterator, colorLevel);
        const item = weights[i];
        const res = { ...item, rank: i, colorLevel };
        weights[i] = res;
        if (iterator === threshold) { iterator = 0; colorLevel = item.cnt && colorLevel ? colorLevel - 1 : 0 };// 到达阈值请0 
      }
      // console.log("weights", weights)
      const res = datas.map(d => {
        const date = d.date;
        const weight = weights.filter(item => item.date === date).pop(); // 得到它级别
        const rank = weight.rank;
        const level = weight.colorLevel;
        return {
          ...d,
          rank,
          level
        }
      });
      this.setData({
        boxs: res
      })
      console.log("res", res); // 

    }
  }
})
