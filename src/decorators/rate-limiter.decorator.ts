export function rateLimit (){
  return (target:any, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    const originalFunc = descriptor.value;
    descriptor.value = function(){
      // return 'hi there';
      const request = arguments[0];
      const response = arguments[1];
      
      originalFunc.apply(this, [request, response])
    }
    return descriptor;
  }
}