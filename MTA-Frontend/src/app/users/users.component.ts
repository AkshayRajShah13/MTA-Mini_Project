import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../Services/api-call.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule],
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
 
  constructor(private router: Router,private api:ApiCallService){
    
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
  getUser(id:number){
    this.api.getUserById(id).subscribe({
      next:(data: any) =>{  
        // console.log(data);
        this.editProfileForm.patchValue({
          userId:data.userId,
          mobile : data.mobile,
          firstName: data.firstName,
          lastName : data.lastName,
          middleName : data.middleName,
          email : data.email,
          gender : data.gender,
          currentLocation : data.currentLocation,
          country : data.country,
          prefered_location : data.prefered_location,
          dob : data.dob,
          // password : data.password
        })
         this.usr = data;
        
      }, 
      error:(error:any)=>{
        console.log(error);
      }
    })
  }

  
  // update user Profile
  update(){
    // let user = this.users.find((user:any) => user.userId == this.usr.userId)
    // console.log(user);

    this.api.updateUser(this.editProfileForm.value)
    .subscribe({
        next:() =>{
            alert('User profile updated successfully');
            window.location.reload()
          }, 
          error:(error:any)=>{
            console.log(error);
            alert('user updation failed...');
            // window.location.reload()
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
