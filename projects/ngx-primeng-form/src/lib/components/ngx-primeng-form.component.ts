import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgxPrimengForm, NgxPrimengFormProperty } from '../interfaces/ngx-primeng-form';
import { SelectItem } from 'primeng/api/selectitem';
import { NgxPrimengFormService } from '../services/ngx-primeng-form.service';

@Component({
  selector: 'ngx-primeng-form',
  templateUrl: './ngx-primeng-form.component.html',
  styles: []
})
export class NgxPrimengFormComponent implements OnInit {

  // instance of the froms
  @Input() form: FormGroup;
  // items of control
  @Input() items: NgxPrimengForm[] = [];

  constructor(private service: NgxPrimengFormService) { }

  ngOnInit(): void { }

  trackByControlName(index: number, el: NgxPrimengForm): string {
    return el.controlName;
  }

  getControl(controlName: string): NgxPrimengForm {
    return this.items.find(m => m.controlName.toLowerCase() == controlName.toLowerCase());
  }

  getValidations(controlName: string): ValidatorFn[] {
    const control = this.getControl(controlName);
    if (control && control.validation) {
      return this.service.getValidations(control.validation);
    }
    return [];

  }

  setSelectItems(controlName: string, items: SelectItem[]) {
    this.service.setSelectItems(this.items, controlName, items);
  }

  getProperty<T extends NgxPrimengFormProperty>(controlName: string): T {
    return this.service.getProperty(controlName, this.items);
  }

  //is field required or not
  isRequired(controlName:string): boolean {
    const control = this.form.controls[controlName];
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

}
