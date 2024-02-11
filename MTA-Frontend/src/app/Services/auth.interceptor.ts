import {  HttpInterceptorFn} from "@angular/common/http";
import {  inject } from "@angular/core";
import { ApiCallService } from "./api-call.service";



export const AuthInterceptor: HttpInterceptorFn =(req,next)=>{
    
    // constructor(private loginApi: ApiCallService){}
    const api = inject(ApiCallService)
    let url = req.url;
    const token = api.getToken()
    // console.log("token :" ,token);
    // console.log("user :" ,api.getObject());
    // console.log("logged in  :" ,api.isLogin());
    
    const authReq = req.clone({
        headers:req.headers.set('Authorization',`Bearer ${token}`)
    })

    return next(authReq);

}
