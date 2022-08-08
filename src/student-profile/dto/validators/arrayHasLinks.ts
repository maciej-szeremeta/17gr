import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from 'class-validator';

@ValidatorConstraint()
export class ArrayHasLinks implements ValidatorConstraintInterface {
  public async validate(authData: any[], args: ValidationArguments) {

    // console.log(authData);
    const url = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    return authData.every(x => 
      url.test(x));
  }
}