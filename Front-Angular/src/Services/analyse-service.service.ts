import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chartsdata } from 'src/Models/chartsdata';
import { chartsdata2 } from 'src/Models/chartsdata2';
import { chartsdata3 } from 'src/Models/chartsdata3';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  constructor(private httpClient: HttpClient) { }

  getAll(gender: any): Observable<{ data: chartsdata[] }> {
    return this.httpClient.get<{ data: chartsdata[] }>('https://localhost:7185/api/CubeData/query2?gender=' + gender);
  }

  get2(age: any): Observable<{ data: chartsdata2[] }> {
    return this.httpClient.get<{ data: chartsdata2[] }>('https://localhost:7185/api/CubeData/query1?age=' + age);
  }

  get3(): Observable<{ data: chartsdata3[] }> {
    return this.httpClient.get<{ data: chartsdata3[] }>('https://localhost:7185/api/CubeData/query3');
  }

  getFilteredData(selectedGender: string): Observable<{ Data: any }> {
    // Vous devez implémenter la logique de filtrage appropriée ici en fonction de votre application
    // Par exemple, vous pouvez ajouter un paramètre à votre URL pour filtrer les données côté serveur
    return this.httpClient.get<{ Data: any }>('https://localhost:7185/api/CubeData/query2?gender=' + selectedGender);
  }
}
