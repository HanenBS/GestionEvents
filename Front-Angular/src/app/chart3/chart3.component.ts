import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, PieController, LinearScale, CategoryScale, LineController, ChartOptions } from 'chart.js';
import { chartsdata3 } from 'src/Models/chartsdata3';
import { AnalyseService } from 'src/Services/analyse-service.service';

@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.css']
})
export class Chart3Component implements OnInit {
  chartData3?: chartsdata3[];
  Chart?: Chart<"pie", number[], string>;

  constructor(private An: AnalyseService) {}

  ngOnInit(): void {
    this.getData();
    this.renderChart();
  }

  getData() {
    this.An.get3().subscribe(
      (data) => {
        console.log(data.data);
        this.chartData3 = data.data;
        this.renderChart();
      }
    );
  }

  renderChart() {
    Chart.register(PieController, LinearScale, CategoryScale, LineController);

    if (this.Chart) {
      this.Chart.destroy();
    }

    if (this.chartData3 && this.chartData3.length > 0) {
      const labels = this.chartData3.map((item) => item['[Age Bands].[Age ID].[Age ID].[MEMBER_CAPTION]']);
      const sent = this.chartData3.map((item) => item['[Measures].[Nb Sent]']);
      const dispatched = this.chartData3.map((item) => item['[Measures].[Nb Dispatched]']);
      const delivered = this.chartData3.map((item) => item['[Measures].[Nb Deliv]']);

      const ctx = document.getElementById('myChart3') as HTMLCanvasElement;

      this.Chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sent',
              data: sent,
              backgroundColor: ['rgba(255, 0, 0, 1)', 'rgba(255, 255, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(255, 205, 86, 1)'],
            },
            {
              label: 'Dispatched',
              data: dispatched,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
              label: 'Delivered',
              data: delivered,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'right',
            },
          },
        } as ChartOptions<"pie">,
      });
    }
  }
}
