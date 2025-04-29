let isEmailJSLoaded = false;

// Встроенные данные вместо JSON
const gamesData = [
  {
    title: "Space Odyssey",
    price: 29.99,
    description: "Исследуйте галактики в роли капитана корабля",
    image: "space-odyssey.jpg",
    buy_link: "https://store.steampowered.com/app/2435980"
  },
  {
    title: "Galactic Wars EX",
    price: 19.99,
    description: "Сразитесь за контроль над вселенной",
    image: "galaxy-wars.jpg",
    buy_link: "https://store.steampowered.com/app/1844170"
  },
  {
    title: "World War I",
    price: 19.99,
    description: "Мировая война за человечество",
    image: "world-war-one.jpg",
    buy_link: "https://store.steampowered.com/app/361380"
  }
];

const newsData = [
  {
    title: "Запуск Space Odyssey",
    date: "15.05.2024",
    summary: "Наша первая игра выходит в релиз!",
    image: "news1.jpg"
  },
  {
    title: "Новое обновление",
    date: "10.05.2024",
    summary: "Добавлены новые космические корабли.",
    image: "news2.jpg"
  }
];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await checkEmailJS();
    initStars();
    setupMenuAnimation();
    loadAllData(); // Убрал async/await, так как данные теперь локальные
    setupContactForm();
  } catch (error) {
    console.error('Init error:', error);
    document.body.innerHTML += '<p class="error">Произошла ошибка. Пожалуйста, обновите страницу.</p>';
  }
});

async function checkEmailJS() {
  return new Promise((resolve) => {
    if (typeof emailjs !== 'undefined') {
      emailjs.init('cUOjbUcz3YXYffp4n');
      isEmailJSLoaded = true;
      resolve();
      return;
    }

    const checkInterval = setInterval(() => {
      if (typeof emailjs !== 'undefined') {
        clearInterval(checkInterval);
        emailjs.init('cUOjbUcz3YXYffp4n');
        isEmailJSLoaded = true;
        resolve();
      }
    }, 100);
  });
}

function initStars() {
  const stars = document.createElement('div');
  stars.className = 'stars';
  document.body.prepend(stars);
}

function setupMenuAnimation() {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.textShadow = '0 0 10px rgba(0, 243, 255, 0.8)';
    });
    link.addEventListener('mouseout', () => {
      link.style.textShadow = 'none';
    });
  });
}

function loadAllData() {
  loadGames();
  loadNews();
}

function loadGames() {
  const container = document.getElementById('games-container');
  if (!container) return;

  try {
    container.innerHTML = gamesData.map((game, index) => `
      <div class="game-card" style="opacity:0;transform:translateY(20px)">
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <a href="${game.buy_link}" class="buy-button" target="_blank">
          Купить за $${game.price}
        </a>
      </div>
    `).join('');
    animateElements('.game-card');
  } catch (error) {
    container.innerHTML = '<p class="error">Игры временно недоступны</p>';
  }
}

function loadNews() {
  const container = document.getElementById('news-container');
  if (!container) return;

  try {
    container.innerHTML = newsData.map((item, index) => `
      <article class="news-article" style="opacity:0;transform:translateY(20px)">
        <span class="news-date">${item.date}</span>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        ${item.image ? `<img src="assets/images/${item.image}" alt="${item.title}" loading="lazy">` : ''}
      </article>
    `).join('');
    animateElements('.news-article');
  } catch (error) {
    container.innerHTML = '<p class="error">Новости временно недоступны</p>';
  }
}

function setupContactForm() {
  const form = document.getElementById('emailjs-form');
  if (!form || !isEmailJSLoaded) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    emailjs.sendForm('service_j2ozsow', 'template_i09dpa7', this)
      .then(() => {
        alert('Сообщение отправлено!');
        this.reset();
      })
      .catch(error => {
        console.error('Send error:', error);
        alert('Ошибка отправки. Попробуйте позже.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
      });
  });
}

function animateElements(selector) {
  document.querySelectorAll(selector).forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
}