const movieData = {
  venom: {
      title: 'Venom',
      date: 'October 5, 2018',
      actors: ['Tom Hardy', 'Michelle Williams', 'Riz Ahmed'],
      description: '"Venom" is a sci-fi action film where journalist Eddie Brock bonds with the symbiotic creature Venom, an alien from a planet of symbiotes. Together, they battle a sinister corporate magnate who seeks to exploit the symbiote for his own purposes. Throughout their adventure, Brock and Venom discover new powers and abilities, confront dangerous foes, and resolve issues within their symbiotic union. The film explores themes of betrayal, self-identity, and the strength of inner partnership. Ultimately, Brock and Venom realize that their symbiotic bond becomes not only a source of strength but also an unexpected source of connection and friendship.',
      poster: 'assets/images/venom.png'
  },
  spiderman: {
      title: 'Spider-Man: Far from Home',
      date: 'July 2, 2019',
      actors: ['Tom Holland', 'Samuel L. Jackson', 'Zendaya'],
      description: '"Spider-Man: Far from Home" follows Peter Parker as he embarks on a European school trip, hoping for a break from his superhero duties. However, his plans are disrupted when elemental creatures wreak havoc across the continent, prompting Nick Fury to recruit him. Peter teams up with the enigmatic Mysterio to combat these threats, but soon discovers Mysterio`s true intentions. The film delves into Peter`s struggle to balance his personal life with his responsibilities as Spider-Man, culminating in a showdown that challenges his perceptions of heroism and trust. As the dust settles, Peter finds himself grappling with the consequences of deception and the weight of his choices.',
      poster: 'assets/images/spider_man.jpg'
  },
  doctorstrange: {
      title: 'Doctor Strange in the Multiverse of Madness',
      date: 'May 6, 2022',
      actors: ['Benedict Cumberbatch', 'Elizabeth Olsen', 'Xochitl Gomez'],
      description: '"Doctor Strange in the Multiverse of Madness" follows Stephen Strange as he grapples with the aftermath of the events in "Avengers: Endgame" and explores the vastness of the multiverse. When a new threat emerges, Strange must confront dark forces that threaten to unravel reality itself. Teaming up with Scarlet Witch, they embark on a perilous journey across dimensions to stop the looming chaos. The film delves into themes of identity, sacrifice, and the consequences of tampering with the fabric of existence. As Strange navigates through alternate realities, he must confront his own inner demons to save not only the universe but also his own soul.',
      poster: 'assets/images/doc_strange.jpeg'
  }
};

function showMovieDetails(movieKey) {
  const movieInfo = movieData[movieKey];
  const movieTitle = document.getElementById('movie-title');
  const movieDate = document.getElementById('movie-date');
  const actor1 = document.getElementById('actor1');
  const actor2 = document.getElementById('actor2');
  const actor3 = document.getElementById('actor3');
  const movieDescription = document.getElementById('movie-description');
  const posterImage = document.getElementById('poster-image');

  movieTitle.textContent = movieInfo.title;
  movieDate.textContent = movieInfo.date;
  actor1.textContent = movieInfo.actors[0];
  actor2.textContent = movieInfo.actors[1];
  actor3.textContent = movieInfo.actors[2];
  movieDescription.textContent = movieInfo.description;
  posterImage.src = movieInfo.poster;
}