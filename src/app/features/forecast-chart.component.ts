import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-forecast-chart',
  standalone: true,
  template: `<canvas #chartCanvas></canvas>`,
})
export class ForecastChartComponent implements OnChanges {
  @Input() data: any;
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.renderChart();
    }
  }

  private renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const forecastList = this.data.list.slice(0, 3); // next 3 days

    const labels = forecastList.map((d: any) =>
      new Date(d.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    );

    const tempsMax = forecastList.map((d: any) => d.main.temp_max);
    const tempsMin = forecastList.map((d: any) => d.main.temp_min);

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Max Temp',
            data: tempsMax,
            borderColor: '#ff4d4f',
            backgroundColor: 'rgba(255, 77, 79, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointBackgroundColor: '#ff4d4f',
          },
          {
            label: 'Min Temp',
            data: tempsMin,
            borderColor: '#1890ff',
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 5,
            pointBackgroundColor: '#1890ff',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: {
            title: { display: true, text: 'Day' },
            type: 'category',
          },
          y: {
            title: { display: true, text: 'Temperature (°C)' },
            type: 'linear',
            beginAtZero: false,
          },
        },
      },
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }
}
