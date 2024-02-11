import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { UserHomeComponent } from './Home/user-home/user-home.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './Services/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  
    {
        path:"",
        component:HomepageComponent,
        title:"Home"
    },
    {
        path:"login",
        component:LoginComponent,
        title:"Login"
    },
    {
        path:"signUp",
        component:SignUpComponent,
        title:"Sign Up "
       
    },
    {
        path:"userProfile",
        component:UserHomeComponent,
        title:"User",
        canActivate:[authGuard]
    },
    {
        path:"users",
        component:UsersComponent,
        title:"Users",
        canActivate:[authGuard]
    },
    

];
