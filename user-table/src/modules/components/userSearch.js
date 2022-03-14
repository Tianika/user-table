const userSearchDraw = () => {
  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('search-wrapper');

  const label = document.createElement('label');
  label.classList.add('search-label');

  const searchInput = document.createElement('input');
  searchInput.classList.add('search-input');
  searchInput.name = 'search';
  searchInput.placeholder = 'Поиск по имени или e-mail';
  searchInput.type = 'text';

  label.appendChild(searchInput);

  const clearBtn = document.createElement('button');
  clearBtn.classList.add('clear-button');
  clearBtn.classList.add('hide');
  clearBtn.innerText = 'Очистить фильтр';

  searchWrapper.appendChild(label);
  searchWrapper.appendChild(clearBtn);

  return searchWrapper;
};

export default userSearchDraw;
