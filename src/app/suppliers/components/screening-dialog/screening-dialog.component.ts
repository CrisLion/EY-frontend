import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WorldBankItem } from '../../model/world-bank-item';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ScreeningApiService } from '../../services/screening-api.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-screening-dialog',
  templateUrl: './screening-dialog.component.html',
  styleUrl: './screening-dialog.component.css'
})
export class ScreeningDialogComponent {

  displayedColumns: string[] = ['firmName', 'address' ,'country', 'ineligibilityPeriodStart', 'ineligibilityPeriodEnd', 'grounds'];
  data: WorldBankItem[] = []
  dataSource = new MatTableDataSource<any>();
  isLoading: boolean = true;

  sources = [
    {value: 'world-bank', viewValue: 'The World Bank'},
    {value: 'ofac', viewValue: 'OFAC'},
  ];

  sourceSelected: string = this.sources[0].value;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialogRef: MatDialogRef<ScreeningDialogComponent>,@Inject(MAT_DIALOG_DATA) public companyName: string, private screeningApiService: ScreeningApiService) {}


  ngOnInit(){
    this.getScreeningByCompanyNameFromWorldBank(this.companyName);
  }

  getScreeningByCompanyNameFromWorldBank(companyName: string){
    this.screeningApiService.getScreeningBySupplierCompanyName(companyName).subscribe(response => {
      this.data = response.worldBankItems
      this.dataSource = new MatTableDataSource<any>(this.data)
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    })
  }

  onSourceChange(event: MatSelectChange) {
    const selectedValue = event.value;
    this.isLoading = true;

    switch (selectedValue) {
      case 'world-bank':
        this.getScreeningByCompanyNameFromWorldBank(this.companyName);
        break;
      case 'ofac':
        console.log('Not implemented yet');
        break;
    }
  }

}
