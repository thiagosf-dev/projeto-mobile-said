export interface IUserData {
  email: string;
  name: string;
  password: string;
}

export interface ILoginData {
  hasUserLogged: boolean;
  users: IUserData[];
  userLogged: IUserData;
}

export const LOGIN_DATA: ILoginData = {
  hasUserLogged: true,
  userLogged: {
    email: "admin@admin.com",
    name: "admin",
    password: "admin",
  },
  users: [
    {
      email: "admin@admin.com",
      name: "admin",
      password: "admin",
    },
  ],
};
