import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BestMealSharedModule } from 'app/shared';
import {
  CartaoRecompensaComponent,
  CartaoRecompensaDetailComponent,
  CartaoRecompensaUpdateComponent,
  CartaoRecompensaDeletePopupComponent,
  CartaoRecompensaDeleteDialogComponent,
  cartaoRecompensaRoute,
  cartaoRecompensaPopupRoute
} from './';

const ENTITY_STATES = [...cartaoRecompensaRoute, ...cartaoRecompensaPopupRoute];

@NgModule({
  imports: [BestMealSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CartaoRecompensaComponent,
    CartaoRecompensaDetailComponent,
    CartaoRecompensaUpdateComponent,
    CartaoRecompensaDeleteDialogComponent,
    CartaoRecompensaDeletePopupComponent
  ],
  entryComponents: [
    CartaoRecompensaComponent,
    CartaoRecompensaUpdateComponent,
    CartaoRecompensaDeleteDialogComponent,
    CartaoRecompensaDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BestMealCartaoRecompensaModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
