import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],host:{'class':'col-12 col-lg-8'}
})
export class CheckoutFormComponent implements OnInit {

  constructor(private formBd: FormBuilder) {}

  ngOnInit(): void {
    
  }
}
