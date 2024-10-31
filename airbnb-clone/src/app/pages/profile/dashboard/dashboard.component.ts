import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ApartmentService } from '../../../services/apartment.service';
import { iApartment } from '../../../interfaces/iapartment';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../interfaces/iuser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PopupComponent } from '../../../shared/sharedmodal/popup/popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupConfirmComponent } from '../../../shared/sharedmodalconfirm/popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private apartmentSvc: ApartmentService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private storage: AngularFireStorage,
    private modalSvc: NgbModal
  ) {}

  apartments!: iApartment[];
  user!: iUser;

  ngOnInit() {
    this.authSvc.authState$.subscribe((user) => {
      if (user) {
        this.apartmentSvc.getApartmentsByUser(user.uid).subscribe((res) => {
          this.apartments = res;
          this.userSvc.getUserById(user.uid).subscribe((userInfo) => {
            this.user = userInfo;
          });
        });
      }
    });
  }

  addNewApartment() {
    this.router.navigate(['/profile/new-apartment']);
  }

  editApartment(id: number) {
    this.router.navigate([`/profile/edit-apartment/${id}`]);
  }

  deleteApartment(id: number) {
    this.openModal("Sei sicuro di voler eliminare l'appartamento?", false);
    // this.apartmentSvc.deleteApartmentById(id).subscribe();
    // const found = this.apartments.find((data) => data.id === id);
    // if (found) {
    //   found.coverImage.forEach((imageUrl) => {
    //     this.deliteImgFromStorage(imageUrl);
    //   });
    // }
    // this.apartments = this.apartments.filter((data) => data.id !== id);
  }

  checkOut(apartment: iApartment) {
    apartment.availability = true;
    this.apartmentSvc.changeAvailability(apartment).subscribe();
  }

  deliteImgFromStorage(imageUrl: string) {
    const baseUrl =
      'https://firebasestorage.googleapis.com/v0/b/buildweek-82174.appspot.com/o/';
    const filePath = decodeURIComponent(
      imageUrl.split(baseUrl)[1].split('?')[0]
    );

    this.storage
      .ref(filePath)
      .delete()
      .subscribe({
        next: () => {
          console.log('Immagine eliminata con successo');
        },
        error: (error) => {
          console.error("Errore durante l'eliminazione dell'immagine:", error);
        },
      });
  }

  openModal(message: string, value: boolean) {
    const modalRef = this.modalSvc.open(PopupConfirmComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isOk = value;
  }
}
