import { stories } from './stories.js';

const follow = document.getElementById('follow');
const readingTime = document.querySelectorAll('.readingTime');
const likeClap = document.getElementById('likes');
const likeCount = document.getElementById('likeCount');
const stars = document.querySelectorAll('.star');
const imgText = document.getElementById('imgText');
var scrollToTopButton = document.getElementById('scrollToTop');

let checkStatus = 0;

window.onscroll = () => {
  const scrollFunction = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const roundedScrolled = Math.round(scrolled);

    document.getElementById('myBar').style.width = roundedScrolled + '%';
    document.getElementById('progress').innerText = roundedScrolled + '%';

    const scrollOnClick =
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    scrollToTopButton.style.display = scrollOnClick ? 'block' : 'none';
  };
  scrollToTopButton.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  scrollFunction();
};

function follower() {
  follow.addEventListener('click', () => {
    if (checkStatus == 0) {
      follow.innerText = 'Following';
      follow.classList.add('text-green-500');
      checkStatus = 1;
    } else {
      follow.innerText = 'Follow';
      follow.classList.remove('text-green-500');
      checkStatus = 0;
    }
  });
}

follower();

const estimateReadingTime = () => {
  const articleText = document.getElementById('article').innerText;
  const wordsArray = articleText.split(/\s+/);
  const wordCount = wordsArray.length;
  const wordsPerMinute = 200; //average reading speed
  const totalReadingTime = Math.ceil(wordCount / wordsPerMinute);
  readingTime.forEach((ele) => {
    ele.innerText = `${totalReadingTime} min read`;
  });
};
estimateReadingTime();

function likeStory() {
  likeClap.addEventListener('click', () => {
    likeClap.classList.add('ri-shake-hands-fill');
    likeClap.classList.remove('ri-shake-hands-line');
    checkStatus++;
    likeCount.innerText = checkStatus;
  });
}
likeStory();

function rating() {
  const ratingPercentageElement = document.getElementById('rating-percentage');

  stars.forEach((value, index1) => {
    value.addEventListener('click', () => {
      stars.forEach((star, index2) => {
        star.classList[index1 >= index2 ? 'add' : 'remove'](
          'ri-star-fill',
          'text-yellow-500'
        );
        star.classList[index1 >= index2 ? 'remove' : 'add']('ri-star-line');
      });
      const ratingPercentage = (index1 + 1) * 20; // Assuming each star represents  20%
      ratingPercentageElement.textContent = `You rate this book ${ratingPercentage}% thank you.`;
    });
  });
}

setTimeout(() => {
  const ratingContainer = document.getElementById('rating-container');
  rating();
  ratingContainer.classList.remove('hidden');
}, 2000);

function getStoryDetailById(id) {
  return stories.find((post) => post.id === id);
}

function displayStoryDetails(post) {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const date = document.getElementById('date');
  const profile = document.getElementById('img');
  const largeImage = document.getElementById('imgText');
  const storyContent = document.getElementById('story');

  title.textContent = post.title;
  author.textContent = post.author;
  date.textContent = post.date;
  profile.src = post.image;
  largeImage.src = post.image;
  storyContent.textContent = post.story;
  storyContent.style.fontSize = '20px';
}

function getIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

if (window.location.pathname.endsWith('details.html')) {
  const postId = getIdFromUrl();
  const post = getStoryDetailById(parseInt(postId, 10));

  if (post) {
    displayStoryDetails(post);
  } else {
    document.getElementById('title').textContent = 'Post Not Found';
  }
}
