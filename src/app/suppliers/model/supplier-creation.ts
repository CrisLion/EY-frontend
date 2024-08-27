export class SupplierCreation {

    userId: number
    companyName: string
    brandName: string
    taxIdentification: number
    telephoneNumber: string
    email: string
    website: string
    country: string
    annualBillingInDollars: number
  
    constructor() {
      this.userId = 0;
      this.companyName = ""
      this.brandName = ""
      this.taxIdentification = 0
      this.telephoneNumber = ""
      this.email = ""
      this.website = ""
      this.country = ""
      this.annualBillingInDollars = 0
    }
}
