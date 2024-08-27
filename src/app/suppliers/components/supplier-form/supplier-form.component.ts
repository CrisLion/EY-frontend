import { Component, signal } from '@angular/core';
import { User } from '../../../users/model/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../../../users/services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from '../../model/supplier';
import { SupplierApiService } from '../../services/supplier-api.service';
import { JwtService } from '../../../users/services/jwt.service';
import { SupplierCreation } from '../../model/supplier-creation';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent {

  isEditMode = false;
  supplierForm: FormGroup;
  supplier: Supplier = new Supplier()

  errorMessage = signal('');

  ngOnInit() {
    
    this.checkIfUserLoggedIn()

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.supplierApiService.getSupplierById(parseInt(id)).subscribe(response => {
        this.supplier = response
      });
    } else {
      this.isEditMode = false;
    }
  }

  constructor(private jwtService: JwtService, private router: Router, private route: ActivatedRoute, private supplierApiService: SupplierApiService, private fb: FormBuilder) {
    this.supplierForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(100)]],
      brandName: ['', [Validators.required, Validators.maxLength(50)]],
      taxIdentification: [null, [Validators.required, Validators.min(10000000000), Validators.max(99999999999)]],
      telephoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required, Validators.pattern('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$')]],
      country: ['', Validators.required],
      annualBillingInDollars: [null, [Validators.required, Validators.min(0), Validators.max(99999999.99)]]
    });
  }
  

  getErrorMessage(controlName: string): string {
    const control = this.supplierForm.get(controlName);
    if (control && control.invalid && (control.dirty || control.touched) && control.errors) {
      if (control.errors['required']) {
        return `${controlName} is required.`;
      } else if (control.errors['maxlength']) {
        return `${controlName} cannot be longer than ${control.errors['maxlength'].requiredLength} characters.`;
      } else if (control.errors['min']) {
        return `${controlName} must be at least ${control.errors['min'].min}.`;
      } else if (control.errors['max']) {
        return `${controlName} cannot be more than ${control.errors['max'].max}.`;
      } else if (control.errors['pattern']) {
        return `${controlName} is invalid.`;
      } else if (control.errors['email']) {
        return `Please enter a valid email address.`;
      }
    }
    return '';
  }

  saveSupplier(){
    if (this.isEditMode) {
      this.supplierApiService.putSupplier(this.supplier.id, this.supplier).subscribe(response => {
        console.log(response)
        this.router.navigate(['/suppliers'])
      },
      error => {
        alert("Invalid data")
      })
    } else {
      const userId = this.jwtService.getUserIdFromToken();
      let newSupplier = new SupplierCreation();

      newSupplier.userId = userId;
      newSupplier.companyName = this.supplier.companyName;
      newSupplier.brandName = this.supplier.brandName;
      newSupplier.taxIdentification = this.supplier.taxIdentification;
      newSupplier.telephoneNumber = this.supplier.telephoneNumber;
      newSupplier.email = this.supplier.email;
      newSupplier.website = this.supplier.website;
      newSupplier.country = this.supplier.country;
      newSupplier.annualBillingInDollars = this.supplier.annualBillingInDollars;

      this.supplierApiService.postSupplier(newSupplier).subscribe(response => {
        console.log(response)
        this.router.navigate(['/suppliers'])
      },
      error => {
        alert("Invalid data")
      })
    }

  }

  cancel(){
    this.router.navigate(['/suppliers'])
  }

  checkIfUserLoggedIn(){
    if (window.localStorage.getItem('token') == null) {
      this.router.navigate(['/login'])
    }
  }

}
