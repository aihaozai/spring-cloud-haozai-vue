<template>
  <div>
    <div v-for="(item,index) in fundData" :key="index" :id="item['fundCode']" style="height: 500px;width: 600px;">
    </div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
import axios from 'axios';
import service from '../config/service';
export default {
  name: 'index',
  mounted () {
    const __this = this;

    axios.get(service.SERVER_FUND + '/fund/fundReal/getFundRealData')
      .then(res => {
        const data = res.data.data;
        console.log(data);
        for (const obj in data) {
          __this.fundData.push({'fundCode': data[obj]['fundCode']})
        }
        this.$nextTick(function () {
          for (const obj in data) {
            const chart = new Chart({
              container: data[obj]['fundCode'],
              autoFit: true,
              height: 500,
              width: 600,
              display: 'inline'
            });

            chart.data(data[obj]['fundRealList']);
            chart.scale({
              'gztime': {
                nice: true
              },
              'gszzl': {
                nice: true
              }
            });
            // 格式化文字，超过长度添加省略号
            // chart.axis('gztime', {
            //   tickLine: null,
            //   label: {
            //     autoRotate: false,
            //     autoHide: false, // 取消自动隐藏label
            //     formatter (text) {
            //       // 字符太长添加省略号
            //       return text.length > 4 ? `${text.slice(0, 1)}` : text;
            //     }
            //   }
            // });
            chart.tooltip({
              showCrosshairs: true, // 展示 Tooltip 辅助线
              shared: true
            });

            chart.line().position('gztime*gszzl')

            chart.render();
          }
        })
      });
  },
  data () {
    return {
      fundData: [

      ]
    }
  }
}

</script>

<style scoped>

</style>
