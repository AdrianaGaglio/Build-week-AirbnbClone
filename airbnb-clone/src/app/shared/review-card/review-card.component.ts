import { Component, Input, OnInit } from '@angular/core';
import { iReview } from '../../interfaces/ireview';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent implements OnInit {
  constructor(private authSvc: AuthService, private userSvc: UserService) {}

  @Input() review!: iReview;

  user!: iUser;

  ngOnInit(): void {
    this.userSvc.getUserById(this.review.userId).subscribe((data) => {
      this.user = data;
      console.log(this.review);
    });
  }
}
