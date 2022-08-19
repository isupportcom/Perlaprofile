import {Component, Input, OnInit} from '@angular/core';
import axios from "axios";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, tap} from "rxjs/operators";
import {AuthResponseData} from "../../../services/auth.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-pop-up-login',
  templateUrl: './pop-up-login.component.html',
  styleUrls: ['./pop-up-login.component.css']
})

export class PopUpLoginComponent implements OnInit {
  isError:boolean=false;
  showModal: boolean = false;
  registerForm: FormGroup |any ;
  submitted = false;
  spinnerVis:boolean = false;
  answer:string='';
  api:string = '';
  linkForFetch:string = ''
  @Input()button: string |any
  @Input()id:string |any ;
  constructor(private formBuilder: FormBuilder,private http : HttpClient) { }
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
    this.id = +this.id;
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
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
      this.spinnerVis = true;
      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/login.php/",{
        name:this.f.username.value,
        password:this.f.password.value
      }).then(resData=>{
        if(resData.data.success == 1 ){
          axios.get("https://perlarest.vinoitalia.gr/php-auth-api/products.php/?id=1&method=MTRLTEST")
            .then(resData=>{
              this.answer = resData.data;
              console.log(this.answer)
              this.spinnerVis = false;
              setTimeout(()=>{
                window.location.reload()
              },1000);
            })
        }else{
          this.answer = "Invalid Cridentials";
          this.isError = true;
          this.spinnerVis = false;
        }
      })


      }
    }
}
