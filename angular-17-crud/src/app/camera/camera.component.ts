// camera.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @Output() imageCaptured = new EventEmitter<WebcamImage>();

  public capturedImage: WebcamImage | null = null;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string = '';
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };
  public errors: WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.capturedImage = webcamImage;
    this.imageCaptured.emit(webcamImage);
    this.showWebcam = false;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  
  // sendImageToBackend(imageData: string) {
  //   const url = 'http://localhost:8000/api/face-recognition/'; // Replace with your Django back-end URL
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   const body = JSON.stringify({ image_data: imageData });
  
  //   this.http.post(url, body, { headers })
  //     .subscribe(
  //       response => {
  //         console.log('Face recognition response:', response);
  //         // Handle the response from the back-end
  //       },
  //       error => {
  //         console.error('Face recognition error:', error);
  //         // Handle the error
  //       }
  //     );
  // }
}
