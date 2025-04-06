// ===== ЗВЁЗДНЫЙ ФОН И АНИМАЦИИ ===== //
document.addEventListener('DOMContentLoaded', () => {
    // 1. Создаем звёздный фон
    const stars = document.createElement('div');
    stars.className = 'stars';
    document.body.prepend(stars);

    // 2. Анимация меню
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.textShadow = '0 0 10px rgba(0, 243, 255, 0.8)';
        });
        
        link.addEventListener('mouseout', () => {
            link.style.textShadow = 'none';
        });
    });

    // 3. Загружаем игры из JSON
    fetch('https://raw.githubusercontent.com/mr3ero/mr3ero.github.io/main/data/games.json')
        .then(response => response.json())
        .then(games => {
            const container = document.getElementById('games-container');
            
            // Очищаем контейнер (на случай повторной загрузки)
            container.innerHTML = '';
            
            // Добавляем игры
            games.forEach((game, index) => {
                container.innerHTML += `
                    <div class="game-card">
                        <h3>${game.title}</h3>
                        <p>${game.description}</p>
                        <button class="buy-button">Купить за $${game.price}</button>
                    </div>
                `;

                // Применяем анимацию к каждой карточке
                setTimeout(() => {
                    const card = container.lastElementChild;
                    if (card) {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                }, index * 200);
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки игр:', error);
        });
});

// ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ===== //
