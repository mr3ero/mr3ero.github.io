// Инициализация EmailJS
emailjs.init('cUOjbUcz3YXYffp4n'); 

document.addEventListener('DOMContentLoaded', () => {
    // 1. Звёздный фон
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

    // 3. Обработка формы
    const form = document.getElementById('emailjs-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            emailjs.sendForm('service_j2ozsow', 'template_i09dpa7', form)
                .then(() => {
                    alert('Сообщение отправлено!');
                    form.reset();
                })
                .catch((error) => {
                    alert('Ошибка: ' + error.text);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить';
                });
        });
    }
});
