document.addEventListener('DOMContentLoaded', () => {
  // ===== 1. ИНИЦИАЛИЗАЦИЯ EMAILJS ===== //
  emailjs.init('cUOjbUcz3YXYffp4n'); // Ваш Public Key

  // ===== 2. ОБЩИЕ ФУНКЦИИ ===== //
  // Звёздный фон
  const stars = document.createElement('div');
  stars.className = 'stars';
  document.body.prepend(stars);

  // Анимация меню
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.textShadow = '0 0 10px rgba(0, 243, 255, 0.8)';
    });
    link.addEventListener('mouseout', () => {
      link.style.textShadow = 'none';
    });
  });

  // ===== 3. ЗАГРУЗКА ИГР ===== //
  const gamesContainer = document.getElementById('games-container');
  if (gamesContainer) {
    loadJSON('https://raw.githubusercontent.com/mr3ero/mr3ero.github.io/master/data/games.json', games => {
      gamesContainer.innerHTML = games.map((game, index) => `
        <div class="game-card" style="opacity:0; transform:translateY(20px)">
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <a href="${game.buy_link}" class="buy-button" target="_blank">
            Купить за $${game.price}
          </a>
        </div>
      `).join('');
      animateElements('.game-card');
    });
  }

  // ===== 4. ЗАГРУЗКА НОВОСТЕЙ ===== //
  const newsContainer = document.getElementById('news-container');
  if (newsContainer) {
    loadJSON('https://raw.githubusercontent.com/mr3ero/mr3ero.github.io/master/data/news.json', news => {
      newsContainer.innerHTML = news.map((item, index) => `
        <article class="news-article" style="opacity:0; transform:translateY(20px)">
          <span class="news-date">${item.date}</span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          ${item.image ? `<img src="assets/images/${item.image}" alt="${item.title}" loading="lazy">` : ''}
        </article>
      `).join('');
      animateElements('.news-article');
    });
  }

  // ===== 5. ОБРАБОТКА ФОРМЫ ===== //
  const contactForm = document.getElementById('emailjs-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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
          console.error('Ошибка:', error);
          alert('Ошибка: ' + (error.text || 'Попробуйте позже'));
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Отправить';
        });
    });
  }

  // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===== //
  function loadJSON(url, callback) {
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка сети');
        return response.json();
      })
      .then(callback)
      .catch(error => {
        console.error(`Ошибка загрузки ${url}:`, error);
        const container = document.querySelector('#games-container, #news-container');
        if (container) container.innerHTML = '<p class="error">Данные временно недоступны</p>';
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
});
