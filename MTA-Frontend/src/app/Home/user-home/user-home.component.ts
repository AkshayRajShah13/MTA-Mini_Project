import { Component, Input, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ApiCallService } from '../../Services/api-call.service';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { SharedService } from '../../Services/shared-service.service';

@Component({
    selector: 'app-user-home',
    standalone: true,
    templateUrl: './user-home.component.html',
    styleUrl: './user-home.component.css',
    imports: [NavbarComponent, FooterComponent, RouterLink, ReactiveFormsModule],
})
export class UserHomeComponent implements OnDestroy {
    user: any;

    // Inside your component class
    // editProfileForm = new FormGroup({
    //     userId: new FormControl(''),
    //     firstName: new FormControl(''),
    //     middleName: new FormControl(''),
    //     lastName: new FormControl(''),
    //     email: new FormControl(''),
    //     dob: new FormControl(''),
    //     gender: new FormControl(''),
    //     country: new FormControl(''),
    //     currentLocation: new FormControl(''),
    //     mobile: new FormControl(''),
    //     prefered_location: new FormControl(''),
    // });

    editProfileForm: FormGroup;
    submitted = false;
    // action:any
    action:any = localStorage.getItem('action');

    constructor(
        private sharedService: SharedService,
        private api: ApiCallService,
        private router: Router
    ) { 
            this.editProfileForm = new FormGroup({
            userId: new FormControl(''),
            firstName: new FormControl(''),
            middleName: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl(''),
            dob: new FormControl(''),
            gender: new FormControl(''),
            country: new FormControl(''),
            currentLocation: new FormControl(''),
            mobile: new FormControl(''),
            prefered_location: new FormControl(''),
          });
      
       
    }

    ngOnDestroy(): void {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('action');
    }

    ngOnInit() {
        this.action = localStorage.getItem('action');
        this.sharedService.currentUser.subscribe((data) => {
            if (data !== null) {
              this.user = data;
            } else {
              const storedUser = localStorage.getItem('userProfile');
              
              if (storedUser) {
                  this.user = JSON.parse(storedUser);
                
              }
            }
        })
    }


    // console.log(this.user);
    
    // onSubmit() {
    //     this.submitted = true;

    //     this.api.update(this.editProfileForm.value)
    //     .subscribe({
    //         next:() =>{
    //             alert('User profile updated successfully');
    //             // window.location.reload()
    //             this.submitted = false
    //             this.user.mobile = this.editProfileForm.value.mobile
    //             this.user.firstName = this.editProfileForm.value.firstName
    //             this.user.lastName = this.editProfileForm.value.lastName
    //             this.user.middleName = this.editProfileForm.value.middleName
    //             this.user.email = this.editProfileForm.value.email
    //             this.user.gender = this.editProfileForm.value.gender
    //             this.user.currentLocation = this.editProfileForm.value.currentLocation
    //             this.user.country = this.editProfileForm.value.country
    //             this.user.prefered_location = this.editProfileForm.value.prefered_location
    //             this.user.dob = this.editProfileForm.value.dob
    //             this.user.password = this.editProfileForm.value.password

    //           },
    //           error:()=>{
    //             alert('user updation failed...');
    //             window.location.reload()
    //           }
    //     })

    //  }

    // update user Profile
    update() {
        // let user = this.users.find((user:any) => user.userId == this.usr.userId)
        // console.log(user);

        this.api.updateUser(this.editProfileForm.value).subscribe({
            next: () => {
                alert('User profile updated successfully');

                this.user.mobile = this.editProfileForm.value.mobile
                this.user.firstName = this.editProfileForm.value.firstName
                this.user.lastName = this.editProfileForm.value.lastName
                this.user.middleName = this.editProfileForm.value.middleName
                this.user.email = this.editProfileForm.value.email
                this.user.gender = this.editProfileForm.value.gender
                this.user.currentLocation = this.editProfileForm.value.currentLocation
                this.user.country = this.editProfileForm.value.country
                this.user.prefered_location = this.editProfileForm.value.prefered_location
                this.user.dob = this.editProfileForm.value.dob



                let test = document.getElementById("exampleModalCenter1")
                test?.click()

                // window.location.reload();
            },
            error: (error: any) => {
                console.log(error);
                alert('user updation failed...');
                // window.location.reload()
            },
        });
    }

    getUser() {
        this.editProfileForm.patchValue({
            userId: this.user.userId,
            mobile: this.user.mobile,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            middleName: this.user.middleName,
            email: this.user.email,
            gender: this.user.gender,
            currentLocation: this.user.currentLocation,
            country: this.user.country,
            prefered_location: this.user.prefered_location,
            dob: this.user.dob,
            // password : data.password
        });
    }



}
