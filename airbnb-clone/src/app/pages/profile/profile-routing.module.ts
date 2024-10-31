import { Host, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AddNewApartmentComponent } from './add-new-apartment/add-new-apartment.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { EditAparmentComponent } from './edit-aparment/edit-aparment.component';
import { MessagesComponent } from './messages/messages.component';
import { HostGuard } from '../../guards/host.guard';

const routes: Routes = [
  { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [HostGuard],
  },
  {
    path: 'new-apartment',
    component: AddNewApartmentComponent,
    canActivate: [HostGuard],
  },
  {
    path: 'edit-apartment/:id',
    component: EditAparmentComponent,
    canActivate: [HostGuard],
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
