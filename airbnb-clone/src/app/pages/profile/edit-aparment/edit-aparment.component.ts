import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { ApartmentService } from '../../../services/apartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../shared/sharedmodal/popup/popup.component';
import { iApartment } from '../../../interfaces/iapartment';
import { environment } from '../../../../environments/environment.development';

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
    private route: ActivatedRoute
  ) {}

  idEditPost!: number;
  currentForm!: iApartment;
  idCurrentAparment!: number;

  form!: FormGroup;
  uid!: string;

  categories!: string[];

  message!: string;

  services: string[] = environment.services;

  ngOnInit(): void {
    this.apartSvc.getCategories().subscribe((res) => {
      this.categories = res;
    });

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

      this.apartSvc.getApartmentById(this.idEditPost).subscribe((data) => {
        this.currentForm = data;
        this.form.patchValue(this.currentForm);
      });
    });
  }

  minlength(input: string) {
    return this.form.get(input)?.errors?.['minlength'];
  }

  onSubmit() {
    if (this.form.valid) {
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
