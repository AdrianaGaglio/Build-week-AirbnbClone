import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionHeartOutline, ionHeart } from '@ng-icons/ionicons';
import {
  matFamilyRestroom,
  matBeachAccess,
  matLocationCity,
  matLocalFireDepartment,
  matPark,
  matFavoriteBorder,
  matEmojiNature,
  matArchitecture,
  matKayaking,
  matLandscape,
  matDiversity3,
  matDashboard,
} from '@ng-icons/material-icons/baseline';
import { ReviewCardComponent } from './review-card/review-card.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [CardComponent, ReviewCardComponent, FilterComponent],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      ionHeart,
      ionHeartOutline,
      matFamilyRestroom,
      matBeachAccess,
      matLocationCity,
      matLocalFireDepartment,
      matPark,
      matFavoriteBorder,
      matEmojiNature,
      matArchitecture,
      matKayaking,
      matLandscape,
      matDiversity3,
      matDashboard,
    }),
  ],
  exports: [CardComponent, ReviewCardComponent, FilterComponent],
})
export class SharedModule {}
