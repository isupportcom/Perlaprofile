import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(
    private http : HttpClient
  ) { }

  imageUpload(image:File,mtrl:string) : Observable<any>{
    console.log(image)
    var formData :any = new FormData();
    formData.append("fileToUpload",image);

    return this.http.post("https://perlarest.vinoitalia.gr/php-auth-api/image.php/?mtrl="+mtrl,formData,{
      reportProgress:true,
      observe:'events'
    }).pipe(

    )
  }

}
