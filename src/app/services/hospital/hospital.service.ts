import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from "rxjs/operators";
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {  }

  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get( url ).pipe(
      map( (resp:any) =>{
        
        this.totalHospitales = resp.hospitales.length;
        return resp.hospitales;
      }
      )
    );
  }

  obtenerHospital( id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).pipe(
      map(
        (resp: any) => {
          resp.hospitales;
        })
      
    );
  }

  borrarHospital( id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url ).pipe(
      map(
        (resp: any) => {
          swal('Hospital borrado', 'Eliminado correctamente', 'success');
        })
      
    );
  }

  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital' ;
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, {nombre: nombre} ).pipe(
      map(
        (resp: any) => {
          resp.hospital;
        })
      
    );
  }

  buscarHopsital( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          console.log(resp); // AQUI
          return resp.hospitales;
      }));
  }

  actualizarHospital( hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital)
      .pipe(
        map((resp: any) => {
          console.log(resp); // AQUI
          swal('Hospital actualizado', hospital.nombre, 'success');
          return resp.hospital;
      }));
  }
}
