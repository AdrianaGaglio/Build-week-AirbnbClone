import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { ApartmentService } from '../../../services/apartment.service';
import { PopupComponent } from '../../../shared/sharedmodal/popup/popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment.development';
import { GeocodingService } from '../../../services/geocoding.service';
import { debounceTime, Subject, switchMap } from 'rxjs';
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
    private route: ActivatedRoute,
    private geocodingSvc: GeocodingService
  ) {}

  idEditPost!: number;

  form!: FormGroup;
  uid!: string;

  categories!: string[];

  message!: string;

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

    this.search$
      .pipe(
        debounceTime(300), // Aggiungi un ritardo di 300ms per il debounce
        switchMap((placeName: string) =>
          this.geocodingSvc.searchGeocode(placeName)
        )
      )
      .subscribe((data) => {
        this.suggestions = data.map((item: any) => item.display_name);
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
}
