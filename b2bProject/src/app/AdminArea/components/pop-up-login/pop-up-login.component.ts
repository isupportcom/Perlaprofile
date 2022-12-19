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
      switch (this.id) {
        case 1 :
        case 2 : this.api = "https://perlarest.vinoitalia.gr/php-auth-api/users.php/?id=4&method=TRDR";break;
        case 3 :
        case 4 : this.api = "https://perlarest.vinoitalia.gr/php-auth-api/updateProducts.php/?id=1&method=MTRLUPDATE";break;
        case 5 :
        case 6 :this.api = "https://perlarest.vinoitalia.gr/php-auth-api/subcategories.php/?id=6&method=SUBCATEGORIES&method1=CATEGORIES";break;
        case 7 : this.api = "https://perlarest.vinoitalia.gr/php-auth-api/users.php";break;
        case 12 : this.api = "https://perlarest.vinoitalia.gr/php-auth-api/fabric.php";break;

      }
      this.spinnerVis = true;
      console.log(this.f.username.value)
      console.log(this.f.password.value)
      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/login.php/",{
        name:this.f.username.value,
        password:this.f.password.value
      }).then(resData=>{
        if(resData.data.success == 1 ){
          console.log(this.api)
          if(this.id==12){
              axios.post(this.api,{method:"XROMAYFASMATOS"})
              .then(resData=>{
                axios.post("https://perlarest.vinoitalia.gr/php-auth-api/polydrox_color.php",{method:"XROMATAPOLYDROX"})
                .then(resData=>{
                  axios.post("https://perlarest.vinoitalia.gr/php-auth-api/profile_colors.php",{method:"XROMAPROFIL"})
                  .then(resData=>{
                    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/ral_color.php",{method:"XROMATARAL"})
                    .then(resData=>{
                      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/wooden_colors.php",{method:"XROMAKSULO"})
                      .then(resData=>{
                        this.answer = "Mosqui Colors Updated";
                        console.log(resData.data);
                        this.spinnerVis = false;
                      setTimeout(()=>{
                      window.location.reload()
                    },1000);
                      })
                    })
                  })
                })
              })
          }else if(this.id == 7){
              axios.post(this.api,{method:"LOGIN"})
              .then(resData=>{
                console.log(resData.data);
                axios.post("https://perlarest.vinoitalia.gr/php-auth-api/upokatastimata.php",{method:"YPOKATASTIMATA"})
                .then(resData=>{
                  console.log(resData.data);
                  axios.post("https://perlarest.vinoitalia.gr/php-auth-api/timi_ana_pelati_eidos.php",{method:"TIMOLOGIAKI102"})
                  .then(resData=>{
                    console.log(resData.data);
                    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/ekptoseis_ana_ypokat_exalco.php",{method:"TIMOLOGIAKI3"})
                    .then(resData=>{
                      console.log(resData.data);
                      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/timi_ana_pelati_omada_eidous.php",{method:"TIMOLOGIAKI2"})
                      .then(resData=>{
                        console.log(resData.data)
                        axios.post("https://perlarest.vinoitalia.gr/php-auth-api/katigoria_pelati_omada_eidous_geo_zoni.php",{method:"TIMOLOGIAKI1"})
                        .then(resData=>{
                          console.log(resData.data);
                          axios.post("https://perlarest.vinoitalia.gr/php-auth-api/ekptosi.php",{method:"TIMOLOGIAKI101"})
                          .then(resData=>{
                            console.log(resData.data);
                            this.spinnerVis = false;
                            console.log(resData.data);
                            this.answer = "Users Updated";
                            setTimeout(()=>{
                              window.location.reload();
                            },1000);
                          })
                        })
                      })
                    })
                  })
                })

              })
            }
          else{
          axios.get(this.api)
            .then(resData=>{
              if(this.id == 4){
                axios.post("https://perlarest.vinoitalia.gr/php-auth-api/mosquiProducts.php",{method:"MTRUPDATEMOSQUI"})
                .then(resData=>{
                  console.log(resData);
                  axios.post("https://perlarest.vinoitalia.gr/php-auth-api/relatedProducts.php",{
                    method:"RELATEDMTRL"
                  }).then(resData=>{
                    axios.post('https://perlarest.vinoitalia.gr/php-auth-api/forceStockUpdate.php',{
                      method:"STOCKUPDATE2"
                    }).then(resData=>{
                      axios.post('https://perlarest.vinoitalia.gr/php-auth-api/products_related.php',{method:"SUGMTRL"})
                      .then(resData=>{
                        this.answer = resData.data.message;
                        console.log(this.answer)
                        this.spinnerVis = false;
                        setTimeout(()=>{
                          window.location.reload()
                        },1000);
                      })

                    })

                  })
                })

              }
              else{
                this.answer = resData.data;
                console.log(this.answer)
                this.spinnerVis = false;
                setTimeout(()=>{
                  window.location.reload()
                },1000);
              }

            })
          }
        }else{
          this.answer = "Invalid Cridentials";
          this.isError = true;
          this.spinnerVis = false;

      }
      })



      }
    }

}
