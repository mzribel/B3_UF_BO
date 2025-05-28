// TypeScript interfaces for the application

export interface Coat {
  color: string;
  pattern: string;
}

export interface Cat {
  id: number;
  name: string;
  birthDate: string;
  gender: string;
  coat: Coat;
}

export interface NewCat {
  name: string;
  birthDate: string;
  gender: string;
  coat: Coat;
}