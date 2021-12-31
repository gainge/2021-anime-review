const OPENINGS_JSON_FILE = './rankings/openings.json';

fetch(OPENINGS_JSON_FILE)
  .then(response => response.json())
  .then(json => buildRankings(json));

// Aight let's do it


function playVideo(url) {
  // Set the player source and show
  let modal = document.getElementById('modal');
  let video = document.getElementById('opening-video');
  let source = document.getElementById('video-source');

  source.setAttribute('src', url);
  video.load();

  modal.style.display = 'inherit';
  video.style.display = 'inherit';

  // TODO: might have to do something with the playback position here? start from 0?
}

function onModalClick() {
  console.log('closing video');

  let modal = document.getElementById('modal');
  let video = document.getElementById('opening-video');

  video.pause();

  modal.style.display = 'none';
  video.style.display = 'none';
}


function buildRankings(json) {
  console.log(json);
  // Let's just spit it out real quick
  const rankingParent = document.getElementById('opening-ranking');

  // Write out the tiers
  const tiers = json.tiers;
  
  tiers.forEach(tierData => {
    let tier = document.createElement('p');

    tier.classList.add('tier');

    tier.innerHTML = tierData.label;
    tier.style.backgroundColor = tierData.color;
    tier.style.gridColumnStart = 1;
    tier.style.gridColumnEnd = 2;
    tier.style.gridRowStart = tierData.low;
    tier.style.gridRowEnd = tierData.high;

    rankingParent.appendChild(tier);
  });

  // Now we have to actually spit out the shows eh?
  openings = json.openings;
  const ranking = json.ranking;

  ranking.forEach((ID, rank) => {
    let opening = openings[ID];
    console.log(opening);

    let openingItem = document.createElement('div');
    openingItem.classList.add('ranking-item');
    // TODO: maybe need to set item style?

    // Add the rank
    let rankSpan = document.createElement('p');
    rankSpan.innerHTML = `${rank + 1} ${rank < 9 ? ' ' : ''}- `;
    rankSpan.classList.add('rank-index');
    
    openingItem.appendChild(rankSpan);

    // Add the OP detail
    let openingDetail = document.createElement('p');
    openingDetail.innerHTML = opening.name;
    openingDetail.onclick = () => playVideo(opening.link);
    openingDetail.classList.add('op-title');

    openingItem.appendChild(openingDetail);

    // Finally add the parent
    rankingParent.appendChild(openingItem);
  });
}




