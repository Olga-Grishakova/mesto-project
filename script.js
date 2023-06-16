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

const popupProfileForm = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = popupProfileForm.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputTextName = document.querySelector('.popup__input_text_name');
const inputTextJob = document.querySelector('.popup__input_text_job');
const addButton = document.querySelector('.profile__add-button');
const popupCardForm = document.querySelector('.popup_type_add-card');
const closeAddButton = popupCardForm.querySelector('.popup__close');
const inputAddcardName = document.querySelector('.popup__input_add-card_name');
const inputAddcardLink = document.querySelector('.popup__input_add-card_link');
const elementContainer = document.querySelector('.elements');
const popupBigForm = document.querySelector('.popup_type_image');
const closeBigForm = popupBigForm.querySelector('.popup__close');


function removePopupForm(element) {
  element.classList.remove('popup_opened');
};

editButton.addEventListener('click', function() {
  popupProfileForm.classList.add('popup_opened');
  inputTextName.value = profileTitle.textContent;
  inputTextJob.value = profileSubtitle.textContent;
  closeEditButton.addEventListener('click', function() {
    removePopupForm(popupProfileForm);
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTextName.value;
  profileSubtitle.textContent = inputTextJob.value;
  removePopupForm(popupProfileForm);
}

popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', function() {
  popupCardForm.classList.add('popup_opened');
  inputAddcardName.placeholder = "Название";
  inputAddcardLink.placeholder = "Ссылка на картинку";
  closeAddButton.addEventListener('click', function() {
    removePopupForm(popupCardForm);
  });
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: inputAddcardName.value,
    link: inputAddcardLink.value
  }
  const newCard = createCard(item);
  elementContainer.prepend(newCard);
  removePopupForm(popupCardForm);

}

popupCardForm.addEventListener('submit', handleCardFormSubmit);

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

  elementImage.addEventListener('click', function() {
    popupBigForm.classList.add('popup_opened');
    const popupPhoto = popupBigForm.querySelector('.popup__photo');
    const popupPhotoTitle = popupBigForm.querySelector('.popup__photo-title');
    popupPhotoTitle.textContent = elementTitle.textContent;
    popupPhoto.src = elementImage.src;
    popupPhoto.alt = elementImage.alt;
  });

  elementLike.addEventListener('click',function(evt) {
    evt.target.classList.toggle('element__like_active');
  });

  elementTrash.addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  
  return cardElement;
}

closeBigForm.addEventListener('click', function() {
  removePopupForm(popupBigForm);
});

for (let i=0; i<initialCards.length; i++) {
  const newCard = createCard(initialCards[i]);
  elementContainer.append(newCard);
}




