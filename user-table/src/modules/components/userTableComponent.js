import { tableDraw } from './userTable';
import userSearchDraw from './userSearch';

export const getUsers = async () => {
  const url = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users';

  const responce = await fetch(url);
  const data = await responce.json();

  return data;
};

export const userTableDraw = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const header = document.createElement('h1');
  header.classList.add('header');
  header.innerHTML = 'Список пользователей';

  wrapper.appendChild(header);

  const search = userSearchDraw();
  wrapper.appendChild(search);

  const table = tableDraw();
  wrapper.appendChild(table);

  return wrapper;
};
