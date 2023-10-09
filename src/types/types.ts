export type Account = {
  id: number;
  username: string;
  role: number;
};

export type City = {
  id: number;
  name: string;
  modified_at: Date;
};

export type Center = {
  id: number;
  name: string;
  cp: number;
  adress: string;
  id_city: number;
  modified_at: Date;
};

export type Room = {
  id: number;
  name: string;
  date_start: Date;
  date_end: Date;
  infos: string;
  formation_name: string;
  id_employee: number;
  id_center: number;
  empty: boolean;
};

export type Employee = {
  id: number;
  firstname: string;
  lastname: string;
  formation: string;
  phone: string;
  email: string;
};

export type Key = {
  id: number;
  id_employee: number;
  id_center: number;
};
