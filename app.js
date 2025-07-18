document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeForms();
    initializeArchive();
    initializeButtons();
});

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('.section');
    const footerLinks = document.querySelectorAll('.footer__section a');
    
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        // Update active nav link
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Set active link
        const activeLink = document.querySelector(`[href="#${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Handle nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
    
    // Handle footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                showSection(targetId);
            }
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const articleSearch = document.getElementById('articleSearch');
    
    function performSearch(query) {
        if (!query.trim()) {
            alert('Пожалуйста, введите поисковый запрос');
            return;
        }
        
        // Simulate search results
        const searchResults = [
            {
                title: "Правовые последствия сокрытия доходов от ФНС на примере ресторана 'У Татьяны'",
                author: "Вадим Козленко",
                issue: "№1, 2025",
                excerpt: "Статья посвящена возможной юридической ответственности при попытке, упоровшись бабушкиными грибами наебать ФНС. Рассматриваются особенности применения уголовного наказания в отношениях, складывающимися между государством и индивидом."
            },
            {
                title: "Правовой статус бульбомета",
                author: "Косов Тохэн Владимирович aka Вождь", 
                issue: "№1, 2025",
                excerpt: "Исследование механизмов определения правового статуса инновационной разработки Новосибирских оружейников 'Бульбомет' в российском и зарубежном праве. Анализ судебной практики и предложения по совершенствованию законодательства."
            },
            {
                title: "Правовой статус трусов Тохэна",
                author: "Прибыткин Захаr Владимиrович",
                issue: "№1, 2025",
                excerpt: "Ну тут в названии все сказано (vfnm ndj. t,fk)."
            }
        ];
        
        showSearchResults(searchResults, query);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    if (articleSearch) {
        articleSearch.addEventListener('input', function() {
            filterArticles(this.value);
        });
    }
}

function showSearchResults(results, query) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Create or get search results container
    let resultsContainer = document.querySelector('.search-results-container');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-container';
        document.querySelector('.main').appendChild(resultsContainer);
    }
    
    const searchResultsHtml = `
        <div class="container">
            <h2>Результаты поиска для: "${query}"</h2>
            <div class="search-results">
                ${results.map(result => `
                    <div class="search-result">
                        <h4>${result.title}</h4>
                        <p class="author">Автор: ${result.author}</p>
                        <p class="issue">Выпуск: ${result.issue}</p>
                        <p class="excerpt">${result.excerpt}</p>
                        <button class="btn btn--primary" onclick="handleArticleRead(this, '${result.title}', '${result.author}')">Читать статью</button>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn--secondary" onclick="goToHome()">Вернуться на главную</button>
        </div>
    `;
    
    resultsContainer.innerHTML = searchResultsHtml;
    resultsContainer.classList.remove('hidden');
    
    // Update nav
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
    });
}

function goToHome() {
    document.querySelector('.search-results-container').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    document.querySelector('.nav__link[href="#home"]').classList.add('active');
}

// Form handling
function initializeForms() {
    const submissionForm = document.querySelector('.submission-form');
    const registrationForm = document.querySelector('.registration-form');
    
    if (submissionForm) {
        submissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const inputs = this.querySelectorAll('input, select, textarea');
            const data = {};
            
            inputs.forEach(input => {
                if (input.type === 'text' || input.type === 'email' || input.tagName === 'SELECT' || input.tagName === 'TEXTAREA') {
                    data[input.name || input.className] = input.value;
                }
            });
            
            // Basic validation
            let isValid = true;
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                showSuccessMessage('Статья успешно отправлена на рассмотрение! Вы получите уведомление о статусе рецензирования в течение 7 дней.');
                this.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля');
            }
        });
    }
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                showSuccessMessage('@all Регистрация на конференцию успешно завершена! Успехов!');
                this.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля');
            }
        });
    }
}

// Initialize buttons
function initializeButtons() {
    // Article read buttons
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Читать статью')) {
            const articleCard = e.target.closest('.article-card');
            if (articleCard) {
                const title = articleCard.querySelector('.article-card__title').textContent;
                const author = articleCard.querySelector('.article-card__author').textContent;
                handleArticleRead(e.target, title, author);
            }
        }
    });
    
    // Subscription buttons
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Оформить подписку') || e.target.textContent.includes('Связаться с нами')) {
            const subscriptionCard = e.target.closest('.subscription-card');
            if (subscriptionCard) {
                const type = subscriptionCard.querySelector('h3').textContent;
                handleSubscription(type);
            }
        }
    });
    
    // Archive buttons
    document.addEventListener('click', function(e) {
        if (e.target.textContent.includes('Открыть номер')) {
            const issueCard = e.target.closest('.issue-card');
            if (issueCard) {
                const number = issueCard.querySelector('.issue-number').textContent;
                const year = issueCard.querySelector('.issue-year').textContent;
                handleIssueOpen(number, year);
            }
        }
    });
}

// Archive functionality
function initializeArchive() {
    const yearFilter = document.getElementById('yearFilter');
    
    if (yearFilter) {
        yearFilter.addEventListener('change', function() {
            filterArchiveByYear(this.value);
        });
    }
}

function filterArchiveByYear(year) {
    const issueCards = document.querySelectorAll('.issue-card');
    
    issueCards.forEach(card => {
        const issueYear = card.querySelector('.issue-year').textContent;
        if (year === 'all' || issueYear === year) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterArticles(query) {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        const title = card.querySelector('.article-card__title').textContent.toLowerCase();
        const author = card.querySelector('.article-card__author').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || author.includes(query.toLowerCase())) {
            card.style.display = 'flex';
        } else {
            card.style.display = query ? 'none' : 'flex';
        }
    });
}

// Article reading
function handleArticleRead(button, title, author) {
    showArticleModal(title, author);
}

function showArticleModal(title, author) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="article-author"><strong>Автор:</strong> ${author}</p>
                <div class="article-access">
                    <p>Для доступа к полному тексту статьи необходима подписка на журнал.</p>
                    <div class="access-options">
                        <button class="btn btn--primary" onclick="handleSubscription('Электронная версия')">Оформить подписку</button>
                        <button class="btn btn--outline" onclick="orderSingleArticle('${title}')">Заказать отдельную статью</button>
                    </div>
                </div>
                <div class="article-preview">
                    <h4>Краткое содержание:</h4>
                    <p>Статья посвящена анализу современных подходов к правовому регулированию в области частного права. Рассматриваются теоретические основы и практические аспекты применения новых правовых механизмов в условиях цифровой трансформации общества.</p>
                    <p>Автор анализирует существующие правовые нормы, выявляет проблемы правоприменения и предлагает пути их решения. Особое внимание уделяется вопросам соответствия российского законодательства международным стандартам.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Subscription handling
function handleSubscription(type) {
    const subscriptionData = {
        'Печатная версия': {
            price: '12,000 ₽/год',
            features: ['12 номеров в год', 'Доставка по России', 'Доступ к архиву', 'Сертификат подписчика']
        },
        'Электронная версия': {
            price: '8,000 ₽/год',
            features: ['Мгновенный доступ к номерам', 'Полнотекстовый поиск', 'Скачивание PDF', 'Уведомления о новых выпусках']
        },
        'Корпоративная': {
            price: 'от 25,000 ₽/год',
            features: ['Доступ для всех сотрудников', 'Печатная + электронная версия', 'Приоритетная поддержка', 'Скидки на конференции']
        }
    };
    
    const data = subscriptionData[type] || subscriptionData['Электронная версия'];
    showSubscriptionModal(type, data);
}

function showSubscriptionModal(type, data) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Подписка: ${type}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="subscription-details">
                    <div class="price" style="font-size: 1.5em; color: var(--nschp-blue); margin-bottom: 1rem;">${data.price}</div>
                    <ul style="margin-bottom: 1rem;">
                        ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <form class="subscription-form">
                    <div class="form-group">
                        <label class="form-label">Ф.И.О.</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Телефон</label>
                        <input type="tel" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Организация</label>
                        <input type="text" class="form-control">
                    </div>
                    <button type="submit" class="btn btn--primary">Оформить подписку</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Handle form submission
    modal.querySelector('.subscription-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#dc3545';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            showSuccessMessage(`Заявка на подписку "${type}" успешно отправлена! Мы свяжемся с вами в ближайшее время.`);
            modal.remove();
        } else {
            alert('Пожалуйста, заполните все обязательные поля');
        }
    });
}

// Issue opening
function handleIssueOpen(number, year) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Выпуск ${number}, ${year}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Содержание выпуска ${number} за ${year} год:</p>
                <div class="issue-content">
                    <div class="article-item">
                        <h4>Актуальные вопросы гражданского права</h4>
                        <p>Автор: Лялин Даниил Вадимович</p>
                        <p>Страницы: 3-18</p>
                    </div>
                    <div class="article-item">
                        <h4>Правовое регулирование Бешбармака</h4>
                        <p>Автор: Оторбаев Алишер Уланбекович</p>
                        <p>Страницы: 19-35</p>
                    </div>
                    <div class="article-item">
                        <h4>Судебная практика по кадетским спорам</h4>
                        <p>Автор: ДжекаКлим</p>
                        <p>Страницы: 36-52</p>
                    </div>
                </div>
                <div class="issue-access">
                    <p>Для доступа к полному содержанию выпуска необходима подписка.</p>
                    <button class="btn btn--primary" onclick="handleSubscription('Электронная версия')">Оформить подписку</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Order single article
function orderSingleArticle(title) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Заказать статью</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Статья:</strong> ${title}</p>
                <p><strong>Стоимость:</strong> 500 ₽</p>
                <form class="order-form">
                    <div class="form-group">
                        <label class="form-label">Ф.И.О.</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn--primary">Заказать статью</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle modal close
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Handle form submission
    modal.querySelector('.order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessMessage('Заказ принят! Статья будет отправлена на указанный email после подтверждения оплаты.');
        modal.remove();
    });
}

// Success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="alert alert-success">
            <strong>Успешно!</strong> ${message}
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}