import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private httpClient:HttpClient, private router:Router) { }

  //--- get all users................
  getAllUsers(){
    return this.httpClient.get(`${environment.apiUrl}/user/gets`)
  }

 /*  login(userName:string,  password:string, role:string)
  {
    console.log(userName,password,role);
  } */

  //--- login Authentication.............. 
  login(data:any):Observable<Object> | any
  {
    // console.log(data);
    if (data.role=="Admin") {
      // console.log(data);
      return  this.httpClient.post(`${environment.apiUrl}/admin/login`,data)
    } else if (data.role=="User"){
      console.log(data);
      return this.httpClient.post(`${environment.apiUrl}/user/login`,data)
    }else{
      return "Invalid Selection";
    }
  }

  //get token...
  getToken(){
    return localStorage.getItem("token");
  }

  //get Object
    // Retrieve an object from localStorage
  getObject(): any | null {
    try {
      const usr = localStorage.getItem('user');
      return usr ? JSON.parse(usr) : null;
    } catch (error) {
      console.error('Error retrieving object from localStorage:', error);
      return null;
    }
  }

  // get Profile Object..
  getObjectProfile(): any | null {
    try {
      const usr = localStorage.getItem('userProfile');
      return usr ? JSON.parse(usr) : null;
    } catch (error) {
      console.error('Error retrieving object from localStorage:', error);
      return null;
    }
  }

  // for login user...
  loginUser(token: any){
    return true;
  }

  // user is logged in or not....
  isLogin(){
    let token =localStorage.getItem("token");
    if( token != null){
      return true;
    }else{
      return false;
    }
  }

  // user logged Out....
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // add user........ 
  signUp(data:any) 
  {
      return  this.httpClient.post(`${environment.apiUrl}/user/add`,data,{responseType:'text'})

  }

  // update user...
  update(data:any):Observable<Object> | any
  {
    let user= this.getObject();
    // console.log("api : ", this.user.authorities[0].authority );
    // console.log("api : ", this.getToken() );
    // console.log("api : ", data);
    // console.log("api : ", this.user.authorities[0].authority);
    if (user.authorities[0].authority == "Admin") {
      // console.log(data);
      return  this.httpClient.put(`${environment.apiUrl}/admin/update`,data)
    } else if (user.authorities[0].authority =="User"){
      console.log("user api :",data);
      return this.httpClient.put(`${environment.apiUrl}/user/update`,data)
    }else{
      return "Invalid Selection";
    }
  }


  //update user only

  updateUser(data:any):Observable<Object> | any{
    return this.httpClient.put(`${environment.apiUrl}/user/update`,data)
  }



  // Delete user....
  deleteUser(id:number):Observable<Object> | any{
      return this.httpClient.delete(`${environment.apiUrl}/user/del/${id}`)
  }

  // get user by id...
  getUserById(id:number){
    return this.httpClient.get(`${environment.apiUrl}/user/get/${id}`)
  } 
  

}
