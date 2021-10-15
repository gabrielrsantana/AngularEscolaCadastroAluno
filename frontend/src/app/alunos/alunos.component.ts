import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Alunos } from '../shared/alunos';
import { AlunosService } from '../shared/alunos.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit {
  alunos: Alunos[] = [];
  aluName: string;
  aluTurma: string;
  aluNasc: string;
  aluMat: number = new Date().getTime();
  aluEdit: Alunos = null;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private alunosService: AlunosService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.alunosService
      .get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((alus) => (this.alunos = alus));
  }

  save() {
    if (this.aluEdit && this.aluName.length !== 0 || this.aluTurma.length !== 0 || this.aluNasc.length !== 0 ) {
      this.alunosService
        .update({
          nome: this.aluName,
          _id: this.aluEdit._id,
          turma: this.aluTurma,
          dataNasc: this.aluNasc,
          matricula: this.aluMat,
        })
        .subscribe(
          (alu) => {
            this.notify('UPDATED!');
          },
          (err) => {
            this.notify('ERROR');
            console.error(err);
          }
        );
    }
     else if (this.aluName.length == 0 || this.aluTurma.length == 0 || this.aluNasc.length == 0 ) { //validaçao
        this.cancel();
        this.notify('NOTHING INSERTED/EDITED!');
      } else {
      this.alunosService
        .add({
          nome: this.aluName,
          turma: this.aluTurma,
          dataNasc: this.aluNasc,
          matricula: this.aluMat,
        })
        .subscribe(
          (alu) => {
            console.log(alu);
            this.notify('INSERTED!');
          },
          (err) => {
            console.error(err);
          }
        );
    }
    this.clearFields();
  }

  edit(alu: Alunos) {
    this.aluName = alu.nome;
    this.aluTurma = alu.turma;
    this.aluNasc = alu.dataNasc;
    this.aluMat = alu.matricula;
    this.aluEdit = alu;
  }

  delete(alu: Alunos) {
    this.alunosService.del(alu).subscribe(
      () => this.notify('REMOVED!'),
      (err) => this.notify(err.error.msg)
    );
  }

  clearFields() {
    this.aluName = '';
    this.aluTurma = '';
    this.aluNasc = '';
    this.aluEdit = null;
  }

  cancel() {
    this.clearFields();
  }

  notify(msg: string) {
    this.snackbar.open(msg, 'OK', { duration: 3000 });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }


}
