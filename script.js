function createCard(name, episodeId, description) {
  const cardList = document.querySelector(".card__list");

  const createLi = document.createElement("li");
  createLi.classList.add("card");

  const createTitle = document.createElement("h2");
  createTitle.classList.add("card__title");
  createTitle.appendChild(
    this.createElem("span", "назва фільму:", "card__accentText")
  );
  createTitle.appendChild(document.createTextNode(name));

  const createTextEpisode = document.createElement("p");
  createTextEpisode.classList.add("card__episode");
  createTextEpisode.append(
    this.createElem("span", "номер епізоду:", "card__accentText")
  );
  createTextEpisode.appendChild(document.createTextNode(episodeId));

  const createDescription = document.createElement("p");
  createDescription.classList.add("card__text");
  createDescription.append(
    this.createElem("span", "короткий зміст:", "card__accentText")
  );
  createDescription.appendChild(document.createTextNode(description));

  const createTextCharacters = document.createElement("p");
  createTextCharacters.setAttribute("data-episode-id", episodeId);
  createTextCharacters.appendChild(
    createElem("span", "герої фільму:", "card__charactersText")
  );
  const animationContainer =  createElem("div", "", "loader-container");
  const animation =  createElem("div", "", "loader-2");
  animationContainer.setAttribute("data-animation-id", episodeId);
  animationContainer.appendChild(animation);
  createTextCharacters.appendChild(animationContainer);

  createLi.appendChild(createTitle);
  createLi.appendChild(createTextEpisode);
  createLi.appendChild(createDescription);
  createLi.appendChild(createTextCharacters);

  cardList.appendChild(createLi);
}

function createElem(elem, textContent, elemClass) {
  const createElem = document.createElement(`${elem}`);
  createElem.classList.add(`${elemClass}`);
  createElem.textContent = textContent;

  return createElem;
}

function fetchFilms() {
  return fetch("https://ajax.test-danit.com/api/swapi/films").then((data) => {
    return data.json();
  });
}

fetchFilms().then((data) => {
  data.forEach((film) => {
    const { characters, episodeId, openingCrawl, name } = film;
    createCard(name, episodeId, openingCrawl);
    charactersOfFilmUrl(characters, episodeId);
  });
});

function fetchCharacters(url) {
  return fetch(url).then((data) => {
    return data.json();
  });
}

function charactersOfFilmUrl(characters, episodeId) {
  switch (episodeId) {
    case 1:
      charactersForEpisode(characters, episodeId);
      break;
    case 2:
      charactersForEpisode(characters, episodeId);
      break;
    case 3:
      charactersForEpisode(characters, episodeId);
      break;
    case 4:
      charactersForEpisode(characters, episodeId);
      break;
    case 5:
      charactersForEpisode(characters, episodeId);
      break;
    case 6:
      charactersForEpisode(characters, episodeId);
      break;
  }
}

function charactersForEpisode(characters, episodeId) {
  characters.map((url) => {
    return fetchCharacters(url).then((character) => {
      addCharacters(character.name, episodeId);
    });
  });
}

function addCharacters(characters, episodeId) {
  const element = document.querySelector(`[data-episode-id="${episodeId}"]`);
  const elementAnimation = document.querySelector(`[data-animation-id="${episodeId}"]`);
  elementAnimation.style.display = 'none';
  const textNode = document.createTextNode(characters);
  element.appendChild(textNode);
  if (element.textContent !== '') {
    element.appendChild(document.createTextNode(', '));
  }
}
