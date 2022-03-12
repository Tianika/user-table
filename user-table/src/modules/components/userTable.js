import userSearchDraw from './userSearch';

const userTableDraw = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const header = document.createElement('h1');
  header.classList.add('header');
  header.innerHTML = 'Список пользователей';

  wrapper.appendChild(header);

  const search = userSearchDraw();
  wrapper.appendChild(search);

  return wrapper;
};

export default userTableDraw;
