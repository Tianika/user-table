import modalWindowDraw from '../components/modal';
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

  let sortedUsersList = [...users];
  let currentStateUsers = [...users];

  const sortingTypes = {
    date: '',
    rank: '',
  };
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

    const filterUsers = sortedUsersList.filter((data) => {
      const user = data.username.toLowerCase();
      const email = data.email.toLowerCase();

      return user.indexOf(value) !== -1 || email.indexOf(value) !== -1;
    });

    currentStateUsers = [...filterUsers];

    if (value.length > 0) {
      clearBtn.classList.remove('hide');
    } else if (!sortingTypes.date && !sortingTypes.rank) {
      clearBtn.classList.add('hide');
    }

    pagesState.all = Math.ceil(filterUsers.length / USER_PER_PAGE) || 1;

    if (pagesState.current > pagesState.all && pagesState.all > 0) {
      pagesState.current = pagesState.all;
    }

    changeTable(filterUsers, pagesState);
  });

  // кнопка очистить
  clearBtn.addEventListener('click', () => {
    clearBtn.classList.add('hide');
    sortingByDate.classList.remove('active');
    sortingByRank.classList.remove('active');
    search.value = '';
    sortingTypes.date = '';
    sortingTypes.rank = '';
    sortedUsersList = [...users];
    currentStateUsers = [...users];

    pagesState.current = 1;
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

    pagesState.all = Math.ceil(sortUsersByDate.length / USER_PER_PAGE) || 1;

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

    pagesState.all = Math.ceil(sortUsersByRank.length / USER_PER_PAGE) || 1;

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

  // удаление пользователя
  table.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-user-btn')) {
      const modal = modalWindowDraw();

      root.appendChild(modal);

      modal.addEventListener('click', (e) => {
        const modalTarget = e.target;

        if (modalTarget.classList.contains('cancel-button')) {
          root.removeChild(modal);
        } else if (modalTarget.classList.contains('confirmation-button')) {
          root.removeChild(modal);

          users.forEach((user) => {
            if (user.id === event.target.dataset.id) {
              users.splice(users.indexOf(user), 1);
              sortedUsersList.splice(sortedUsersList.indexOf(user), 1);
              currentStateUsers.splice(currentStateUsers.indexOf(user), 1);

              const numPages = currentStateUsers.length / USER_PER_PAGE;
              pagesState.all = Math.ceil(numPages) || 1;

              if (pagesState.current > pagesState.all && pagesState.all > 0) {
                pagesState.current = pagesState.all;
              }

              changeTable(currentStateUsers, pagesState);
            }
          });
        }
      });
    }
  });
};

export default app;
