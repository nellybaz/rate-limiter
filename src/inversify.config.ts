import { Container } from "inversify";
import TYPES from '../config/types';


const container = new Container();

// container.bind<UserServivce>(TYPES.UserServivce).to(UserServivce);
// container.bind<IModelFactory>(TYPES.IModelFactory).to(UserModel).whenTargetNamed('userModel');


 
export {container}