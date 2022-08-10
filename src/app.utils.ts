export const config = {

  // PL - 0
  // EN - 1
  languages: 0,
  validation: {
    password: /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/,
    http:/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  },
  messageValid: {
    notEmpty: [
      (name: string) => 
        `${name} nie może być pusta.`,
      (name: string) => 
        `The ${name} field cannot be empty`, ],
    length: [
      (min:number, max:number, name:string) => 
        `${name} nie może być mniejsza niż ${min} i większe niż ${max}`,
      (min:number, max:number, name:string) => 
        `${name} cannot be less than ${min} and greater than ${max}`, ],
    string: [
      (name: string) => 
        `${name} powinno być tekstem.`,
      (name:string) => 
        `The ${name} should be a text`, ],
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
      'Brak takiej opcji.',
      'No such option.', ],
    array: [
      'Wartość powinna być tablicą.',
      'The value should be an array.', ],
    email: [
      'Proszę wpisać email.',
      'Please enter your email.', ],
    phoneNumber:[ (phone:string) => 
      `${phone} nie jest numerm z Polski.`, (phone:string) => 
      `${phone} is not a Polish phone number.`, ],
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
    regiserConflictMail: [
      (emails:string[]|string) => 
        `${emails} już istnieje w bazie, wybierz inny email.`,
      (emails:string[]|string) => 
        `${emails} already exists in the database, please select another email.`,
    ],
    idGitHubUser: [
      (gitHubUser:string) => 
        `GithubUser ${gitHubUser} już istnieje w bazie.`,
      (gitHubUser:string[]|string) => 
        `GithubUser ${gitHubUser} already exists in the database.`,
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