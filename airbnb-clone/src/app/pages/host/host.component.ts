import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { iUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss',
})
export class HostComponent implements OnInit {
  constructor(private userSvc: UserService, private route: ActivatedRoute) {}

  user!: iUser;
  message!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userSvc.getUserById(params['id']).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (err) => {
          this.message = err;
        },
      });
    });
  }
}
