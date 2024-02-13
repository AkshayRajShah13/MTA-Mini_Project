import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallService } from '../Services/api-call.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [NavbarComponent,ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        role:new FormControl('Role')
    })

    user:any
    constructor(private api:ApiCallService, private router:Router){}
    
    ngOnInit(): void {
        this.api.logout();
    }


    error:string=""
    loginCheck(){
        // this.api.login(
        //     this.loginForm.value.userName ?? '',
        //     this.loginForm.value.password ?? '',
        //     this.loginForm.value.role ?? '',
        // )
        this.api.login(this.loginForm.value)
        .subscribe({
            next:(data: any) =>{
                this.user =data;
                // console.log(this.user.token); 
                localStorage.setItem("token",data.token);  
                localStorage.setItem("user",JSON.stringify(data.user));  
                this.router.navigate(["/users"])
              }, 
              error:()=>{
                this.error = 'Invalid username or password....';
              }
        })
    }
}
