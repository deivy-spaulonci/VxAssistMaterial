import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tipo } from 'src/app/model/tipo';

import { Validator } from 'src/app/util/validator';
import { DefaultService } from 'src/app/service/default.service';
import { Fornecedor, FormaPagamento } from 'src/app/model/models';


@Component({
  selector: 'app-form-despesa',
  templateUrl: './form-despesa.component.html',
  styleUrls: ['./form-despesa.component.css']
})
export class FormDespesaComponent implements OnInit {
  despesaform: FormGroup;
  comboTipo = new FormControl();
  comboFornecedor = new FormControl();
  comboFormaPagamento = new FormControl();

  filteredTipos: Observable<Tipo[]>;
  filteredFornecedores: Observable<Fornecedor[]>;
  filteredFormasPagamento: Observable<FormaPagamento[]>;

  validator = new Validator();

  tiposDespesa: Tipo[];
  fornecedores: Fornecedor[];
  formasPagamento: FormaPagamento[];

  constructor(private fb: FormBuilder,
    private defaultService: DefaultService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.despesaform = this.fb.group({
      comboTipo: new FormControl('', Validators.required),
      comboFornecedor: new FormControl('', Validators.required),
      inputData: new FormControl('', [Validators.required, this.validator.dateValidator]),
      inputValor: new FormControl('', Validators.minLength(4)),
    });

    this.defaultService.get('api/tipo-despesa/allSelect').subscribe(resultado => {
      this.tiposDespesa = resultado;
      //this.despesaCadastro.tipoDespesa = (this.despesaCadastro.id ? this.despesaCadastro.tipoDespesa : resultado[0]);

      this.defaultService.get('api/forma-pagamento/allSelect').subscribe(resultado => {
        this.formasPagamento = resultado;
        //   this.despesaCadastro.formaPagamento = (this.despesaCadastro.id ? this.despesaCadastro.formaPagamento : resultado[0]);

        this.defaultService.get('api/fornecedor').subscribe(resultado => {
          this.fornecedores = resultado.content;
          //     this.despesaCadastro.fornecedor = (this.despesaCadastro.id ? this.despesaCadastro.fornecedor : resultado[0]);

          //     this.defaultService.get('api/tipo-informacao-extra/allSelect').subscribe(resultado => {
          //       this.tiposInformacaoExtra = resultado;
          //       this.informacaoExtra.tipoInformacaoExtra = resultado[0];

          //       this.defaultService.get('api/despesa/total').subscribe(resultado => {
          //         this.total = resultado;

          //         this.loading = false;
          //       });

          //     });
          this.filteredTipos = this.comboTipo.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name, this.tiposDespesa) : this.tiposDespesa.slice())
          );

          this.filteredFornecedores = this.comboFornecedor.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name, this.fornecedores) : this.fornecedores.slice())
          );

        });
      });


    });

  }

  private _filter(value: string, lista: any[]): any[] {
    const filterValue = value.toLowerCase();
    return lista.filter(tipo => tipo.nome.toLowerCase().includes(filterValue));
  }

  displayFn(tipo: Tipo): string {
    return tipo && tipo.nome ? tipo.nome : '';
  }

  onSubmit(value: string) {
    this._snackBar.open('Cannonball!!', 'End now', {
      duration: 500
    });
  }

}
