import { SORT_BTNS, TABLE_HEADERS, USER_PER_PAGE } from '../utils/constants';

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

export const addPagination = (users) => {
  const fragment = document.createDocumentFragment();

  const left = document.createElement('button');
  left.classList.add('pagination');
  left.classList.add('left');
  left.innerText = '<';

  const right = document.createElement('button');
  right.classList.add('pagination');
  right.classList.add('right');
  right.innerText = '>';

  const currentPage = document.createElement('span');
  currentPage.classList.add('current-page');
  currentPage.innerText = 1;

  const separator = document.createElement('span');
  separator.classList.add('separator');
  separator.innerText = '/';

  const countPages = document.createElement('span');
  countPages.classList.add('count-pages');
  countPages.innerText = Math.ceil(users.length / USER_PER_PAGE);

  fragment.appendChild(left);
  fragment.appendChild(currentPage);
  fragment.appendChild(separator);
  fragment.appendChild(countPages);
  fragment.appendChild(right);

  const container = document.createElement('div');
  container.classList.add('pagination-container');
  container.appendChild(fragment);

  return container;
};

export const createTable = (users) => {
  const table = document.querySelector('.table');

  users.forEach((user) => {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('user-data');

    createUser(user, tableRow);

    table.appendChild(tableRow);
  });
};

export const clearTable = () => {
  const table = document.querySelector('.table');
  const users = table.querySelectorAll('.user-data');

  users.forEach((user) => {
    table.removeChild(user);
  });
};

export const checkCurrentPage = (current, all) => {
  const paginationLeft = document.querySelector('.pagination.left');
  const paginationRight = document.querySelector('.pagination.right');
  const currentPage = document.querySelector('.current-page');
  const countPages = document.querySelector('.count-pages');

  if (current < all) {
    paginationRight.classList.add('active');
  }
  if (current === all) {
    paginationRight.classList.remove('active');
  }
  if (current === 1) {
    paginationLeft.classList.remove('active');
  }
  if (current > 1) {
    paginationLeft.classList.add('active');
  }

  currentPage.innerText = current;
  countPages.innerText = all;
};

export const changeTable = (users, pagesState) => {
  const { length } = users.length;
  const current = (pagesState.current - 1) * USER_PER_PAGE;
  const max = length < USER_PER_PAGE ? length : USER_PER_PAGE;

  const currentUsers = users.slice(current, current + max);

  clearTable();
  createTable(currentUsers);
  checkCurrentPage(pagesState.current, pagesState.all);
};
