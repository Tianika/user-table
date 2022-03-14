import { createTable } from '../components/userTable';
import { userTableDraw, getUsers } from '../components/userTableComponent';

export const app = async () => {
  const root = document.querySelector('.root');

  const table = userTableDraw();
  root.appendChild(table);

  const users = await getUsers();
  console.log(users);
  createTable(users);
};

export default app;
