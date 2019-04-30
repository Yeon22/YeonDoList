const body = document.querySelector('body');

function loadBackgroundImage() {
  const savedImage = localStorage.getItem('background');
  if (savedImage === null) {
    getBackgroundImage();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();
    if (today > parsedImage.expiresOn) {
      getBackgroundImage();
    } else {
      body.style.backgroundImage = `url(${parsedImage.url})`;
    }
  }
}

function saveBackgroundImage(imageUrl) {
  const savedImage = localStorage.getItem('background');
  if (savedImage !== null) {
    localStorage.removeItem('background');
  }
  const expirationsDate = new Date();
  expirationsDate.setDate(expirationsDate.getDate());
  const imageObj = {
    url: imageUrl,
    expiresOn: expirationsDate,
  };
  localStorage.setItem('background', JSON.stringify(imageObj));
  loadBackgroundImage();
}

function getBackgroundImage() {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const image = json;
      const fullUrl = image.urls.full;
      saveBackgroundImage(fullUrl);
    });
}

function init() {
  loadBackgroundImage();
}

init();