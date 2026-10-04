import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {filter} from 'rxjs/operators';
import Chart from 'chart.js/auto';

import {Metadata, Olympic} from "../../models/olympic.model";
import {HeaderService} from "../../shared/service/header.service";
import {ApiService} from "../../shared/service/api.service";

interface Dataset {
  year: number[],
  medals: number[]
}

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./country.component.scss']
})


export class CountryComponent implements OnInit {

  public lineChart!: Chart<"line", number[], number>;
  public error!: string;

  private _destroyRef = inject(DestroyRef);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _headerService = inject(HeaderService);
  private _apiService = inject(ApiService);


  ngOnInit() {
    const countryId: number = Number(this._route.snapshot.params['id']);

    this._apiService.getCountryById(countryId).pipe(
      filter((country): country is Olympic=> {
        if (!country) {
          this._router.navigateByUrl('/not-found');
          return false;
        }
        return true
      })).subscribe({
      next: (country: Olympic) => {

        // create metadata
        const participations = country.participations;
        let numOfEntries = participations.length;
        let numOfAthletes = participations.reduce((acc, curr) => acc + curr.athleteCount, 0);
        let numOfMedals = participations.reduce((acc, curr) => acc + curr.medalsCount, 0);

      const metadata: Metadata = {
          title: country.country,
          indicators: [
            {
              type: 'numOfEntries',
              label: 'Number of entries',
              value: numOfEntries
            },
            {
              type: 'numOfMedals',
              label: 'Total Number of medals',
              value: numOfMedals
            },
            {
              type: 'numOfAthletes',
              label: 'Total Number of athletes',
              value: numOfAthletes
            }
          ]
        }

        //display header
        this._headerService.setMetadata(metadata);

        //setup dataset for line chart
        const dataset = participations.reduce((acc: { year: number[], medals: number[] }, curr) => {
          acc.year.push(curr.year);
          acc.medals.push(curr.medalsCount);
          return acc
        }, {year: ([] as number[]), medals: ([] as number[])});

        this.buildMultiaxisChart(dataset);

      }
    })


  }

  buildMultiaxisChart(dataset: Dataset) {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: dataset.year,
        datasets: [
          {
            label: "medals",
            data: dataset.medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        maintainAspectRatio: false
      }
    });
    this._destroyRef.onDestroy(() => lineChart.destroy());
    this.lineChart = lineChart;
  }
}

