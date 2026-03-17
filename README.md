# Nuxt Products App

Интерактивное приложение для просмотра, фильтрации и поиска товаров. Демонстрирует возможности Nuxt 4, Vue 3 и современного frontend-стека.

---

## 🚀 Стек технологий

| Категория | Технологии |
|-----------|------------|
| **Framework** | Nuxt 4 (Vue 3.5) |
| **Language** | TypeScript |
| **State Management** | Pinia |
| **Styling** | SCSS + CSS Variables |
| **Images** | @nuxt/image |
| **Testing** | Vitest + @vue/test-utils |
| **Linting** | ESLint 9 + Prettier |

---

## ✨ Фичи

- **Поиск товаров** — поиск по названию и бренду с debounce
- **Фильтрация** — по категории, бренду, тегам, наличию, ключевым словам и другим параметрам
- **Сортировка** — по цене, названию, рейтингу (asc/desc)
- **Адаптивный дизайн** — mobile/tablet/desktop версии
- **Ленивая загрузка** — пагинация через "Show more"
- **Skeleton screens** — плейсхолдеры при загрузке

---

## 🏃 Быстрый старт

### Требования

- Node.js 18+
- npm/pnpm/yarn

### Установка

```bash
# Клонирование репозитория
git clone <repository-url>
cd NUXT-PRACTICE

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

Приложение доступно по адресу: http://localhost:3000

---

## 📁 Структура проекта

```
NUXT-PRACTICE/
├── app/                      # Клиентская часть
│   ├── assets/               # SCSS, SVG, изображения
│   │   ├── styles/           # Глобальные стили, миксины, переменные
│   │   └── svg/              # SVG иконки
│   ├── components/           # Vue компоненты
│   │   ├── Base/             # Базовые UI компоненты (Input, Select)
│   │   ├── Filter/           # Компоненты фильтрации
│   │   ├── Product/          # Компоненты товаров
│   │   ├── Skeleton/         # Skeleton-заглушки
│   │   └── Sort/             # Компоненты сортировки
│   ├── composables/          # Vue composables (reactive logic)
│   ├── constants/            # Константы приложения
│   ├── layouts/              # Layout-компоненты
│   ├── pages/                # Страницы (роутинг)
│   ├── store/                # Pinia store
│   ├── utils/                # утилиты
│   └── app.vue               # Корневой компонент
│
├── server/                   # Серверная часть (Node.js)
│   └── api/                  # API endpoints
│      ├── ProductsFetchAll.ts
│      ├── ProductsSearch.ts
│      └── ProductsFilters.ts
│   
│
├── shared/                   # Общие типы и данные
│   ├── types/                # TypeScript типы
│   └── interfaces/           # TypeScript интерфейсы
│
├── public/                   # Статические файлы
├── app.config.ts             # Конфигурация Nuxt
├── nuxt.config.ts            # Конфигурация Nuxt
├── tsconfig.json             # TypeScript конфигурация
├── eslint.config.mjs         # ESLint конфигурация
└── package.json              # Зависимости и скрипты
```

---

## 🛠 Доступные команды

```bash
# Разработка
npm run dev              # Запуск dev-сервера

# Сборка
npm run build            # Production сборка
npm run generate         # SSR генерация
npm run preview          # Preview production сборки

# Код-качество
npm run lint             # ESLint проверка
npm run lint:fix         # ESLint исправление
npm run format           # Prettier форматирование

# Тестирование
npm run test             # Запуск Vitest тестов
```

---

## 🎨 Архитектурные решения

### State Management (Pinia)

Всё состояние приложения хранится в одном store (`useFilterPageStore`), который управляет:
- Загрузкой данных (products, filters)
- Активными фильтрами
- Сортировкой
- Поисковым запросом
- UI состояниями (открытые панели, загрузка)

**Почему так:** Для демонстрационного проекта это упрощает понимание потока данных. В production приложении store был бы разделён на модули.

### Компонентная архитектура

Компоненты разделены по назначению:
- **Base** — переиспользуемые UI компоненты без бизнес-логики
- **Feature-based** (Filter, Product, Sort) — компоненты с бизнес-логикой
- **Skeleton** — заглушки для состояния загрузки

---

## 🔌 API

Приложение использует [DummyJSON API](https://dummyjson.com/products):

| Endpoint | Описание |
|----------|----------|
| `GET /products` | Список товаров с пагинацией |
| `GET /products/search?q=` | Поиск товаров |
| `GET /products/filters` | Доступные фильтры |

---

## 📝 Known Limitations

Проект создан в учебных целях. Следующие ограничения осознанны:

| Ограничение | Причина |
|-------------|---------|
| Store содержит всю логику в одном месте | Упрощение для демонстрации |
| Нет полноценной корзины | Фокус на фильтрации и поиске |
| Минимальное покрытие тестами | В процессе изучения тестирования |
| Хардкод данных фильтров | Демонстрация структуры |
| Поиск загружает все результаты сразу | DummyJSON API не поддерживает пагинацию (skip/limit) для `/search` endpoint |

---

## 🚀 Что можно улучшить

- [ ] Разделить store на модули (products, filters, cart)
- [ ] Добавить полноценную корзину с сохранением в localStorage
- [ ] Добавить компонент отдельного товара [id].vue
- [ ] Покрыть тестами store и composables
- [ ] Добавить обработку ошибок API
- [ ] Добавить Nuxt SEO модуль
- [ ] Добавить i18n
- [ ] Оптимизировать бандл (code splitting)
