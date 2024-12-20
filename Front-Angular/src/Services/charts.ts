import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { chartsdata } from 'src/Models/chartsdata';



@Injectable({
    providedIn: 'root',
  })


    export class AnalyseService {
    constructor (private httpClient: HttpClient) { }

    getAll(): Observable<{ data: chartsdata[]}>{

    return (this.httpClient.get<{ data: chartsdata[] }>('//localhost:7185/api/CubeData/query1?year=${this.selectedYear'));
    }
}