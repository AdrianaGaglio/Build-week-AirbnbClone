import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AddNewApartmentComponent } from './add-new-apartment/add-new-apartment.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { EditAparmentComponent } from './edit-aparment/edit-aparment.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
  },
  {
    path: 'new-apartment',
    component: AddNewApartmentComponent,
  },
  {
    path: 'edit-apartment/:id',
    component: EditAparmentComponent,
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
