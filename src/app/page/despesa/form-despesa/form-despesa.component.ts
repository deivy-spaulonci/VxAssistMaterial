import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Tipo {
  id: number;
  nome: string;  
}

@Component({
  selector: 'app-form-despesa',
  templateUrl: './form-despesa.component.html',
  styleUrls: ['./form-despesa.component.css']
})
export class FormDespesaComponent implements OnInit {
  despesaform: FormGroup;
  comboTipoDespesa = new FormControl()

  filteredTipos: Observable<Tipo[]>;

  TIPOS: Tipo[] = [
    { id: 11, nome: 'Dr Nice' },
    { id: 12, nome: 'Narco' },
    { id: 13, nome: 'Bombasto' },
    { id: 14, nome: 'Celeritas' },
    { id: 15, nome: 'Magneta' },
    { id: 16, nome: 'RubberMan' },
    { id: 17, nome: 'Dynama' },
    { id: 18, nome: 'Dr IQ' },
    { id: 19, nome: 'Magma' },
    { id: 20, nome: 'Tornado' }
  ];

  
  _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();  
    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  };

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.filteredOptions = this.comboTipoDespesa.valueChanges.pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.TIPOS.slice())
    );
  }

  ngOnInit(): void {
    this.despesaform = this.fb.group({
      comboTipo: new FormControl('', Validators.required),
      inputData: new FormControl('', Validators.required),
      inputValor: new FormControl('', Validators.minLength(4)),
    });

    // this.filteredOptions = this.comboTipoDespesa.valueChanges.pipe(      
    //   startWith(''),
    //   map(nome => this._filter(nome))      
    // );
  }

  // private _filter(value: string): any[] {
  //   console.log(value)
  //   const filterValue = value.toLowerCase();
  //   return this.HEROES.filter(option => option.name.toLowerCase().includes(filterValue));
  // }

  // private _filterGroup(value: string): any[] {
  //   if (value) {
  //     return this.HEROES
  //       .map(group => ({name: group.name, names: this._filter(group.name, value)}))
  //       .filter(group => group.names.length > 0);
  //   }

  //   return this.HEROES;
  // }

  private _filterStates(value: string): Tipo[] {
    const filterValue = value.toLowerCase();

    return this.TIPOS.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(value: string) {
    this._snackBar.open('Cannonball!!', 'End now', {
      duration: 500
    });
  }

}
