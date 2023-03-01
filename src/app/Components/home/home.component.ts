import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  elementType = NgxQrcodeElementTypes.IMG;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;
  // value = 'https://arunhbk-angulartodo.netlify.app/';
  value = "";

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveAsImage(parent: any) {
    let parentElement = null

    // fetches base 64 data from image
    // parentElement contains the base64 encoded image src
    // you might use to store somewhere
    parentElement = parent.qrcElement.nativeElement.querySelector("img").src

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = "QrCode"
      link.click()
    }

    this._snackBar.open("QR downloaded", '', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000
    });
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }
  // print(id: any) {
  //   window.print()
  // }
}
