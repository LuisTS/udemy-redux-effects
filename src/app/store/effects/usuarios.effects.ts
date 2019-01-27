import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as usuariosActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        public usuarioService: UsuarioService
    ) {}

    @Effect()
    cargarUsuarios$ = this.actions$.pipe(ofType(usuariosActions.CARGAR_USUARIOS))
    .pipe(
        switchMap(() => {
            return this.usuarioService.getUsers()
            .pipe(
                map(users => new usuariosActions.CargarUsuariosSuccess(users)),
                catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
            );
        })
    );
}
