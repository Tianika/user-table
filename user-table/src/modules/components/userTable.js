import { SORT_BTNS, TABLE_HEADERS } from '../utils/constants';

const tableDraw = () => {
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

export default tableDraw;
