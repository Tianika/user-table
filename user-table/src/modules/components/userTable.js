import { SORT_BTNS, TABLE_HEADERS } from '../utils/constants';

export const tableDraw = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-container');

  const sortButtons = document.createElement('div');
  sortButtons.classList.add('sort-btns-container');

  const headerBtns = document.createElement('span');
  headerBtns.innerText = 'Сортировка: ';
  sortButtons.appendChild(headerBtns);

  SORT_BTNS.forEach((item) => {
    const button = document.createElement('button');
    button.classList.add('sort-btn');
    button.classList.add(item.class);
    button.innerText = item.text;

    sortButtons.appendChild(button);
  });

  tableWrapper.appendChild(sortButtons);

  const table = document.createElement('table');
  table.classList.add('table');

  const tableHeader = document.createElement('tr');
  tableHeader.classList.add('table-header');

  TABLE_HEADERS.forEach((header) => {
    const th = document.createElement('th');
    th.innerText = header;

    tableHeader.appendChild(th);
  });

  table.appendChild(tableHeader);

  tableWrapper.appendChild(table);

  return tableWrapper;
};

const createUser = (user, tableRow) => {
  const options = { year: '2-digit', month: '2-digit', day: '2-digit' };

  const name = document.createElement('td');
  name.innerText = user.username;
  tableRow.appendChild(name);

  const email = document.createElement('td');
  email.innerText = user.email;
  tableRow.appendChild(email);

  const regData = document.createElement('td');
  const date = new Date(user.registration_date);
  regData.innerText = date.toLocaleDateString('ru', options);
  tableRow.appendChild(regData);

  const rating = document.createElement('td');
  rating.innerText = user.rating;
  tableRow.appendChild(rating);

  const button = document.createElement('button');
  button.classList.add('delete-user-btn');
  button.dataset.id = user.id;
  tableRow.appendChild(button);
};

export const createTable = (users) => {
  const table = document.querySelector('.table');

  const max = users.length < 5 ? users.length : 5;

  for (let i = 0; i < max; i += 1) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('user-data');

    createUser(users[i], tableRow);

    table.appendChild(tableRow);
  }
};

export const clearTable = () => {
  const table = document.querySelector('.table');
  const users = table.querySelectorAll('.user-data');

  users.forEach((user) => {
    table.removeChild(user);
  });
};
