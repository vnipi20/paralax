// Отримуємо елементи
const layer1 = document.getElementById('layer1');
const layer2 = document.getElementById('layer2');
const layer3 = document.getElementById('layer3');
const parallaxContainer = document.querySelector('.parallax-container');
const buttons = document.querySelectorAll('.nav-button');

// Змінні для відстеження паралаксу
let isMouseOverRedCircle = false;
let lastMouseX = 0;
let lastMouseY = 0;
let centerX = 0;
let centerY = 0;

// Змінні для зміщення шарів 2 і 3
let offsetX2 = 0;
let offsetY2 = 0;
let offsetX3 = 0;
let offsetY3 = 0;

// Функція для перевірки, чи курсор над червоним колом
function isOverRedCircle(mouseX, mouseY, rect) {
    // Координати центру картинки відносно viewport
    const imageCenterX = rect.left + rect.width / 2;
    const imageCenterY = rect.top + rect.height / 2;

    // Радіус червоного кола в пікселях (20px діаметр = 10px радіус)
    const redCircleRadius = 10;

    // Обчислюємо відстань від курсора до центру
    const distance = Math.sqrt(
        Math.pow(mouseX - imageCenterX, 2) +
        Math.pow(mouseY - imageCenterY, 2)
    );

    return distance <= redCircleRadius;
}

// Обробник руху миші
parallaxContainer.addEventListener('mousemove', (e) => {
    const rect = layer1.getBoundingClientRect();

    // Перевіряємо, чи курсор над червоним колом
    const overCircle = isOverRedCircle(e.clientX, e.clientY, rect);

    if (overCircle) {
        if (!isMouseOverRedCircle) {
            // Перший раз над колом - зберігаємо початкову позицію
            isMouseOverRedCircle = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
        } else {
            // Обчислюємо зміщення курсора
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;

            // Застосовуємо формулу: зміщення шару = -1/3 * зміщення курсора * 0.9
            // Мінус для протилежного напрямку
            const moveFactorX = -deltaX * (1/3) * 0.9;
            const moveFactorY = -deltaY * (1/3) * 0.9;

            // Оновлюємо зміщення для шарів 2 і 3
            offsetX2 += moveFactorX;
            offsetY2 += moveFactorY;
            offsetX3 += moveFactorX;
            offsetY3 += moveFactorY;

            // Застосовуємо трансформації
            layer2.style.transform = `translate(${offsetX2}px, ${offsetY2}px)`;
            layer3.style.transform = `translate(${offsetX3}px, ${offsetY3}px)`;

            // Оновлюємо останню позицію курсора
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }
    } else {
        isMouseOverRedCircle = false;
    }
});

// Скидання позиції при виході курсора з контейнера
parallaxContainer.addEventListener('mouseleave', () => {
    isMouseOverRedCircle = false;

    // Плавне повернення шарів на місце
    offsetX2 = 0;
    offsetY2 = 0;
    offsetX3 = 0;
    offsetY3 = 0;

    layer2.style.transition = 'transform 0.5s ease-out';
    layer3.style.transition = 'transform 0.5s ease-out';

    layer2.style.transform = 'translate(0, 0)';
    layer3.style.transform = 'translate(0, 0)';

    // Повертаємо швидку анімацію після затримки
    setTimeout(() => {
        layer2.style.transition = 'transform 0.05s ease-out';
        layer3.style.transition = 'transform 0.05s ease-out';
    }, 500);
});

// Функція перемикання наборів картинок
function switchImageSet(setNumber) {
    // Оновлюємо src для всіх трьох шарів
    layer1.src = `${setNumber}/1.png`;
    layer2.src = `${setNumber}/2.png`;
    layer3.src = `${setNumber}/3.png`;

    // Скидаємо зміщення
    offsetX2 = 0;
    offsetY2 = 0;
    offsetX3 = 0;
    offsetY3 = 0;
    layer2.style.transform = 'translate(0, 0)';
    layer3.style.transform = 'translate(0, 0)';

    // Оновлюємо активну кнопку
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`[data-set="${setNumber}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Додаємо обробники подій до кнопок
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const setNumber = button.getAttribute('data-set');
        switchImageSet(setNumber);
    });
});

// Ініціалізація при завантаженні сторінки
window.addEventListener('load', () => {
    console.log('Паралакс ефект готовий до роботи!');
});
