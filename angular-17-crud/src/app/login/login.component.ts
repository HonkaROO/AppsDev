// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showCamera: boolean = false;
  selectedFile: File | null = null;

  constructor(private authService: AuthService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onPasswordLogin() {
    this.authService.passwordLogin(this.username, this.password).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }

  onFaceLogin() {
    this.showCamera = true;
  }

  handleImageCapture(webcamImage: WebcamImage) {
    const imageBlob = this.dataURItoBlob(webcamImage.imageAsDataUrl);
    const imageFile = new File([imageBlob], 'capture.jpg', { type: 'image/jpeg' });

    this.authService.faceLogin(imageFile).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
    this.showCamera = false;
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
