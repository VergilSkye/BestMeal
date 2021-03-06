import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { ClienteComponent } from './cliente.component';
import { ClienteDetailComponent } from './cliente-detail.component';
import { ClienteUpdateComponent } from './cliente-update.component';
import { ClienteDeletePopupComponent } from './cliente-delete-dialog.component';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteCartaoComponent } from './cliente-cartao.component';
import { ClienteCartaoRecompensaComponent } from './cliente-cartao-recompensa.component';
import { CartaoCreditoResolve } from '../cartao-credito/cartao-credito.route';
import { ClienteCartaoCreditoDeletePopupComponent } from './cliente-cartao-credito-delete-dialog.component';
import { ClienteCartaoRecompensaDeletePopupComponent } from './cliente-cartao-recompensa-delete-dialog.component';
import { CartaoRecompensaResolve } from '../cartao-recompensa';

@Injectable({ providedIn: 'root' })
export class ClienteResolve implements Resolve<ICliente> {
  constructor(private service: ClienteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICliente> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Cliente>) => response.ok),
        map((cliente: HttpResponse<Cliente>) => cliente.body)
      );
    }
    return of(new Cliente());
  }
}

export const clienteRoute: Routes = [
  {
    path: '',
    component: ClienteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bestMealApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClienteDetailComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bestMealApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClienteUpdateComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bestMealApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClienteUpdateComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bestMealApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const clientePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ClienteDeletePopupComponent,
    resolve: {
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bestMealApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/cartao',
    component: ClienteCartaoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bestMealApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/cartaoRecompensa',
    component: ClienteCartaoRecompensaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
      cliente: ClienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'bestMealApp.cliente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete/cartao',
    component: ClienteCartaoCreditoDeletePopupComponent,
    resolve: {
      cartaoCredito: CartaoCreditoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bestMealApp.cartaoCredito.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: ':id/delete/cartaoRecompensa',
    component: ClienteCartaoRecompensaDeletePopupComponent,
    resolve: {
      cartaoRecompensa: CartaoRecompensaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bestMealApp.cartaoRecompensa.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
