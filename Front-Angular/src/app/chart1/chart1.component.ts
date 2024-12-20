import { Component, OnInit } from '@angular/core';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js/auto'; // Import correct modules
import { chartsdata3 } from 'src/Models/chartsdata3';
import { AnalyseService } from 'src/Services/analyse-service.service';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {
  chartData3?: chartsdata3[];
  chart?: Chart;

  constructor(private An: AnalyseService) { }

  selectedGender = 0;

  ngOnInit(): void {
    this.getData();
  }

  filter() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chartData3 = [];
    this.getData();
    this.renderChart();
  }

  getData() {
    this.An.get3().subscribe(
      (data) => {
        console.log(data.data);
        this.chartData3 = data.data;
        // Render the chart after fetching new data
        this.renderChart();
      }
    );
  }

  renderChart() {
    // Destroy the existing chart
    if (this.chart) {
      this.chart.destroy();
    }

    // Process data and render Chart.js chart
    if (this.chartData3) {
      const labels = this.chartData3.map(item => item['[Campaigns].[Campaign Name].[Campaign Name].[MEMBER_CAPTION]']);
      const sent = this.chartData3.map(item => item['[Measures].[Nb Sent]']);
      const dispatched = this.chartData3.map(item => item['[Measures].[Nb Dispatched]']);
      const delivered = this.chartData3.map(item => item['[Measures].[Nb Deliv]']);
      console.log(delivered);

      const ctx = document.getElementById('myChart1') as HTMLCanvasElement; // Correct canvas ID
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sent',
              data: sent,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
              label: 'Dispatched',
              data: dispatched,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Delivered',
              data: delivered,
              backgroundColor: 'rgba(155, 99, 132, 0.5)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'right',
            }
          }
        },
      });
    }
  }
}
