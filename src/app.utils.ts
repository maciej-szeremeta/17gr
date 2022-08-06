export const config = {

  // PL - 0
  // EN - 1
  languages: 0,
  validation: {
    password:/^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,24}$/,
  },
  messageValid: {
    notEmpty: [
      (name: string) => 
        `${name} nie może być pusty`,
      (name: string) => 
        `The ${name} field cannot be empty`, ],
    length: [
      'Nie odpowiednia długość pola.',
      'Field length not appropriate.', ],
    string: [
      'Pole powinno być tekstem.',
      'The field should be text.', ],
    number: [
      (name: string) => 
        `${name} powinno być liczbą`,
      (name:string) => 
        `The ${name} should be a number`, ],
    numberMin: [
      (min:number, name:string) => 
        `${name} nie może być mniejsze niż ${min}`,
      (min:number, name:string) => 
        `The ${name} cannot be less than ${min}`, ],
    numberMax: [
      (max:number, name:string) => 
        `${name} nie może być większe niż ${max}`,
      (max:number, name:string) => 
        `The ${name} cannot be greater than ${max}`, ],
    enum: [
      'Brak takiego typu konta.',
      'No such account type.', ],
    email: [
      'Proszę wpisać email.',
      'Please enter your email.', ],
    password:
      [ 'Hasło powinno zawierać przynajmniej jedną dużą, jedną mała liter oraz znak specjalny',
        'The password should contain at least one uppercase, one lowercase letter and a special character', ],
    unique: [
      'Wybrana nazwa jest już zajęta. Wybierz inna nazwę',
      'The selected name is already taken. Please choose another name', ],
  },
  messageErr: {
    loginInvalidData: [
      'Nieprawidłowe dane logowania!',
      'Invalid login data!', ],
    loginIsActive: [
      (email:string) => 
        `Sprawdź skrzynkę mailowa ${email}, na którą wysłaliśmy link aktywacyjny.`,
      (email:string) => 
        `Please check your ${email} mailbox to which we sent the activation link.`,
    ],
  },
  secretKeys: {
    jwt: 'tajemniczy kluczyk',
  },
  configCookie:{
    domain: 'localhost',
    secure: false,
    path: '/',
    httpOnly:true,
  },
  configCors:{
    credentials: true,
    origin:'http://localhost:3000',
  },
};