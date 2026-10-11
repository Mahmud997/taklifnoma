<div align="center">

# Taklif Pro — интерактивные электронные пригласительные

**Красивые пригласительные для тоев, сундет-тоев, құдалық и дней рождения.**
Гость открывает ссылку — видит страницу с картой, музыкой и кнопкой «Я приду».
Хозяин видит, сколько человек реально приедет.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

*Шымкент • Сайрам • весь Казахстан*

</div>

---

## ✨ Демо

| Страница | Ссылка (локально) | Описание |
|---|---|---|
| Лендинг | `/` | Презентация, примеры, тарифы |
| Пригласительная | `/invite/arman-aruzhan` | ТоЙ Арман & Аружан — живая, с RSVP |
| Пригласительная | `/invite/sundet-demo` | Сундет-той |
| Панель хозяина | `/host/arman-aruzhan` | Счётчики гостей в реальном времени |

> **Попробуйте:** откройте пригласительную, отправьте RSVP, затем откройте панель хозяина — ответ появится в списке.

![Скриншот пригласительной](public/screenshot-invite.png)

## 🚀 Быстрый старт

```bash
git clone https://github.com/your-username/taklif-pro.git
cd taklif-pro
npm install
npm run dev
```

Откройте http://localhost:3000 — всё работает **без бэкенда и регистрации** (RSVP хранится в localStorage гостя).

### Подключение Firebase (опционально)

Чтобы RSVP гостей был общим для всех устройств:

1. Создайте проект в [Firebase Console](https://console.firebase.google.com) → Realtime Database (режим test).
2. Скопируйте `.env.example` в `.env.local` и вставьте URL базы:
   ```
   NEXT_PUBLIC_FIREBASE_DB_URL=https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app
   ```
3. Перезапустите `npm run dev`. RSVP будет писаться в базу через REST API — SDK не нужен.

### Деплой

```bash
npm run build
```

Задеплойте на **Vercel** (бесплатно) или **Firebase Hosting** — оба работают из коробки.

## 🧩 Возможности

- 📱 **Мобильный-first дизайн** — 99% гостей откроют с телефона
- ✅ **RSVP в один тап**: «приду один / вдвоём / с семьёй / не смогу»
- 🗺️ **Кнопки 2GIS, Яндекс и Google Maps**
- ⏳ **Обратный отсчёт** до события
- 🎵 **Музыка** по кнопке (без автоплея)
- 👑 **Панель хозяина**: точное число гостей, список ответов, автообновление
- 🌐 **Двуязычие казахский / русский**
- 🔥 **Firebase Realtime DB** через REST (или localStorage для демо)

## 🗂️ Структура

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Лендинг
│   │   ├── invite/[id]/page.tsx  # Пригласительная + RSVP
│   │   └── host/[id]/page.tsx    # Панель хозяина
│   ├── layout.tsx
│   └── globals.css
└── lib/
    ├── types.ts                  # EventData, Rsvp
    ├── events.ts                 # Данные событий (заменить на БД в проде)
    └── rsvp.ts                   # Слой хранения: Firebase REST или localStorage
```

## 🗺️ Roadmap

- [ ] Личный кабинет и Google-авторизация
- [ ] Визуальный конструктор и 6+ шаблонов
- [ ] Персональные ссылки для каждого гостя
- [ ] Рассадка по столам + экспорт в Excel
- [ ] Оплата Kaspi / QR
- [ ] Telegram-бот: уведомление хозяину о каждом RSVP
- [ ] PWA — «установить пригласительную на экран»

## 💰 Модель

Разовая оплата за пригласительную: **2 000 / 5 000 / 12 000 ₸** (Старт / Стандарт / Премиум).

## 🤝 Вклад

Issues и PR приветствуются. Перед PR: `npm run type-check`.

## 📄 Лицензия

MIT — используйте свободно, ссылка на проект приветствуется.

---

<div align="center">
Сделано с любовью к той культуре 🐎🎉<br>
<b>Taklif Pro</b> — вместо бумажных пригласительных и кривых картинок в WhatsApp.
</div>
