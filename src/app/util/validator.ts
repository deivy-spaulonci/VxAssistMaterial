import { AbstractControl } from '@angular/forms';

export class Validator {

	public dateValidator(c: AbstractControl): { [key: string]: boolean } {
		let value = c.value;
		if (value && typeof value === "string") {
			let match = value.match(/^(?:(?:31([-\/.]?)(?:0[13578]|1[02]))\1|(?:(?:29|30)([-\/.]?)(?:0[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29([-\/.]?)02\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))))$|^(?:0[1-9]|1\d|2[0-8])([-\/.]?)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/);
			if (!match) {
				return { 'dateInvalid': true };
			} else if (match && match[0] !== value) {
				return { 'dateInvalid': true };
			}
		}
		return null;
  	}
}
