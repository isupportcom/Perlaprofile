import {Component, Input, OnInit} from '@angular/core';
import axios from "axios";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
export interface user {
  [index: number]: {
    afm: string,
    code: string,
    doy: string,
    name: string,
    phone1: string,
    phone2: string,
    trdr: string
  }
}
@Component({
  selector: 'app-pop-up-login',
  templateUrl: './pop-up-login.component.html',
  styleUrls: ['./pop-up-login.component.css']
})

export class PopUpLoginComponent implements OnInit {
  showModal: boolean = false;
  registerForm: FormGroup |any ;
  submitted = false;
  @Input()button: any
  constructor(private formBuilder: FormBuilder) { }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
// convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }

  }


}
