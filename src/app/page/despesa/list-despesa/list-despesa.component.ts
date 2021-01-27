import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Despesa } from 'src/app/model/models';
import { DefaultService } from 'src/app/service/default.service';

@Component({
  selector: 'app-list-despesa',
  templateUrl: './list-despesa.component.html',
  styleUrls: ['./list-despesa.component.css'],
  animations: [
  trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListDespesaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'tipoDespesa', 'fornecedor', 'data', 'formaPagamento', 'valor'];
  //  exampleDatabase: ExampleHttpDatabase | null;
   expandedElement: Despesa | null;
   data: Despesa[] = [];

   resultsLength = 0;
   isLoadingResults = true;
   isRateLimitReached = false;

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

   teste : Despesa[];

   rows: number = 10;

   constructor(private defaultService: DefaultService) {}

   ngAfterViewInit() {    
     
    this.defaultService.get('api/despesa/all?size='+this.rows).subscribe(resultado => {
      let dados = resultado.content;

      merge(this.sort.sortChange, this.paginator.page)
       .pipe(
         startWith({}),
         switchMap(() => {
           this.isLoadingResults = true;
           return dados;
         }),
         map(data => {
           // Flip flag to show that loading has finished.
           this.isLoadingResults = false;
           this.isRateLimitReached = false;
           this.resultsLength = this.rows;

           return data;
         }),
         catchError(() => {
           this.isLoadingResults = false;
           // Catch if the GitHub API has reached its rate limit. Return empty data.
           this.isRateLimitReached = true;
           return observableOf([]);
         })
       ).subscribe(data => this.data = dados);  
              
    });

     // If the user changes the sort order, reset back to the first page.
     this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);


   }

 }

 
 /** An example database that the data source uses to retrieve data for the table. */
//  export class ExampleHttpDatabase {
//    constructor(private _httpClient: HttpClient) {}

//    getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
//      const href = 'https://api.github.com/search/issues';
//      const requestUrl =  `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;
//      console.log(requestUrl)
//      return this._httpClient.get<GithubApi>(requestUrl);
//    }
// }
