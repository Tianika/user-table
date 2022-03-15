import { addPagination, changeTable } from '../components/userTable';
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

  let currentStateUsers = [...users];

  const pagination = addPagination(users);
  root.querySelector('.wrapper').appendChild(pagination);

  changeTable(users, pagesState);

  const search = document.querySelector('.search-input');
  const clearBtn = document.querySelector('.clear-button');
  const sortingByDate = document.querySelector('.sort-btn.date');
  const sortingByRank = document.querySelector('.sort-btn.rank');
  const paginationLeft = document.querySelector('.pagination.left');
  const paginationRight = document.querySelector('.pagination.right');

  // поиск по имени или email
  search.addEventListener('input', () => {
    const value = search.value.toLowerCase();

    const filterUsers = currentStateUsers.filter((data) => {
      const user = data.username.toLowerCase();
      const email = data.email.toLowerCase();

      return user.indexOf(value) !== -1 || email.indexOf(value) !== -1;
    });

    currentStateUsers = [...filterUsers];

    if (value.length > 0) {
      clearBtn.classList.remove('hide');
    } else {
      clearBtn.classList.add('hide');
    }

    pagesState.all = Math.ceil(filterUsers.length / USER_PER_PAGE);

    if (pagesState.current > pagesState.all) {
      pagesState.current = pagesState.all;
    }

    changeTable(filterUsers, pagesState);
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
    currentStateUsers = [...users];

    pagesState.all = Math.ceil(users.length / USER_PER_PAGE);

    changeTable(users, pagesState);
  });

  // сортировка по дате
  sortingByDate.addEventListener('click', () => {
    sortingByDate.classList.add('active');
    sortingByRank.classList.remove('active');
    clearBtn.classList.remove('hide');

    sortingTypes.date = sortingTypes.date === 'desc' ? 'asc' : 'desc';

    const sortUsersByDate = [...currentStateUsers].sort((user1, user2) => {
      const date1 = new Date(user1.registration_date);
      const date2 = new Date(user2.registration_date);

      return sortingTypes.date === 'desc' ? date2 - date1 : date1 - date2;
    });

    currentStateUsers = [...sortUsersByDate];

    pagesState.all = Math.ceil(sortUsersByDate.length / USER_PER_PAGE);

    changeTable(sortUsersByDate, pagesState);
  });

  // сортировка по рейтингу
  sortingByRank.addEventListener('click', () => {
    sortingByDate.classList.remove('active');
    sortingByRank.classList.add('active');
    clearBtn.classList.remove('hide');

    sortingTypes.rank = sortingTypes.rank === 'desc' ? 'asc' : 'desc';

    const sortUsersByRank = [...currentStateUsers].sort((user1, user2) => {
      const rank1 = user1.rating;
      const rank2 = user2.rating;

      return sortingTypes.rank === 'desc' ? rank2 - rank1 : rank1 - rank2;
    });

    currentStateUsers = [...sortUsersByRank];

    pagesState.all = Math.ceil(sortUsersByRank.length / USER_PER_PAGE);

    changeTable(sortUsersByRank, pagesState);
  });

  // пагинация влево
  paginationLeft.addEventListener('click', () => {
    if (pagesState.current > 1) {
      pagesState.current -= 1;

      changeTable(currentStateUsers, pagesState);
    }
  });

  // пагинация вправо
  paginationRight.addEventListener('click', () => {
    if (pagesState.current < pagesState.all) {
      pagesState.current += 1;

      changeTable(currentStateUsers, pagesState);
    }
  });
};

export default app;
