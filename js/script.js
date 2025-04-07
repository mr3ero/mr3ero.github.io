document.addEventListener('DOMContentLoaded', () => {
    // 1. Добавляем звёздный фон
    const stars = document.createElement('div');
    stars.className = 'stars';
    document.body.prepend(stars);

    // 2. Анимация для меню
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.textShadow = '0 0 10px rgba(0, 243, 255, 0.8)';
        });
        link.addEventListener('mouseout', () => {
            link.style.textShadow = 'none';
        });
    });

    // 3. Загрузка игр (только если есть контейнер)
    const gamesContainer = document.getElementById('games-container');
    if (gamesContainer) {
        loadGames();
    }

    async function loadGames() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/mr3ero/mr3ero.github.io/main/data/games.json');
            if (!response.ok) throw new Error('Ошибка загрузки');
            
            const games = await response.json();
            renderGames(games);
        } catch (error) {
            console.error('Ошибка:', error);
            gamesContainer.innerHTML = '<p class="error">Игры временно недоступны</p>';
        }
    }

    function renderGames(games) {
        // Очищаем контейнер
        gamesContainer.innerHTML = '';

        // Создаем HTML для всех игр
        const gamesHTML = games.map((game, index) => `
            <div class="game-card" style="opacity:0; transform:translateY(20px)">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <a href="${game.buy_link}" class="buy-button" target="_blank">Купить за $${game.price}</a>
            </div>
        `).join('');

        // Вставляем игры
        gamesContainer.innerHTML = gamesHTML;

        // Анимация для каждой карточки
        document.querySelectorAll('.game-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
});
