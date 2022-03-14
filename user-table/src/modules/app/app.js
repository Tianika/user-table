import {
  addPagination,
  checkCurrentPage,
  clearTable,
  createTable,
} from '../components/userTable';
import { userTableDraw, getUsers } from '../components/userTableComponent';
import { USER_PER_PAGE } from '../utils/constants';

export const app = async () => {
  const root = document.querySelector('.root');

  // создаем страницу
  const table = userTableDraw();
  root.appendChild(table);

  // добавляем пользователей в таблицу
  const users = await getUsers();

  const pagesState = {
    current: 1,
    all: Math.ceil(users.length / USER_PER_PAGE),
  };

  createTable(users.slice(pagesState.current - 1, USER_PER_PAGE));

  // добавляем пагинацию
  const pagination = addPagination(users);
  root.querySelector('.wrapper').appendChild(pagination);

  checkCurrentPage(pagesState.current, pagesState.all);

  const search = document.querySelector('.search-input');
  const clearBtn = document.querySelector('.clear-button');
  const sortingByDate = document.querySelector('.sort-btn.date');
  const sortingByRank = document.querySelector('.sort-btn.rank');
  const paginationLeft = document.querySelector('.pagination.left');
  const paginationRight = document.querySelector('.pagination.right');

  // поиск по имени или email
  search.addEventListener('input', () => {
    const value = search.value.toLowerCase();

    const filterUsers = users.filter((data) => {
      const user = data.username.toLowerCase();
      const email = data.email.toLowerCase();

      return user.indexOf(value) !== -1 || email.indexOf(value) !== -1;
    });

    if (value.length > 0) {
      clearBtn.classList.remove('hide');
    } else {
      clearBtn.classList.add('hide');
    }

    clearTable();
    createTable(filterUsers);
  });

  const sortingTypes = {
    date: '',
    rank: '',
  };

  // кнопка очистить
  clearBtn.addEventListener('click', () => {
    clearBtn.classList.add('hide');
    sortingByDate.classList.remove('active');
    sortingByRank.classList.remove('active');
    search.value = '';
    sortingTypes.date = '';
    sortingTypes.rank = '';

    clearTable();
    createTable(users);
  });

  // сортировка по дате
  sortingByDate.addEventListener('click', () => {
    sortingByDate.classList.add('active');
    sortingByRank.classList.remove('active');
    clearBtn.classList.remove('hide');

    sortingTypes.date = sortingTypes.date === 'desc' ? 'asc' : 'desc';

    const sortUsersByDate = [...users].sort((user1, user2) => {
      const date1 = new Date(user1.registration_date);
      const date2 = new Date(user2.registration_date);

      return sortingTypes.date === 'desc' ? date2 - date1 : date1 - date2;
    });

    clearTable();
    createTable(sortUsersByDate);
  });

  // сортировка по рейтингу
  sortingByRank.addEventListener('click', () => {
    sortingByDate.classList.remove('active');
    sortingByRank.classList.add('active');
    clearBtn.classList.remove('hide');

    sortingTypes.rank = sortingTypes.rank === 'desc' ? 'asc' : 'desc';

    const sortUsersByRank = [...users].sort((user1, user2) => {
      const rank1 = user1.rating;
      const rank2 = user2.rating;

      return sortingTypes.rank === 'desc' ? rank2 - rank1 : rank1 - rank2;
    });

    clearTable();
    createTable(sortUsersByRank);
  });

  // пагинация влево
  paginationLeft.addEventListener('click', () => {
    if (pagesState.current > 1) {
      pagesState.current -= 1;

      checkCurrentPage(pagesState.current, pagesState.all);
    }
  });

  // пагинация вправо
  paginationRight.addEventListener('click', () => {
    if (pagesState.current < pagesState.all) {
      pagesState.current += 1;

      checkCurrentPage(pagesState.current, pagesState.all);
    }
  });
};

export default app;
