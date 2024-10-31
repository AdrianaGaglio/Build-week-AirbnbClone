import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { ApartmentService } from '../../../services/apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../shared/sharedmodal/popup/popup.component';
import { iApartment } from '../../../interfaces/iapartment';
import { environment } from '../../../../environments/environment.development';
import { GeocodingService } from '../../../services/geocoding.service';
import {
  debounceTime,
  finalize,
  lastValueFrom,
  Subject,
  switchMap,
} from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit-aparment',
  templateUrl: './edit-aparment.component.html',
  styleUrl: './edit-aparment.component.scss',
})
export class EditAparmentComponent {
  modalService: any;
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private apartSvc: ApartmentService,
    private router: Router,
    private modalSvc: NgbModal,
    private route: ActivatedRoute,
    private geocodingSvc: GeocodingService,
    private storage: AngularFireStorage
  ) {}

  idEditPost!: number;
  currentForm!: iApartment;
  idCurrentAparment!: number;

  form!: FormGroup;
  uid!: string;

  // lista categorie
  categories = environment.categories;

  message!: string;

  services: { service: string; icon: string }[] = environment.services;
  suggestions: any[] = [];
  private search$ = new Subject<string>();

  selectedMoreImages: File[] = [];
  imgURLs: string[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.idEditPost = params['id'];
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
        coverImage: this.fb.control([]),
        category: this.fb.control(''),
        squaremeters: this.fb.control('', [Validators.required]),
        location: this.fb.control(''),
        price: this.fb.control('', [Validators.required]),
        // vuote?!
        hostId: this.fb.control(this.uid),
        availability: this.fb.control(true),
        reviews: this.fb.control([]),
      });

      this.apartSvc.getApartmentById(this.idEditPost).subscribe((data) => {
        this.currentForm = data;
        this.form.patchValue(this.currentForm);
      });
    });
    this.search$
      .pipe(
        debounceTime(300),
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
      this.onMoreImagesUpload();
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

  sendEditDataApartment() {
    this.apartSvc
      .editApartmentById(this.idEditPost, this.form.value)
      .subscribe({
        next: (res) => {
          this.message = 'Appartamento modificato con successo!';
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

  onMoreImagesSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedMoreImages = Array.from(fileInput.files);
    }
  }

  onMoreImagesUpload(): void {
    if (this.selectedMoreImages.length > 0) {
      const uploadPromises = this.selectedMoreImages.map((file) => {
        const filePath = `coverImages/${Date.now()}_${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        return new Promise<void>((resolve, reject) => {
          task
            .snapshotChanges()
            .pipe(
              finalize(async () => {
                try {
                  const url = await lastValueFrom(fileRef.getDownloadURL());
                  this.imgURLs.push(url);

                  resolve();
                } catch (error) {
                  reject(error);
                }
              })
            )
            .subscribe();
        });
      });

      // Attendi che tutte le immagini siano caricate
      Promise.all(uploadPromises)
        .then(() => {
          console.log('Tutte le immagini sono state caricate con successo.');
          const currentCoverImages = this.form.get('coverImage')?.value || [];
          console.log(this.imgURLs);
          this.form.patchValue({
            coverImage: [...currentCoverImages, ...this.imgURLs],
          });
          this.sendEditDataApartment();
        })
        .catch((error) => {
          console.error(
            'Errore durante il caricamento delle immagini: ',
            error
          );
          this.message = 'Errore durante il caricamento delle immagini.';
          this.openModal(this.message, false);
        });
    } else {
      this.sendEditDataApartment();
    }
  }
}
