import userTableDraw from '../components/userTable';

export const app = () => {
  const root = document.querySelector('.root');

  const table = userTableDraw();
  root.appendChild(table);
};

export default app;
