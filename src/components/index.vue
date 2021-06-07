<template>
  <div class="block">
    <div class="centered">
      <div v-for="(item,index) in fundData" :key="index" :id="item['fundCode']" class="fundChart">
        <div class="fundChartName">{{item['fundName']}}（{{item['fundCode']}}）</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
import axios from 'axios';
import service from '../config/service';
import '@/assets/css/index.css'
export default {
  name: 'index',
  mounted () {
    const __this = this;

    axios.get(service.SERVER_FUND + '/fund/fundReal/getFundRealData')
      .then(res => {
        const data = res.data.data;
        for (const obj in data) {
          __this.fundData.push({'fundCode': data[obj]['fundCode'], 'fundName': data[obj]['fundName']})
        }
        this.$nextTick(function () {
          for (const obj in data) {
            const chart = new Chart({
              container: data[obj]['fundCode'],
              autoFit: true,
              height: 500,
              width: 600,
              padding: [20, 20, 95, 80],
              theme: 'dark'
            });

            chart.data(data[obj]['fundRealList']);
            chart.scale({
              'gztime': {
                tickCount: 10
              },
              'gszzl': {
                tickCount: 10
              }
            });

            chart.axis('gztime', {
              tickLine: null,
              label: {
                autoRotate: false,
                autoHide: false, // 取消自动隐藏label
                formatter (text) {
                  // 字符太长添加省略号
                  return `${text.slice(10, text.length)}`;
                }
              }
            });
            // 配置自定义tooltip
            chart.tooltip({
              showContent: true,
              showTitle: true,
              containerTpl: '<div class="g2-tooltip"><div class="g2-tooltip-title"></div><div class="g2-tooltip-list"></div></div>',
              itemTpl: '<div class="g2-tooltip-item">' +
                '<div class="g2-tooltip-marker"></div>' +
                '<div class="g2-tooltip-name" style="margin-bottom: 15px">估算涨跌百分比：{b}</div>' +
                '<div class="g2-tooltip-value"></div>' +
                '</div>'
            });
            chart.line().position('gztime*gszzl').tooltip('gztime*gszzl', (a, b) => {
              return {a, b}
            });
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

<style scoped="scoped">
</style>
