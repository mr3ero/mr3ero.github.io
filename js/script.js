document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. ЗВЁЗДНЫЙ ФОН ===== //
    const stars = document.createElement('div');
    stars.className = 'stars';
    document.body.prepend(stars);

    // ===== 2. АНИМАЦИЯ МЕНЮ ===== //
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
        fetch('https://raw.githubusercontent.com/mr3ero/mr3ero.github.io/main/data/games.json')
            .then(response => response.json())
            .then(games => {
                gamesContainer.innerHTML = games.map((game, index) => `
                    <div class="game-card" style="opacity:0; transform:translateY(20px)">
                        <h3>${game.title}</h3>
                        <p>${game.description}</p>
                        <a href="${game.buy_link || '#'}" class="buy-button" target="_blank">
                            Купить за $${game.price}
                        </a>
                    </div>
                `).join('');

                // Анимация карточек
                document.querySelectorAll('.game-card').forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            })
            .catch(error => {
                console.error('Ошибка загрузки игр:', error);
                gamesContainer.innerHTML = '<p class="error">Игры временно недоступны</p>';
            });
    }

    // ===== 4. ЗАГРУЗКА НОВОСТЕЙ ===== //
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        fetch('https://raw.githubusercontent.com/mr3ero/mr3ero.github.io/main/data/news.json')
            .then(response => response.json())
            .then(news => {
                newsContainer.innerHTML = news.map((item, index) => `
                    <article class="news-article" style="opacity:0; transform:translateY(20px)">
                        <span class="news-date">${item.date}</span>
                        <h3>${item.title}</h3>
                        <p>${item.summary}</p>
                        ${item.image ? `<img src="assets/images/${item.image}" alt="${item.title}">` : ''}
                    </article>
                `).join('');

                // Анимация новостей
                setTimeout(() => {
                    document.querySelectorAll('.news-article').forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }, 100);
            })
            .catch(error => {
                console.error('Ошибка загрузки новостей:', error);
                newsContainer.innerHTML = '<p class="error">Новости временно недоступны</p>';
            });
    }

    // ===== 5. ФОРМА ОБРАТНОЙ СВЯЗИ ===== //
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            // Здесь можно добавить реальную отправку через Formspree
            setTimeout(() => {
                alert('Сообщение отправлено!');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить';
            }, 1500);
        });
    }
});
