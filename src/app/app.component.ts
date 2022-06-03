import { Component , ViewChild,
  ElementRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Accesscanner';
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  qrResultString: any;
  ngOnInit() {

    console.log(this.decryptData('U2FsdGVkX18gWBgfOQmaHXn66BJ2fG9bdoQSZA38g+8='))
  }

  decryptData(data:any) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, "PBKDF2WithHmacSHA256");
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  clearResult(): void {
    this.qrResultString = '';
  }

  onCodeResult(resultString:any) {
    this.qrResultString=JSON.parse(resultString);
    this.qrResultString.UniqueserialNumber = this.decryptData(this.qrResultString.UniqueserialNumber);

  }
}
