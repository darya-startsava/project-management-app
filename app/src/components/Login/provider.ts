import { URL } from '$settings/index';

enum Endpoints {
  signUp = 'signup',
  signIn = 'signin',
}

interface IUserAuthorization {
  login: string;
  password: string;
}

interface IUserRegistration extends IUserAuthorization {
  name: string;
}

export async function signUp(user: IUserRegistration): Promise<string> {
  const response = await fetch(`${URL}/${Endpoints.signUp}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data.id;
}

export async function signIn(user: IUserAuthorization): Promise<string> {
  const response = await fetch(`${URL}/${Endpoints.signIn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data.token;
}
