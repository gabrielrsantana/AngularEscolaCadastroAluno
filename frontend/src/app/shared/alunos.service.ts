import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Alunos } from './alunos';

@Injectable()
export class AlunosService {
  readonly url = 'http://localhost:3000/alunos';
  private alunosSubject$: BehaviorSubject<Alunos[]> = new BehaviorSubject<Alunos[]>(null);
  private loaded: boolean = false

  constructor(private http: HttpClient) { }

  get(): Observable<Alunos[]> {
    if (!this.loaded) {
      this.http.get<Alunos[]>(this.url)
      .pipe(
        tap((alus) => console.log(alus)),
        delay(1000)
      ).subscribe(this.alunosSubject$);
      this.loaded = true;
    }
    return this.alunosSubject$.asObservable();
  }

  add(d: Alunos): Observable<Alunos> {
    return this.http.post<Alunos>(this.url, d)
    .pipe(
      tap((alu: Alunos) => this.alunosSubject$.getValue().push(alu))
    )
  }

  del(alu: Alunos): Observable<any> {
    return this.http.delete(`${this.url}/${alu._id}`)
    .pipe(
      tap(() => {
        let alunos = this.alunosSubject$.getValue();
        let i = alunos.findIndex(d => d._id === alu._id);
        if(i >= 0) {
          alunos.splice(i, 1)
        }
      })
    )
  }

  update(alu: Alunos): Observable<Alunos> {
    return this.http.patch<Alunos>(`${this.url}/${alu._id}`, alu)
    .pipe(
      tap((d) => {
        let alunos = this.alunosSubject$.getValue();
        let i = alunos.findIndex(d => d._id === alu._id);
        if(i>=0) {
          alunos[i].nome = d.nome;
        }
      })
    )
  }


}
