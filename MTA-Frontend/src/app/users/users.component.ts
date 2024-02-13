import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ApiCallService } from '../Services/api-call.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../Services/shared-service.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

 editProfileForm = new FormGroup({
    userId: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('',Validators.required),
    dob: new FormControl(''),
    gender: new FormControl(''),
    country: new FormControl(''),
    currentLocation: new FormControl(''),
    mobile: new FormControl(''),
    prefered_location:  new FormControl('')
 })


 
  constructor(private sharedService: SharedService,private router: Router,private api:ApiCallService){
    
  }
  
  usr:any={}
  
  users: any;
  filterUsers :any

  
  // fetch users on loading the page...
  ngOnInit(): void {
    
    this.api.getAllUsers().subscribe({
      next:data =>{
        // console.log(data); 
        this.users = data;
        this.filterUsers = data;
        // console.log("users : ",this.users); 
      }, 
      error:error=>{
        console.log(error);
      }
    })
    
   
    }

  // delete user 
  delUser(id:number){
    this.api.deleteUser(id).subscribe({
      next:(data: any) =>{  
        alert('User Deleted successfully');
        window.location.reload()
      }, 
      error:(error:any)=>{
        alert('user updation failed...');
        window.location.reload()
      }
    })
  }


  // get user from the id...
  id:any
  getId(value:any){
    this.id = value
  }

  // get user...
  getUser(id:number,text:string){
    this.api.getUserById(id).subscribe({
      next:(data: any) =>{  
        // console.log(data);
        // this.router.navigate(["'userProfile'"])
      
        this.sharedService.changeUser(data,text); // Use shared service to change the user
        // this.router.navigate(["userProfile"]);

      }, 
      error:(error:any)=>{
        console.log(error);
      }
    })
  }

  // search box...
  searchUser(data:any){
    // console.log(data);
   this.users = this.filterUsers.filter((x:any) => x.firstName.toLowerCase().includes(data.toLowerCase())
  || x.email.toLowerCase().includes(data.toLowerCase())
   )
    
  }

}
