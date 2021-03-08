import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {

  nombreGasto: string = '';
  cantidad: number = undefined;
  formualarioIncorrecto: boolean = false;
  textIncorrecto: string = 'Nombre del gasto o cantidad incorrecta';

  constructor(private _presupuestoService: PresupuestoService) { }

  ngOnInit(): void {
  }

  agregarGasto() {

    if (this.cantidad > this._presupuestoService.restante ) {
      this.formualarioIncorrecto = true;
      this.textIncorrecto = 'Cantidad ingresada mayor al restante';
      return;
    } else if (this._presupuestoService.restante === 0) {
      this.textIncorrecto = 'No posee más presupuesto disponible';
      return;
      }
    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formualarioIncorrecto = true;
      this.textIncorrecto = 'Nombre del gasto o cantidad incorrecta';
    } else {
      // creamos el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }

      // enviamos el objeto a los suscriptores via subject
      this._presupuestoService.agregarGasto(GASTO);

      //reseteamos valores
      this.formualarioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }

}
