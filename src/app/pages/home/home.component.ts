import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {filter} from "rxjs";
import Chart from 'chart.js/auto';
import {Metadata, Olympic,} from "../../models/olympic.model";
import {ApiService} from "../../shared/service/api.service";
import {HeaderService} from "../../shared/service/header.service";

interface DataSetPie {
  country: string,
  sumOfMedals: number,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public metadata : Metadata = {
    title: 'Medals per Country',
    indicators: [
      {
        type: 'numOfCountries',
        label: 'Number of countries',
        value: 0
      },
      {
        type: 'numOfJOs',
        label: 'Number of JOs',
        value: 0
      }
    ]
  }
  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!: string

  private _apiService = inject(ApiService);
  private _router = inject(Router);
  private _headerService = inject(HeaderService);

  ngOnInit() {
    //get data olympic
    this._apiService.getOlympicData().pipe(
      filter((data) => {
        if (!data || data.length < 1) {
          this._router.navigateByUrl('not-found');
          return false;
        }
        return true;
      })
    ).subscribe({
        next: (data) => {
          this.totalJOs = this._getTotalOlympicYears(data);
          console.log('total jos: ', this.totalJOs);

          this.metadata.indicators.forEach(item => {
            if (item.type === 'numOfCountries') item.value = data.length;
            if (item.type === 'numOfJOs') item.value = this.totalJOs;
          });
          this._headerService.setMetadata(this.metadata);

          this.totalCountries = data.length;
          this.buildPieChart(this._createDataSetForPie(data));
        },
        error: (err) => {
          console.log('error: ', err)
        }
      }
    );
    console.log('metadata: ', this.metadata)
  }

  private _getTotalOlympicYears(data: Olympic[]): number {
    const setYear = new Set(data
      .map((d) => d.participations.map((p: any) => p.year))
      .flat());
    return Array.from(setYear).length;
  }

  private _createDataSetForPie(data: Olympic[]): DataSetPie[] | [] {
    if (!data || data.length < 1) {
      console.log('no data set');
      return []
    }
    return data.map((d) => ({
      country: d.country,
      sumOfMedals: d.participations.reduce((acc, curr) => acc + curr.medalsCount, 0)
    }))
  }

  buildPieChart(dataSet: DataSetPie[]) {
    const countries = dataSet.map(d => d.country);
    const sumOfAllMedalsYears = dataSet.map(d => d.sumOfMedals);
    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', {intersect: true}, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              this._router.navigate(['country', countryName]);
            }
          }
        }
      }
    });
    this.pieChart = pieChart;
  }
}

