import { Request, Response } from "express";
let count = 0;

export function rateLimit (){
  return (target:any, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    const originalFunc = descriptor.value;
    descriptor.value = function(): any{
      // return 'hi there';
      const request:Request = arguments[0];
      const response:Response = arguments[1];
      
      if(request.method.toUpperCase() == 'POST'){
        
        count +=1;

        if(count > 1) return response.status(429).json({message:'limit exceeded'})
      }
      originalFunc.apply(this, [request, response])
    }
    return descriptor;
  }
}