import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionHeartOutline, ionHeart } from '@ng-icons/ionicons';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ ionHeart, ionHeartOutline }),
  ],
  exports: [CardComponent],
})
export class SharedModule {}
