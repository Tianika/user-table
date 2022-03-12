import userTableDraw from '../components/userTableComponent';

export const app = () => {
  const root = document.querySelector('.root');

  const table = userTableDraw();
  root.appendChild(table);
};

export default app;
