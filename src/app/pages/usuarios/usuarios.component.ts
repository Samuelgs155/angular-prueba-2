import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService) { }
  //constructor() { }

  ngOnInit() {
    this.cargarUsuarios();
  }
  
  cargarUsuarios() {

    this._usuarioService.cargarUsuarios( this.desde).subscribe(
      (resp: any) => {
        //console.log( resp)
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      }
    );
  }

  cambiarDesde(valor:number){ 
    let desde = this.desde + valor;
    //console.log(desde);
    if(desde >= this.totalRegistros) { 
      return;
    }
    if(desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }
  
  buscarUsuario( termino: string ) {
    //console.log( termino );
    if( termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this._usuarioService.buscarUsuarios(termino)
    .subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      }
    );
  }

  borrarUsuario( usuario: Usuario ) {
    //console.log(usuario);

    if( usuario._id == this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }  

    swal({
      title: "Esta seguro?",
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {
      console.log(borrar);
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe(
          (borrado: boolean) => {
            console.log(borrado);
            this.cargarUsuarios();
          }
        );
      } 
    }); 

  }  
  guardarUsuario( usuario: Usuario ) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
  

}
