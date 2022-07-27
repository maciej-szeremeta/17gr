export const config = {
  validation: {
    password:/^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{6,24}$/,
  },
  message: {
    notEmpty: 'Pole nie może być puste',
    length:'Zła długość pola',
    password:'Hasło powinno zawierać jedną dużą przynajmniej jedna mała liter oraz znak specjalny',
  },
};