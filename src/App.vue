<template>
   <div class="chart-container">
    <IEcharts :option="option" resizable :styles="{width:'100%', height:'400px'}"/>
   </div>
</template>
<script>
import IEcharts from "vue-echarts-v3/src/full.js";
import io from "socket.io-client";
var socket = io.connect("http://localhost:4000");


export default {
  components:{
    IEcharts
  },
  data() {
    return {
        option : {
            title: {
                text: 'Line & Bar',
                subtext: 'Real Time Chart'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            legend: {
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: 'BarChart',
                data: [],
                type: 'bar'
            },
            {
                name: 'LineChart',
                data: [],
                type: 'line'
            }]
        }
    }
  },
  methods:{
    openSocketConnection(){
       socket.on('line1', (fetchedData, fetchedTime ) => {
          this.fillData(fetchedData,fetchedTime);
       })
       socket.on('line2', data => {
          this.lineData(data);
       })
    },
    fillData(data, time){
        if (this.option.series[0].data.length > 10){
           this.option.series[0].data.shift();
           this.option.xAxis.data.shift();
        }
        let newTime = new Date(time).toTimeString();
        let currentTime = newTime.split(" ")[0];
        this.option.series[0].data.push(data);
        this.option.xAxis.data.push(currentTime);
    },
    lineData(data){
        if (this.option.series[0].data.length > 10){
           this.option.series[1].data.shift();
        }
        this.option.series[1].data.push(data);
    }
  },
  mounted(){
    this.openSocketConnection();
  }

}
</script>
<style scoped>
  .chart-container{
    box-shadow: 10px 5px 10px #cecece;
    padding: 20px;
    margin: 60px 60px;
  }
</style>
