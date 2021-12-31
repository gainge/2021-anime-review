const OPENINGS_JSON_FILE = './rankings/openings.json';

fetch(OPENINGS_JSON_FILE)
  .then(response => response.json())
  .then(json => console.log(json));
