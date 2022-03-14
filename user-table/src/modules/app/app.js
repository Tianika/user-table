import { clearTable, createTable } from '../components/userTable';
import { userTableDraw, getUsers } from '../components/userTableComponent';

export const app = async () => {
  const root = document.querySelector('.root');

  const table = userTableDraw();
  root.appendChild(table);

  const users = await getUsers();
  createTable(users);

  const search = document.querySelector('.search-input');
  const clearBtn = document.querySelector('.clear-button');

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

  clearBtn.addEventListener('click', () => {
    clearBtn.classList.add('hide');
    search.value = '';

    clearTable();
    createTable(users);
  });
};

export default app;
