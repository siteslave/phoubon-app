import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class Encrypt {
  secretKey: string = '1234567890';

  constructor(public http: Http) { }
  
  encrypt(plaintext) {
    var ciphertext = CryptoJS.AES.encrypt(plaintext, this.secretKey);
    return ciphertext.toString();
  }

  decrypt(encryptText) {
    var bytes  = CryptoJS.AES.decrypt(encryptText, this.secretKey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }

}
