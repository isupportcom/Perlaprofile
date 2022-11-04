import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import { ModalService } from '../components/add-image-popup/modal-service.service';
import axios from 'axios';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css'],
})
export class AdminAreaComponent implements OnInit {
  flag: boolean = false;
  window: boolean = false;
  offer: boolean = false;
  image: string = '';
  offerprice: any;
  constructor(
    private modalService: ModalService,
    private cartService: CartServiceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.addImagePopup.subscribe((resData) => {
      if (resData == false) {
        this.flag = false;
        this.window = false;
      } else {
        console.log(resData);
        this.flag = true;
        this.window = true;

        this.modalService.image.subscribe((res: any) => {
          this.image = res;
          console.log(resData);

          axios
            .get(
              'https://perlarest.vinoitalia.gr/php-auth-api/updateSingleImage.php/?id=11&mtrl=' +
                resData +
                '&image=' +
                this.image
            )
            .then((res) => {
              console.log(res.data);
            });
         // window.location.reload();
        });
      }
    });

    this.cartService.openOffer.subscribe((resData) => {
      if (resData) {
        this.offer = true;
        console.log(resData);

        console.log(typeof resData.wholesalePrice);
        this.modalService.offer.subscribe((res: number) => {
          if (+res === 0) {
            axios
              .post(
                'https://perlarest.vinoitalia.gr/php-auth-api/deleteOffer.php',
                {
                  mtrl: resData.mtrl,
                }
              )
              .then((resData) => {
                console.log(resData.data);
                setTimeout(() => {
                  window.location.reload();
                }, 800);
              });
          } else {
            localStorage.setItem('discound', JSON.stringify(res));
            this.offerprice =
              +resData.wholesale - (+resData.wholesale * +res) / 100;
            console.log(this.offerprice);
            console.log(typeof resData.mtrl);
            let data = {
              product: resData.mtrl,
              offer: JSON.stringify(this.offerprice),
              discount: res,
              show: 'no',
            };
            console.log(data);
            axios
              .post(
                'https://perlarest.vinoitalia.gr/php-auth-api/offers.php',
                data
              )
              .then((resData) => {
                console.log(resData.data);
                this.modalService.sendProducts(resData.data.products);
                // setTimeout(()=>{
                //   window.location.reload()
                // },100)
              });
          }
        });
      } else {
        this.offer = false;
      }
    });
  }
}
