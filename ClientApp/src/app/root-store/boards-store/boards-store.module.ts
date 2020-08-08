import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './effects';
import { NoteService } from '../../services/note.service';
import { BoardService } from 'src/app/services/board.service';
import { boardsFeatureKey, boardsFeatureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(boardsFeatureKey, boardsFeatureReducer),
    EffectsModule.forFeature([BoardsEffects])
  ],
  providers: [BoardsEffects,BoardService, NoteService],  
})
export class BoardsStoreModule { }