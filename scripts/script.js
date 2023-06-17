const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupProfile = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = popupProfile.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTextName = document.querySelector('.popup__input_text_name');
const inputTextJob = document.querySelector('.popup__input_text_job');
const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_add-card');
const closeAddButton = popupCard.querySelector('.popup__close');
const inputAddCardName = document.querySelector('.popup__input_add-card_name');
const inputAddCardLink = document.querySelector('.popup__input_add-card_link');
const elementContainer = document.querySelector('.elements');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const popupPhoto = imagePopup.querySelector('.popup__photo');
const popupPhotoTitle = imagePopup.querySelector('.popup__photo-title');

//функция открытия попапа
function openPopup(element) {
  element.classList.add('popup_opened');
}

//функция закрытия попапа
function closePopup(element) {
  element.classList.remove('popup_opened');
};

//обработчик нажатия на кнопку редактирования профиля
editButton.addEventListener('click', function() {
  openPopup(popupProfile);
  inputTextName.value = profileTitle.textContent;
  inputTextJob.value = profileSubtitle.textContent;
});

//функция редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTextName.value;
  profileSubtitle.textContent = inputTextJob.value;
  closePopup(popupProfile);
}

popupProfile.addEventListener('submit', handleProfileFormSubmit);

//обработчик нажатия на кнопку закрыть форму редактирования профиля
closeEditButton.addEventListener('click', function() {
  closePopup(popupProfile);
});

//обработчик нажатия на кнопку добавления карточки
addButton.addEventListener('click', function() {
  openPopup(popupCard);
  inputAddCardName.placeholder = "Название";
  inputAddCardLink.placeholder = "Ссылка на картинку";
});

//обработчик нажатия на кнопку закрытия карточки
closeAddButton.addEventListener('click', function() {
  closePopup(popupCard);
});

//функция сохранения новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: inputAddCardName.value,
    link: inputAddCardLink.value
  }
  evt.target.reset();
  const newCard = createCard(item);
  elementContainer.prepend(newCard);
  closePopup(popupCard);
}

popupCard.addEventListener('submit', handleCardFormSubmit);

//функция создания карточки
function createCard(item) {

  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  const elementTitle = cardElement.querySelector('.element__title');
  const elementLike = cardElement.querySelector('.element__like');
  const elementTrash = cardElement.querySelector('.element__trash');

  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;

  //обработчик нажатия на картинку карточки для открытия картинки в большом размере
  elementImage.addEventListener('click', function() {
    openPopup(imagePopup);

    popupPhotoTitle.textContent = elementTitle.textContent;
    popupPhoto.src = elementImage.src;
    popupPhoto.alt = elementImage.alt;
  });

  //обработчик нажатия на лайк
  elementLike.addEventListener('click',function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  //обработчик нажатия на корзину
  elementTrash.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  return cardElement;
}

//обработчик закрытия большой картинки
imagePopupCloseButton.addEventListener('click', function() {
  closePopup(imagePopup);
});

//заполнение страницы карточками из массива при первоначальной загрузке
initialCards.forEach(function (item) {
  const newCard = createCard(item);
  elementContainer.append(newCard);
});





