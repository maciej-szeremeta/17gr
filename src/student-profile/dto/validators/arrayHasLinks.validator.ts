import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from 'class-validator';
import { config, } from '../../../app.utils';

@ValidatorConstraint()
export class ArrayHasLinks implements ValidatorConstraintInterface {
  public async validate(authData: any[], args: ValidationArguments) {

    // console.log(authData);
    const url = config.validation.http;
    return authData.every(x => 
      url.test(x));
  }
}