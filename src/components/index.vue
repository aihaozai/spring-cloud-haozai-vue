<template>
  <div id="c1"></div>
</template>

<script>
import { Chart } from '@antv/g2';
import axios from 'axios';
import service from '../config/service';
export default {
  name: 'index',
  mounted () {
    axios.get(service.SERVER_FUND + '/fund/fund/getDetailDataChart?fundCode=519674')
      .then(res => {
        const data = res.data.data['data_ACWorthTrend'];
        console.log(data);
        const chart = new Chart({
          container: 'c1',
          autoFit: true,
          height: 500
        });

        chart.data(data);
        chart.scale({
          0: {
            nice: true
          },
          1: {
            nice: true
          }
        });
        // 格式化文字，超过长度添加省略号
        chart.axis('0', {
          tickLine: null,
          label: {
            autoRotate: false,
            autoHide: false, // 取消自动隐藏label
            formatter (text) {
              // 字符太长添加省略号
              return text.length > 4 ? `${text.slice(0, 4)}...` : text;
            }
          }
        });
        chart.tooltip({
          showCrosshairs: true, // 展示 Tooltip 辅助线
          shared: true
        });

        chart.line().position('0*1')

        chart.render();
      });
  }
}

</script>

<style scoped>

</style>
