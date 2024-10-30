import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { ApartmentService } from '../../../services/apartment.service';
import { PopupComponent } from '../../../shared/sharedmodal/popup/popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment.development';
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

  // services: string[] = [
  //   'WiFi',
  //   'Aria condizionata',
  //   'Riscaldamento',
  //   'TV',
  //   'Lavatrice',
  //   'Asciugatrice',
  //   'Cucina attrezzata',
  //   'Frigorifero',
  //   'Microonde',
  //   'Macchina del caffè',
  //   'Asciugamani inclusi',
  //   'Parcheggio gratuito',
  //   'Piscina',
  //   'Palestra',
  //   'Area barbecue',
  //   'Balcone o terrazza',
  //   'Giardino',
  //   'Accesso per disabili',
  //   'Animali ammessi',
  //   'Vasca idromassaggio',
  //   'Servizio di pulizia',
  //   'Reception 24 ore',
  //   'Vista panoramica',
  //   'Servizio in camera',
  //   'Minibar',
  //   'Colazione inclusa',
  // ];

  services: string[] = environment.services;

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
    }, 2200);
  }

  showInfo2() {
    this.infoMultiple2 = !this.infoMultiple2;

    setTimeout(() => {
      this.infoMultiple2 = !this.infoMultiple2;
    }, 2200);
  }

  dropDownservices: boolean = false;
  dropDownCategory: boolean = false;
}
