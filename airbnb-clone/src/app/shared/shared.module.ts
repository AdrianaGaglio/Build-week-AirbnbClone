import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionHeartOutline, ionHeart } from '@ng-icons/ionicons';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [CardComponent, ReviewComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ ionHeart, ionHeartOutline }),
  ],
  exports: [CardComponent, ReviewComponent],
})
export class SharedModule {}
