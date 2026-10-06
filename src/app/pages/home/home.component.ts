import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {filter} from "rxjs";
import Chart from 'chart.js/auto';
import {Metadata, Olympic, Participation,} from "../../models/olympic.model";
import {ApiService} from "../../shared/service/api.service";
import {HeaderService} from "../../shared/service/header.service";
import {LoaderComponent} from "../../shared/component/loader/loader.component";

interface DataSetPie {
  countryId: number,
  countryName: string,
  sumOfMedals: number,
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public pieChart!: Chart<"pie", number[], string>;
  public totalJOs: number = 0
  public error!: string
  public isLoading = true;

  private _apiService = inject(ApiService);
  private _router = inject(Router);
  private _headerService = inject(HeaderService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    //get data olympic
    this._apiService.getOlympicData().pipe(
      filter((data) => {
        if (!data || data.length < 1) {
          this._router.navigateByUrl('/not-found');
          return false;
        }
        return true;
      })
    ).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.totalJOs = this._getTotalOlympicYears(data);

          //render header content with indicators
          const metadata : Metadata = {
            title: 'Medals per Country',
            indicators: [
              {
                type: 'numOfCountries',
                label: 'Number of countries',
                value: data.length
              },
              {
                type: 'numOfJOs',
                label: 'Number of JOs',
                value: this.totalJOs
              },
            ]
          }
          this._headerService.setMetadata(metadata);

          this.buildPieChart(this._createDatasetForPie(data));
        },
        error: () => {
          this.isLoading = false;
          this._router.navigateByUrl('/not-found');
        }
      }
    );
  }

  private _getTotalOlympicYears(data: Olympic[]): number {
    const setYear = new Set(data
      .map((d) => d.participations.map((p: Participation) => p.year))
      .flat());
    return Array.from(setYear).length;
  }

  private _createDatasetForPie(data: Olympic[]): DataSetPie[] | [] {
    if (!data || data.length < 1) {
      console.log('no data set');
      return []
    }
    return data.map((d) => ({
      countryId: d.id,
      countryName: d.country,
      sumOfMedals: d.participations.reduce((acc, curr) => acc + curr.medalsCount, 0)
    }))
  }

  buildPieChart(dataset: DataSetPie[]) {
    const countriesName: string[] = dataset.map(d => d.countryName);
    const sumOfAllMedalsYears = dataset.map(d => d.sumOfMedals);
    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countriesName,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        maintainAspectRatio: false,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', {intersect: true}, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              const countryId: number | undefined= dataset.find(d => d.countryName === countryName)?.countryId;
              this._router.navigate(['country', countryId]);
            }
          }
        }
      }
    });
    this._destroyRef.onDestroy(() => pieChart.destroy());
    this.pieChart = pieChart;
  }
}

