import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private httpClient: HttpClient) { }

  postImage(fd : FormData): Observable<string>{
    return this.httpClient.post<string>('http://localhost/phpapi/php-auth-api/image.php/', fd );
  }

  getImage(): Observable<Blob> {
    return this.httpClient.get( 'http://localhost:4000/files/getImage.php', { responseType: 'blob' })
  }

}
