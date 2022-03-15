const modalWindowDraw = () => {
  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('delete-user-wrapper');

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('delete-user-window');

  const question = document.createElement('div');
  question.classList.add('delete-question');
  question.innerText = 'Вы уверены, что хотите удалить пользователя?';

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('modal-buttons-container');

  const confirmationButton = document.createElement('button');
  confirmationButton.classList.add('confirmation-button');
  confirmationButton.innerText = 'Да';

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancel-button');
  cancelButton.innerText = 'Нет';

  buttonsContainer.appendChild(confirmationButton);
  buttonsContainer.appendChild(cancelButton);

  modalWindow.appendChild(question);
  modalWindow.appendChild(buttonsContainer);

  modalWrapper.appendChild(modalWindow);

  return modalWrapper;
};

export default modalWindowDraw;
