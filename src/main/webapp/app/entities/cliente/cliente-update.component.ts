import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { IMunicipio } from 'app/shared/model/municipio.model';
import { MunicipioService } from 'app/entities/municipio';
import { ICartaoCredito } from 'app/shared/model/cartao-credito.model';
import { PessoaValidityCommonService } from 'app/shared/reuse/pessoa-validity.common.service';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
  cliente: ICliente;
  isSaving: boolean;

  municipios: IMunicipio[];
  cartoes: ICartaoCredito[];
  idCliente = 0;

  editForm = this.pessoaValidityCommonService.createEditForm(this.fb);

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected clienteService: ClienteService,
    protected municipioService: MunicipioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router,
    protected pessoaValidityCommonService: PessoaValidityCommonService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);
      this.cliente = cliente;
      this.clienteService.setCliente(this.cliente);
    });

    this.municipioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMunicipio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMunicipio[]>) => response.body)
      )
      .subscribe((res: IMunicipio[]) => (this.municipios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.editForm = this.pessoaValidityCommonService.setPessoaReValidity(this.editForm);
    //  if (this.cliente && this.cliente.id !== undefined) {
    // Navega automaticamente para mostrar os cartões
    //      this.router.navigate(['/', 'cliente', { outlets: { popup: this.cliente.id + '/cartao' } }]);
    //      this.router.navigate(['/', 'cliente', { outlets: { popup: this.cliente.id + '/cartaoRecompensa' } }]);
    // }
  }

  updateForm(cliente: ICliente) {
    this.editForm.patchValue({
      id: cliente.id,
      tipo: cliente.tipo,
      cpf: cliente.cpf,
      cnpj: cliente.cnpj,
      primeiroNome: cliente.primeiroNome,
      nomeMeio: cliente.nomeMeio,
      sobreNome: cliente.sobreNome,
      saudacao: cliente.saudacao,
      titulo: cliente.titulo,
      cep: cliente.cep,
      tipoLogradouro: cliente.tipoLogradouro,
      nomeLogradouro: cliente.nomeLogradouro,
      complemento: cliente.complemento,
      municipio: cliente.municipio
    });
    this.pessoaValidityCommonService.setPessoa(cliente); // Grava o valor de pessoa em service para ser usado na validação
    this.pessoaValidityCommonService.setTipoPessoa('cliente'); // Grava o valor de pessoa em service para ser usado na validação
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    const entity = {
      ...new Cliente(),
      id: this.editForm.get(['id']).value,
      tipo: this.editForm.get(['tipo']).value,
      cpf: this.editForm.get(['cpf']).value,
      cnpj: this.editForm.get(['cnpj']).value,
      primeiroNome: this.editForm.get(['primeiroNome']).value,
      nomeMeio: this.editForm.get(['nomeMeio']).value,
      sobreNome: this.editForm.get(['sobreNome']).value,
      saudacao: this.editForm.get(['saudacao']).value,
      titulo: this.editForm.get(['titulo']).value,
      cep: this.editForm.get(['cep']).value,
      tipoLogradouro: this.editForm.get(['tipoLogradouro']).value,
      nomeLogradouro: this.editForm.get(['nomeLogradouro']).value,
      complemento: this.editForm.get(['complemento']).value,
      municipio: this.editForm.get(['municipio']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>) {
    result.subscribe((res: HttpResponse<ICliente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMunicipioById(index: number, item: IMunicipio) {
    return item.id;
  }
  // cartaoCreditoClick() {
  //   this.router.navigate(['/', 'cliente', { outlets: { popup: this.cliente.id + '/cartao' } }]);
  // }
  //      this.router.navigate(['/', 'cliente', { outlets: { popup: this.cliente.id + '/cartaoRecompensa' } }]);
}
