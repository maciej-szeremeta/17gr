import { StudentProfile, } from '../student-profile/entities/student-profile.entity';

export enum ExpectedTypeWork {
  NAMIEJSCU = 'Na miejscu',
  GOTOWOSCDOPRZEPROWADZKI = 'Gotowość do przeprowadzki',
  WYLACZNIEZDALNIE = 'Wyłącznie zdalnie',
  HYBRYDOWO = 'Hybrydowo',
  BEZZNACZENIA = 'Bez znaczenia'
}

export enum ExpectedContractType {
  TYLKOUOP = 'Tylko UoP',
  MOZLIWEB2B = 'Możliwe B2B',
  MOZLIWEUZUOD = 'Możliwe UZ/UoD',
  BRAKPREFERENCJI = 'Brak preferencji '
}

export enum StudentStatus {
  DOSTEPNY = 'Dostępny',
  WTRAKCIEROZMOWY = 'W trakcie rozmowy',
  ZATRUDNIONY = 'Zatrudniony',
}

export type CreateUserProfileRes = StudentProfile