import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from 'class-validator';

@ValidatorConstraint({ async: true, })
export class isGitHubUser implements ValidatorConstraintInterface {
  public async validate(authData: any[], args: ValidationArguments) {

    const res = await (await fetch(`https://api.github.com/users/${authData}`)).json();
    return res?.message === 'Not Found' ? false : true;
  }
}