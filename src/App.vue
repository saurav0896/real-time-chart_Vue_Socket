<template>
   <v-container>
     <v-row>
       <v-col cols="6">
          <v-card class="elevation-1">
              <IEcharts :option="option" resizable :styles="{width:'80%', height:'400px'}" />
          </v-card>
       </v-col>
       <v-col cols="6">
          <v-card class="elevation-1">
              <IEcharts :option="option2" resizable :styles="{width:'80%', height:'400px'}" />
          </v-card>
       </v-col>
     </v-row>
   </v-container>
</template>
    
<script>
import IEcharts from "vue-echarts-v3/src/full.js";
import io from "socket.io-client";
var socket = io.connect("http://localhost:4000");
    
export default {
  components: {
    IEcharts
  },
  data() {
    return {
      option : {
          xAxis: {
              type: 'category',
              data: []
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [],
              type: 'bar'
          },
          {
              data: [],
              type: 'line'
          }]
      },
      option2 : {
          xAxis: {
              type: 'category',
              data: []
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [],
              type: 'line'
          },
          {
              data: [],
              type: 'line'
          }]
      }
    };
  },
  methods: {
    openSocketListeners(){
      socket.on("line1", (fetchedData, fetchTime)  => {
        console.log("fetch", fetchedData, fetchTime);
        this.fillData(fetchedData, fetchTime) 
      }),
      socket.on("line2", data => {
        this.line2Data(data) 
      })
    },
    line2Data(data){
      if( this.option.series[1].data.length > 10){
        this.option.series[1].data.shift();
        this.option2.series[1].data.shift();
      } 
      this.option.series[1].data.push(data);
      this.option2.series[1].data.push(data);
    },
    fillData(data, time){
       if( this.option.series[0].data.length > 10){
            this.option.series[0].data.shift();
            this.option2.series[0].data.shift();
            this.option.xAxis.data.shift();
            this.option2.xAxis.data.shift();
       }
       this.option.series[0].data.push(data);
       this.option2.series[0].data.push(data);
       let newTime = new Date(time).toTimeString();
       let currentTime = newTime.split(" ")[0];
       this.option.xAxis.data.push(currentTime);
       this.option2.xAxis.data.push(currentTime);
    }
  },
  mounted(){
    this.openSocketListeners();
  }
  
};
</script>
<style>

</style>
