import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { ApartmentService } from '../../../services/apartment.service';
import { PopupComponent } from '../../../shared/sharedmodal/popup/popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment.development';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-add-new-apartment',
  templateUrl: './add-new-apartment.component.html',
  styleUrl: './add-new-apartment.component.scss',
})
export class AddNewApartmentComponent implements OnInit {
  modalService: any;
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private apartSvc: ApartmentService,
    private router: Router,
    private modalSvc: NgbModal,
    private route: ActivatedRoute
  ) {}

  idEditPost!: number;

  form!: FormGroup;
  uid!: string;

  categories!: string[];

  message!: string;

  /*services: string[] = [
    'WiFi', //ionWifiOutline
    'Aria condizionata', //ionSnowOutline
    'Riscaldamento', //ionFlameOutline
    'TV', //ionTvOutline
    'Lavatrice', //ionShirtOutline
    'Asciugatrice', //<mat-icon>local_laundry_service</mat-icon>
    'Cucina attrezzata', //<mat-icon>multicooker</mat-icon>
    'Frigorifero', //<mat-icon>kitchen</mat-icon>
    'Microonde', //<mat-icon>microwave</mat-icon>
    'Macchina del caffè', //ionCafeOtline
    'Asciugamani inclusi', //ionHandLeftOutline
    'Parcheggio gratuito', //ionCarOutline
    'Piscina', //ionWaterOutline
    'Palestra', //ionFootballOutline
    'Area barbecue', //ionBonfireOutline
    'Balcone o terrazza', //<mat-icon>balcony</mat-icon>
    'Giardino', //ionRoseOutline
    'Accesso per disabili', //ionBodyOutline
    'Animali ammessi', //<mat-icon>pets</mat-icon>
    'Vasca idromassaggio', //<mat-icon>waves</mat-icon>
    'Servizio di pulizia', //<mat-icon>cleaning_services</mat-icon>
    'Reception 24 ore', //<mat-icon>concierge</mat-icon>
    'Vista panoramica', //<mat-icon>landscape</mat-icon>
    'Servizio in camera', //<mat-icon>room_service</mat-icon>
    'Minibar', //<mat-icon>local_bar</mat-icon>
    'Colazione inclusa', //<mat_icon>bakery_dining</mat_icon>
  ];*/
  services: string[] = environment.services;
  suggestions: any[] = [];
  private search$ = new Subject<string>();

  ngOnInit(): void {
    this.apartSvc.getCategories().subscribe((res) => {
      this.categories = res;
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.idEditPost = params['id'];
        console.log('ID:', this.idEditPost);
      }
    });

    this.authSvc.authState$.subscribe((res) => {
      if (res) {
        this.uid = res.uid;
      }

      this.form = this.fb.group({
        name: this.fb.control('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        description: this.fb.control('', [
          Validators.required,
          Validators.minLength(30),
        ]),
        rooms: this.fb.control('', [Validators.required]),
        services: this.fb.control('', [Validators.required]),
        coverImage: this.fb.control(''),
        otherImages: this.fb.control(''),
        category: this.fb.control(''),
        squaremeters: this.fb.control('', [Validators.required]),
        location: this.fb.control(''),
        price: this.fb.control('', [Validators.required]),
        // vuote?!
        hostId: this.fb.control(this.uid),
        availability: this.fb.control(true),
        reviews: this.fb.control([]),
      });
    });
  }

  minlength(input: string) {
    return this.form.get(input)?.errors?.['minlength'];
  }

  onSubmit() {
    if (this.form.valid) {
      this.apartSvc.addApartament(this.form.value).subscribe({
        next: (res) => {
          this.message = 'Appartamento aggiunto con successo!';
          this.openModal(this.message, true);
          setTimeout(() => {
            this.router.navigate(['/profile/dashboard']);
            this.modalSvc.dismissAll();
          }, 2000);
        },
        error: (err) => {
          this.message = err;
          this.openModal(this.message, false);
        },
      });
    }
  }

  openModal(message: string, value: boolean) {
    const modalRef = this.modalSvc.open(PopupComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isOk = value;
  }

  infoMultiple: boolean = false;
  infoMultiple2: boolean = false;

  showInfo() {
    this.infoMultiple = !this.infoMultiple;

    setTimeout(() => {
      this.infoMultiple = !this.infoMultiple;
    }, 1000);
  }

  showInfo2() {
    this.infoMultiple2 = !this.infoMultiple2;

    setTimeout(() => {
      this.infoMultiple2 = !this.infoMultiple2;
    }, 1000);
  }

  dropDownservices: boolean = false;
  dropDownCategory: boolean = false;
  onSearch(placeName: string): void {
    if (placeName.length > 2) {
      this.search$.next(placeName);
    } else {
      this.suggestions = [];
    }
  }
  selectSuggestion(suggestion: any): void {
    this.form.get('location')?.setValue(suggestion);
    console.log('Località selezionata:', suggestion);
    this.suggestions = [];
  }
  //prova merge
}
