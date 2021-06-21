import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
    
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
    console.log("this.options",this.options);
    console.log("chartData", this.chartData);
  }
}