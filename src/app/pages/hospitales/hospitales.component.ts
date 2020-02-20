import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import swal from 'sweetalert';

//declare var Swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
    .subscribe(resp => {      
        //console.log(resp);
        this.hospitales = resp;
        console.log('hospitales en componente : ' + this.hospitales);
      });
  }

  guardarHospital( hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital( hospital: Hospital){
    this._hospitalService.borrarHospital(hospital._id).subscribe(
      () => this.cargarHospitales()
    );
  }

  buscarHospital( termino: string ) {
    if(termino.length <= 0) {      
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHopsital(termino).subscribe(
      hospitales => this.hospitales = hospitales
    );
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then(
      valor => {
        if( !valor || valor.length == 0) {
          return;
        }
        this._hospitalService.crearHospital(valor).subscribe(
          () => this.cargarHospitales()
        );
      }
    )
  }

  

}
