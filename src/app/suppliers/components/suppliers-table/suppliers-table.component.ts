import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SupplierApiService } from '../../services/supplier-api.service';
import { JwtService } from '../../../users/services/jwt.service';
import { Supplier } from '../../model/supplier';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ScreeningDialogComponent } from '../screening-dialog/screening-dialog.component';

@Component({
  selector: 'app-suppliers-table',
  templateUrl: './suppliers-table.component.html',
  styleUrl: './suppliers-table.component.css'
})
export class SuppliersTableComponent {

  displayedColumns: string[] = ['id', 'companyName' ,'brandName', 'taxIdentification', 'telephoneNumber', 'email', 'website', 'country', 'annualBillingInDollars', 'actions'];
  data: Supplier[] = []
  dataSource = new MatTableDataSource<any>();

  constructor(private supplierApiService: SupplierApiService, private jwtService: JwtService, private router: Router, public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.checkIfUserLoggedIn()
    this.getSuppliersByUserId();
  }

  getSuppliersByUserId(){
    const userId = this.jwtService.getUserIdFromToken();
    if (userId) {
      this.supplierApiService.getSuppliersByUserId(userId).subscribe(
        response => {
          this.data = response
          this.dataSource = new MatTableDataSource<any>(this.data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      error => {
        alert("Bad request")
      })
    }
  }

  deleteSupplier(id: number) {
    this.supplierApiService.deleteSupplierById(id).subscribe(
      response => {
        console.log(response)
        this.getSuppliersByUserId();
    },
    error => {
      alert("Bad request")
    })
  }

  logoutUser(){
    window.localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  checkIfUserLoggedIn(){
    if (window.localStorage.getItem('token') == null) {
      this.router.navigate(['/login'])
    }
  }

  getScreening(supplierCompanyName: string){
    this.dialog.open(ScreeningDialogComponent, {
      data: supplierCompanyName,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
