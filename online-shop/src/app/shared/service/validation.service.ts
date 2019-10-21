import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  priceValidation(formControl: FormControl): { [s: string]: boolean } {
    if (isNaN(formControl.value)) {
      return { thePriceIsNotNumber: true };
    }
    return null;
  }

}
