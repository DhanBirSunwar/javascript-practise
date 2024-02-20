import { stories } from './stories.js';

const cardContainer = document.querySelector('.cardContainer');
const resultSearch = document.querySelector('#resultSearch');

function showTheCards() {
  let clutter = '';
  stories.forEach(function (dets, index) {
    clutter += `<div id=${index}
      class="block text-left bg-white rounded-lg shadow-lg dark:bg-neutral-700">
      <div class="h-[277px] overflow-hidden">
        <img class="rounded-t-lg h-full w-full" src="${dets.image}"
        alt="${dets.title}" />
      </div>
      <div class="p-6">
        <h5 class="mb-2 text-xl font-bold tracking-wide text-neutral-800 dark:text-neutral-50" >
          ${dets.title}
        </h5>
        <p class="mb-2 text-base text-neutral-500 dark:text-neutral-300">
          ${dets.story.substring(0, 80)}...
        </p>
        <button
          type="button"
          id="${dets.id}"
          class="mt-3 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white">
          Read now
        </button>
      </div>
    </div>
    `;
  });
  cardContainer.innerHTML = clutter;
  stories.forEach(function (dets) {
    document
      .getElementById(`${dets.id}`)
      .addEventListener('click', function () {
        window.location.href = `details.html?id=${dets.id}`;
      });
  });
}
showTheCards();

function handleSearchFunctionality() {
  let input = document.querySelector('#searchinput');
  input.addEventListener('focus', () => {
    document.querySelector('.overlay').style.display = 'block';
  });
  input.addEventListener('blur', () => {
    document.querySelector('.overlay').style.display = 'none';
  });
  input.addEventListener('input', () => {
    const filteredArray = stories.filter((obj) =>
      obj.title.toLowerCase().startsWith(input.value)
    );

    var clutter = '';
    filteredArray.forEach((obj) => {
      clutter += `<div class="search flex px-8 py-3  hover:bg-blue-100">
            <i class="ri-search-line font-semibold mr-5"></i>
            <h3 class="font-semibold">${obj.title}</h3>
        </div>`;
    });
    document.querySelector('.searchdata').style.display = 'block';
    document.querySelector('.searchdata').innerHTML = clutter;

    document.querySelector('.searchdata').addEventListener('click', (event) => {
      if (event.target.matches('.search')) {
        displayResult(event.target.querySelector('h3').innerText);
      }
    });
  });
}

function displayResult(title) {
  cardContainer.style.display = 'none';
  document.querySelector('.searchdata').style.display = 'none';
  const story = stories.find((story) => story.title === title);
  const res = story.title;
  resultSearch.innerHTML = res;
}

handleSearchFunctionality();
