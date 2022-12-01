import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ModalService } from './modal-service.service';
import axios from 'axios';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-image-popup',
  templateUrl: './add-image-popup.component.html',
  styleUrls: ['./add-image-popup.component.css'],
})
export class AddImagePopupComponent implements OnInit {



  @Input() secondary?: boolean;
  @Input() general?: boolean;
  @Input() mtrl?: string;
  product?: any;
  isClicked: boolean = true;
  imagesArr :string|any= [];
  searchPhoto: FormGroup | any;
  constructor(
    private cartService: CartServiceService,
    private modalService: ModalService,
    private fb:FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  images: string | any = [];
  imagesNames: string[] = [];
  imagesToSend: string[] = [];
  thumbnail?: string;

  ngOnInit(): void {
    console.log('general = ' + this.general);
    console.log('secondary = ' + this.secondary);

    axios.post('https://perlaNodeRest.vinoitalia.gr/products/getSingle',{
      mtrl: this.mtrl
    }).then(resData => {
      console.log(resData.data.product);
      this.product = resData.data.product;
    })
    
    // https://perlaNodeRest.vinoitalia.gr/products/
    this.searchPhoto = this.fb.group({

      imageName:[null]

    })

    axios
      .get(
        'https://perlarest.vinoitalia.gr/php-auth-api/getImages.php/?id=9&method=allImages'
      )
      .then((photoName) => {
        console.log(photoName);

        for (let i = 0; i < photoName.data.length; i++) {
          this.imagesNames.push(photoName.data[i].image)
          this.images[i] =
            'https://perlarest.vinoitalia.gr/php-auth-api/upload/' +
            photoName.data[i].image;
        }
      });
  }
  sendNUDES(image: string,container: any) {

    if(!container.classList.contains('selected')){
      if(this.secondary || this.general){
        //gia secondary images
        this.imagesToSend.push(image);
        this.renderer.addClass(container, 'selected');
      }
      else{
        // gia thumbnail
        let selectedImages = document.getElementsByClassName('selected');
        if(selectedImages.length > 0){
          for(let i=0;i<selectedImages.length;i++){
            this.renderer.removeClass(selectedImages[i],'selected');
          }
          this.renderer.addClass(container, 'selected');
          this.thumbnail = image;
        }
        else{
          this.renderer.addClass(container, 'selected');
          this.thumbnail = image;
        }
      }
    }
    else{
      if(this.secondary || this.general){
        this.renderer.removeClass(container, 'selected');
        this.imagesToSend.forEach((img,index) => {
          if(image === img){
            this.imagesToSend.splice(index,1);
          }
        })
      }
      else{
        this.renderer.removeClass(container, 'selected');
        this.thumbnail = undefined;
      }


    }
    console.log(this.imagesToSend);

    // container.style.border = '2px solid #6dae49'

    // this.modalService.sendImage(image);
    // this.cartService.sendAddImagePopup(false);
  }

  deleteThumbnail(btn:any){
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {

        axios.post('https://perlanoderest.vinoitalia.gr/products/removeThumbnail',{
          mtrl: this.mtrl
        })

        btn.classList.remove('loading')
        this.cartService.sendAddImagePopup(false);
      },2000)
    }
  }

  async insertImages(btn: any){

    if(this.general){
      if(!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => {
          let joinedImagesArray =this.imagesToSend.join(',')
          axios.post('https://perlarest.vinoitalia.gr/php-auth-api/deleteImage.php',{
            "image_name":joinedImagesArray
          }).then(resData => {
            console.log(resData.data);
            
            let tempImages = [];
            for(let img of resData.data.images){
              tempImages.push('https://perlarest.vinoitalia.gr/php-auth-api/upload/' + img);
            }
            this.images = [];
            this.images = tempImages;
          })
          btn.classList.remove('loading')

        },1500)
      }

    }
    else{
      console.log("TSATSA");
      if(!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(async () => {
          if(this.secondary){
            let joinedImagesArray =this.imagesToSend.join(',')

           await axios.post("https://perlaNodeRest.vinoitalia.gr/products/secondaryImages",{
              mtrl:this.mtrl,
              img:  joinedImagesArray,
              mode:"insert"
            }).then(res=>{
              console.log(res)

            })
            this.imagesToSend = [];
            this.modalService.sendImage(joinedImagesArray);
            btn.classList.remove('loading')
            this.cartService.sendAddImagePopup(false);
          }
          else{


            if(this.thumbnail){
              console.log(this.thumbnail);
              console.log(this.mtrl);

              // let splitted = this.thumbnail.split('/')
              // console.log(splitted);

             await axios
              .post(
                'https://perlanoderest.vinoitalia.gr/products/updateSingleImage' ,{
                  mtrl:this.mtrl,
                  image:this.thumbnail
                }

              )
              .then((res) => {
                console.log(res.data);
                btn.classList.remove('loading')
                this.cartService.sendAddImagePopup(false);
              });
            }
          }

        }, 1500);
      }
    }

  }

  searchPhotoByName(){
    console.log(this.searchPhoto.value.imageName)

    if(this.searchPhoto.value.imageName == null){

      axios
      .get(
        'https://perlarest.vinoitalia.gr/php-auth-api/getImages.php/?id=9&method=allImages'
      )
      .then((photoName) => {
        console.log(photoName);

        for (let i = 0; i < photoName.data.length; i++) {
          this.imagesNames.push(photoName.data[i].image)
          this.images[i] =
            'https://perlarest.vinoitalia.gr/php-auth-api/upload/' +
            photoName.data[i].image;
        }
      });
    }
    else{
      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/searchPhoto.php",{
        search:this.searchPhoto.value.imageName
      })
      .then(photoName=>{
        console.log(photoName);
        this.imagesNames = [];
        this.images = [];
        // this.images[0] = photoName.data.search;
        for(let image of photoName.data.images){

          this.images.push(image.image);
          this.imagesNames.push(image.name);
        }
      })



      this.searchPhoto.reset();
    }


  }
  close() {
    if (this.secondary) {

      this.cartService.sendAddImagePopup(false);
      // window.location.reload();
    } else {
      this.cartService.sendAddImagePopup(false);
    }
  }
}
