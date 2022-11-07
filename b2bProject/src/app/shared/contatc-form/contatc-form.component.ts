
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms'
import axios from "axios";


@Component({
  selector: 'app-contatc-form',
  templateUrl: './contatc-form.component.html',
  styleUrls: ['./contatc-form.component.css']
})
export class ContatcFormComponent implements OnInit {
  FormData: FormGroup |any ;
  answer:string=""
  spinner:boolean = false;
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Subject:new FormControl('',[Validators.required]),
      Comment: new FormControl('', [Validators.required])

    });
  }


  onSubmit(FormData:any) {
    this.spinner = true;
    console.log(FormData)
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/mail.php",{

      from_mail: FormData.Email,
      subject : FormData.Subject,
      message: FormData.Comment,
      name:FormData.Fullname
    }).then(resData=> {
      setTimeout(()=>{
        this.spinner = false
        this.answer = resData.data.message
        this.FormData = this.builder.group({
          Fullname: new FormControl('', [Validators.required]),
          Email: new FormControl('', [Validators.required]),
          Subject:new FormControl('',[Validators.required]),
          Comment: new FormControl('', [Validators.required])

        });
        setTimeout(()=>{
            this.answer="";
        },1000)
      },500)



      console.log(resData.data)
    })

  }
}
