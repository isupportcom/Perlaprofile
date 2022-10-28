import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadPdfService {

  constructor(private http:HttpClient) { }

  pdfUpload(pdf:File){
    console.log(pdf);
    var formData :any = new FormData();
    formData.append("fileToUpload",pdf);

    return this.http.post("https://perlarest.vinoitalia.gr/php-auth-api/pdf.php",formData,{
      reportProgress:true,
      observe:'events'
    }).pipe()

  }

}
