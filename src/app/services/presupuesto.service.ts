import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  presupuesto: number = 0;
  restante: number = 0;

  private gasto$ = new Subject<any>();

  constructor() {}

  agregarGasto(gasto: any) {
    this.restante = this.restante - gasto.cantidad;
    this.gasto$.next(gasto);
  }

  getGastos(): Observable<any> {
    return this.gasto$.asObservable();
  }
}
