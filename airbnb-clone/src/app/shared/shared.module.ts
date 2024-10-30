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
import { RouterLink, RouterModule } from '@angular/router';
import { RatingsStarsComponent } from './ratings-stars/ratings-stars.component';
import { TextReviewComponent } from './text-review/text-review.component';

@NgModule({
  declarations: [
    CardComponent,
    ReviewCardComponent,
    FilterComponent,
    RatingsStarsComponent,
    TextReviewComponent,
  ],
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
    RouterLink,
  ],
  exports: [
    CardComponent,
    ReviewCardComponent,
    FilterComponent,
    RatingsStarsComponent,
    TextReviewComponent,
  ],
})
export class SharedModule {}
