import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionHeartOutline, ionHeart } from '@ng-icons/ionicons';
import { ReviewCardComponent } from './review/review-card.component';

@NgModule({
  declarations: [CardComponent, ReviewCardComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ ionHeart, ionHeartOutline }),
  ],
  exports: [CardComponent, ReviewCardComponent],
})
export class SharedModule {}
