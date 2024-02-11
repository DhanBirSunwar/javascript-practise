const follow = document.getElementById('follow');
const readingTime = document.querySelectorAll('.readingTime');
const likeClap = document.getElementById('likes');
const likeCount = document.getElementById('likeCount');
const stars = document.querySelectorAll('.star');
const imgText = document.getElementById('imgText');

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
  };
  scrollFunction();
};

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

likeClap.addEventListener('click', () => {
  likeClap.classList.add('ri-shake-hands-fill');
  likeClap.classList.remove('ri-shake-hands-line');
  checkStatus++;
  likeCount.innerText = checkStatus;
});

stars.forEach((value, index1) => {
  value.addEventListener('click', () => {
    stars.forEach((star, index2) => {
      star.classList[index1 >= index2 ? 'add' : 'remove'](
        'ri-star-fill',
        'text-yellow-500'
      );
      star.classList[index1 >= index2 ? 'remove' : 'add']('ri-star-line');
    });
  });
});

const imgParent = imgText.parentElement;
const descText = document.createElement('p');
descText.textContent = 'This is an image descriptions.';
imgParent.appendChild(descText);
descText.style.marginTop = '2rem';
descText.style.fontStyle = 'italic';
