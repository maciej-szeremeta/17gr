export const config = {

  // PL - 0
  // EN - 1
  languages: 0,
  validation: {
    password:/^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,24}$/,
  },
  messageValid: {
    notEmpty: [ 'Pole nie może być puste.', 'The field cannot be empty.', ],
    length:[ 'Nie odpowiednia długość pola.', 'Field length not appropriate.', ],
    string: [ 'Pole powinno być tekstem.', 'The field should be text.', ],
    enum: [ 'Musi zwierać opcję z listy.', 'Must contain an option from the list.', ],
    email: [ 'Proszę wpisać email.', 'Please enter your email.', ],
    password: [ 'Hasło powinno zawierać przynajmniej jedną dużą, jedną mała liter oraz znak specjalny', 'The password should contain at least one uppercase, one lowercase letter and a special character', ],
    unique:[ 'Wybrana nazwa jest już zajęta. Wybierz inna nazwę', 'The selected name is already taken. Please choose another name', ],
  },
  messageErr: {
    
  },
  secretKeys: {
    jwt: 'tajemniczy kluczyk',
  },
  configDomain:{
    domena: 'localhost',
    secure: false,
  },
};