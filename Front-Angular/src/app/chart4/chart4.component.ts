// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartConfiguration, BubbleController, LinearScale, CategoryScale } from 'chart.js';
// import { chartsdata4 } from 'src/Models/chartsdata4';
// import { AnalyseService } from 'src/Services/analyse-service.service';

// @Component({
//   selector: 'app-chart4',
//   templateUrl: './chart4.component.html',
//   styleUrls: ['./chart4.component.css']
// })
// // export class Chart4Component implements OnInit {
// //   chartData3?: chartsdata4[];
// //   Chart?: Chart<"bubble", { x: number; y: number; r: number; }[], string>;

// //   constructor(private An: AnalyseService) {}

//   // ngOnInit(): void {
//   //   this.getData();
//   // }

//   // // Function to fetch data from the service
//   // getData() {
//   //   this.An.get4().subscribe(
//   //     (data) => {
//   //       console.log(data.data);
//   //       this.chartData3 = data.data;
//   //       // Render the chart after fetching new data
//   //       this.renderChart();
//   //     }
//   //   );
//   // }

//   // Function to render the Chart.js chart
//   // renderChart() {
//   //   // Register necessary chart components (controllers and scales)
//   //   Chart.register(BubbleController, LinearScale, CategoryScale);

//   //   // Destroy the existing chart if it exists
//   //   if (this.Chart) {
//   //     this.Chart.destroy();
//   //   }

//   //   // Process data and render Chart.js chart if data is available
//   //   if (this.chartData3 && this.chartData3.length > 0) {
//   //     const labels = this.chartData3.map((item) => item['[Calendar].[Week].[Week].[MEMBER_CAPTION]']);
      
//   //     const dispatched = this.chartData3.map((item) => item['[Measures].[Nb Clicks]']);
//   //     const delivered = this.chartData3.map((item) => item['[Measures].[Nb Deliv]']);
//   //     const Delivery_Rate = this.chartData3.map((item) => item['[Measures].[Nb Views]']);

//   //     // Get the canvas element from the DOM
//   //     const ctx = document.getElementById('myChart') as HTMLCanvasElement;

//   //     // Create a new Chart instance with the specified type, data, and options
//   //     this.Chart = new Chart(ctx, {
//   //       type: 'bubble',
//   //       data: {
//   //         labels: labels,
//   //         datasets: [
//   //           {
//   //             label: 'Sent',
//   //             data: sent.map((value, index) => ({ x: index, y: value, r: dispatched[index] })),
//   //             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//   //           },
            
//   //           // Add more datasets as needed
//   //         ],
//   //       },
//   //       options: {
//   //         scales: {
//   //           x: {
//   //             type: 'category',
//   //             labels: labels,
//   //           },
//   //           y: {
//   //             beginAtZero: true,
//   //           },
//   //         },
//   //         // Add other chart options as needed
//   //       },
//   //     });
//   //   }
//   // }

