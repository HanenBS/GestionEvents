import { Component, OnInit } from '@angular/core';
import { Chart, DoughnutController, LinearScale, ArcElement, BubbleController, ChartOptions } from 'chart.js';
import { chartsdata2 } from 'src/Models/chartsdata2';
import { AnalyseService } from 'src/Services/analyse-service.service';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {
  chartData2?: chartsdata2[];
  Chart?: Chart<"doughnut", number[], string>;

  constructor(private An: AnalyseService) {}

  selectedAge = 0;

  ngOnInit(): void {
    this.getData(this.selectedAge);
    this.renderChart();
  }

  filter() {
    if (this.Chart) {
      this.Chart.destroy();
    }
    this.chartData2 = [];
    this.getData(this.selectedAge);
    this.renderChart();
  }

  getData(sent: any) {
    this.An.get2(sent).subscribe(
      (data) => {
        console.log(data.data);
        this.chartData2 = data.data;
        this.renderChart();
      }
    );
  }

  renderChart() {
    Chart.register(DoughnutController, LinearScale, ArcElement, BubbleController);

    if (this.Chart) {
      this.Chart.destroy();
    }

    if (this.chartData2 && this.chartData2.length > 0) {
      const labels = this.chartData2.map( (item) => item['[Campaigns].[Prj Mkg ID].[Prj Mkg ID].[MEMBER_CAPTION]']);
      const sent = this.chartData2.map((item) => item['[Measures].[Nb Sent]']);
      const dispatched = this.chartData2.map((item) => item['[Measures].[Nb Dispatched]']);
      const delivered = this.chartData2.map((item) => item['[Measures].[Nb Deliv]']);
      const Delivery_Rate = this.chartData2.map((item) => item['[Measures].[Delivery_Rate]']);

      const backgroundColors = [
        'rgba(54, 162, 235, 0.5)', // Sent
        'rgba(255, 99, 132, 0.5)', // Dispatched
        'rgba(255, 205, 86, 0.5)', // Delivered
        'rgba(155, 99, 132, 0.5)'  // Delivery_Rate
      ];

      const ctx = document.getElementById('myChart2') as HTMLCanvasElement;

      this.Chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sent',
              data: sent,
              backgroundColor: backgroundColors[0],
            },
            {
              label: 'Dispatched',
              data: dispatched,
              backgroundColor: backgroundColors[1],
            },
            {
              label: 'Delivered',
              data: delivered,
              backgroundColor: backgroundColors[2],
            },
            {
              label: 'Delivery_Rate',
              data: Delivery_Rate,
              backgroundColor: backgroundColors[3],
            },
          ],
        },
        options: {
          legend: {
            display: true,
            position: 'right',
          },
        } as ChartOptions<"doughnut">,
      });
    }
  }
}
