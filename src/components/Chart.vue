<script>
import { Line } from "vue-chartjs";

export default {
  name: "Chart",
  extends: Line,
  props: ["chartdata", "options"],
  watch: {
    chartdata(newValue) {
      this.chartdata = newValue;
      this.renderChart(this.chartdata, this.options);
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
