import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallService } from '../Services/api-call.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css',
    imports: [NavbarComponent,ReactiveFormsModule]
})
export class SignUpComponent {

    signUpForm:FormGroup = new FormGroup({
        firstName: new FormControl('',Validators.required),
        lastName: new FormControl('',Validators.required),
        email: new FormControl('',Validators.required),
        dob: new FormControl('',Validators.required),
        gender: new FormControl('Gender',Validators.required),
        country: new FormControl('',Validators.required),
        mobile: new FormControl('',Validators.required),
    })

    user:any
    constructor(private api:ApiCallService, private router:Router){}

    error:string=""
    signUp(){
        this.api.signUp(this.signUpForm.value)
        .subscribe({
            next:(data: any) =>{
                alert('User Created successfully');
                // localStorage.setItem("token",data.token);  
                // localStorage.setItem("user",JSON.stringify(data.user));  
                this.router.navigate(["/users"])
              }, 
              error:()=>{
                this.error = 'User Already existed....';
              }
        })
    }

    // signUp(){
    //     this.api.signUp(this.signUpForm.value)
    //     .subscribe(
    //        (data: any) =>{
    //             console.log(data);
                
    //           },error => {
    //             console.log(error);
                
    //           }
            
    //     )
    // }
}
