import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiCallService ,} from '../Services/api-call.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  @Output() searchUser = new EventEmitter<any>();

  public loggedIn = false;
  public role!: string; 
  
  constructor(private login:ApiCallService, private router:Router){}
  
    user= this.login.getObject();
    // console.log("role navbar : ",this.role);
    
    ngOnInit(): void {
      this.loggedIn = this.login.isLogin();
      // console.log("navbar ",this.loggedIn);
    }
    
    getRole(){
      this.role = this.user.authorities[0].authority
          return this.role;
   }

   usersDetails(){
    window.location.href = 'http://localhost:4200/users';
   }

  logoutUser(){
    this.login.logout();
    this.router.navigate(["/login"])
  }

  onChangeSearch(val:any){
    this.searchUser.emit(val.target.value);
  }

}
