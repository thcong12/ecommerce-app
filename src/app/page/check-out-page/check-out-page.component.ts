import { Component, ElementRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, pluck, switchMap, tap } from 'rxjs';
import { GetDataService } from 'src/app/shared/service/get-data.service';

@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.scss'],
  host: { class: 'cart-table-area section-padding-100' },
})
export class CheckOutPageComponent implements OnInit {
  public messengeError: any = [
    {
      val: 'required',
      messenger: 'Input required',
    },
    {
      val: 'minlength',
      messenger: 'Ít nhất cũng phải hơn 4 ký tự',
    },
    {
      val: 'email',
      messenger: 'Please enter a valid email address',
    },
  ];
  public errorMessenger: any = {};
  public checkOutForm!: FormGroup;
  public cityList: any = [
    {
      city: 'United States',
      value: 'usd',
    },
    {
      city: 'United Kingdom',
      value: 'uk',
    },
    {
      city: 'Germany',
      value: 'ger',
    },
    {
      city: 'France',
      value: 'fra',
    },
    {
      city: 'India',
      value: 'indi',
    },
    {
      city: 'Australia',
      value: 'aus',
    },
    {
      city: 'Brazil',
      value: 'braz',
    },
    {
      city: 'Canada',
      value: 'cana',
    },
    {
      city: 'Viet Nam',
      value: 'viet',
    },
  ];
  public controlname = {
    firstName: 'firstName',
    lastName: 'lastName',
    company: 'company',
    email: 'email',
    city: 'city',
    address: 'address',
    town: 'town',
    zipcode: 'zipcode',
    phoneNumber: 'phoneNumber',
    comment: 'comment',
    isCreateNewAccount: 'isCreateNewAccount',
    shipToAdiffrentAddress: 'shipToAdiffrentAddress',
    paymentMethod: 'paymentMethod',
  };
  public totalPrice = 0;
  constructor(
    private formBd: FormBuilder,
    private router: Router,
    private dataSV: GetDataService,
    private dataSv: GetDataService
  ) {}
  private formInit() {
    this.checkOutForm = this.formBd.group({
      [this.controlname.firstName]: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      [this.controlname.lastName]: ['', Validators.required],
      [this.controlname.company]: ['', Validators.required],
      [this.controlname.email]: ['', [Validators.required, Validators.email]],
      [this.controlname.city]: ['usd', Validators.required],
      [this.controlname.address]: ['', Validators.required],
      [this.controlname.town]: ['', Validators.required],
      [this.controlname.zipcode]: ['', Validators.required],
      [this.controlname.phoneNumber]: ['', Validators.required],
      [this.controlname.comment]: [''],
      [this.controlname.isCreateNewAccount]: [false, Validators.required],
      [this.controlname.shipToAdiffrentAddress]: [false, Validators.required],
      [this.controlname.paymentMethod]: ['', Validators.required],
    });
  }
  public submit() {

    if (!this.checkOutForm.valid) {
      this.onSubmitFormGroup();
    } else {
      let data  = {
        ...this.checkOutForm.value,
        priceTotal:this.totalPrice
      }
      this.dataSV.checkOut(data);

      alert('ákdhkasd');
      this.router.navigate(['checkout', 'success']);
    }
  }
  public getControlName(value: any) {
    return this.checkOutForm.get(value)!;
  }
  public showError(controlNameValue: any) {
    let controlName = this.checkOutForm.get(controlNameValue)!;
    controlName.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      let aaa = this.checkError(controlNameValue);
      this.errorMessenger[controlNameValue] = aaa;
    });
  }
  public checkError(controlNameValue: any) {
    let controlName = this.checkOutForm.get(controlNameValue)!;
    if (controlName.invalid && (controlName.dirty || controlName.touched)) {
      for (let item of this.messengeError) {
        if (controlName.errors?.[item.val]) {
          return item.messenger;
        }
      }
    } else {
      return;
    }
  }
  public getPaymentmethod(value: any) {
    this.checkOutForm.get(this.controlname.paymentMethod)?.patchValue(value);
  }
  public onSubmitFormGroup(): void {
    const me = this;
    me.checkOutForm.markAllAsTouched();
    me.checkOutForm.markAsDirty();
    me.checkOutForm.updateValueAndValidity();
    Object.keys(me.checkOutForm.controls).map((controlName) => {
      this.showError(controlName);
      const control = me.checkOutForm.get(controlName);
      control?.markAsDirty();
      control?.markAllAsTouched();
      control?.updateValueAndValidity();
    });
  }
  public async getCart() {
    JSON.parse(await this.dataSv.getCart()).forEach((item: any) => {
      this.dataSv
        .getSingleProduct(item.productId)
        .pipe(
          tap((_res) => {
            item = {
              ...item,
              productId: _res,
            };

            this.totalPrice += item.qty * item.productId.price;
          })
        )
        .subscribe({ complete: () => {} });
    });
  }
  private focusElementInvalid(): void {}
  public checkCounty(value: any) {
    if (value == 'viet') {
      this.checkOutForm.get(this.controlname.zipcode)?.clearValidators();
    } else {
      this.checkOutForm
        .get(this.controlname.zipcode)
        ?.setValidators([Validators.required]);
      this.checkOutForm.get(this.controlname.zipcode)?.updateValueAndValidity();
    }
  }
  ngOnInit(): void {
    this.formInit();
    let controlName = this.checkOutForm.controls;
    Object.keys(controlName).map((item: any) => {
      this.errorMessenger[item] = '';
      // this.checkError(this.checkOutForm.get(item))
    });
    this.getCart();
  }
}
