# 🧠 CryptoAdmin Dashboard

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-3.x-blue.svg)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/redux--toolkit-%5E2.6.1-purple.svg)](https://redux-toolkit.js.org/)

A powerful, modern cryptocurrency market dashboard built with **React**, **TailwindCSS**, **Recharts**, **D3**, and **Vite**. Track real-time market data, visualize price trends, and interact with advanced charting tools in a responsive, modular layout.

> 📍 Repo: [github.com/russell-henderson/cryptoadmin_dashboard](https://github.com/russell-henderson/cryptoadmin_dashboard)

---

![Dashboard Preview](public/assets/images/dashboard-preview.png)

---

## 🚀 Features

- 📊 Real-time price charts with Candlestick, Line, and Area views
- 🧮 Toggleable technical indicators (MA20, MA50, RSI, MACD)
- 💹 Market metrics cards with sparklines and animated deltas
- ⏱ Live price ticker panel with volume and watchlist support
- 🎛 Global controls for time range, refresh interval, and exchange
- 🌙 Dark/Light mode with smooth transitions
- 📱 Responsive layout using Tailwind grid and container queries
- 🧪 Fully testable with Jest + React Testing Library

---

## 🛠 Tech Stack

| Layer        | Tech                                                                 |
|--------------|----------------------------------------------------------------------|
| Frontend     | React 18, Vite, TailwindCSS                                           |
| Visualization| D3.js, Recharts                                                      |
| State        | Redux Toolkit, React Context                                         |
| Styling      | TailwindCSS, @tailwindcss/forms, fluid-type, animate, elevation      |
| Animation    | Framer Motion                                                        |
| Routing      | React Router v6                                                      |
| UI Helpers   | Lucide-react, clsx, class-variance-authority                         |
| Forms        | React Hook Form                                                      |
| Tooling      | ESLint, Prettier, dotenv, Axios                                      |

---

## 📁 Folder Structure

```bash
cryptoadmin_dashboard/
├── public/
│   └── assets/images/dashboard-preview.png  # Preview image
├── src/
│   ├── components/         # Reusable shared components
│   ├── pages/
│   │   ├── market-overview-dashboard/
│   │   │   ├── components/ # Local widgets: Chart, Metrics, Ticker
│   │   │   └── index.jsx   # Main dashboard view
│   ├── styles/             # Tailwind & global styles
│   ├── App.jsx             # Main app shell
│   ├── index.jsx           # Entry point
│   └── Routes.jsx          # React Router declarations
````

---

## 🧰 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/russell-henderson/cryptoadmin_dashboard.git
cd cryptoadmin_dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🧪 Running Tests

```bash
npm run test
```

This will run all unit and component tests using:

* `@testing-library/react`
* `@testing-library/jest-dom`
* `@testing-library/user-event`

---

## 📦 Production Build

```bash
npm run build
```

This will generate the production-ready files in the `dist/` folder.

---

## 🤝 Contributing

We welcome contributors! To get started:

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "feat: your message"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

Make sure your code follows:

* ✅ Functional React components
* ✅ Tailwind utility-first styling
* ✅ Prettier formatting (`npm run format`)

---

## 📍 Roadmap

* [ ] WebSocket support for live price feeds
* [ ] User-authenticated watchlist
* [ ] Full theming panel and palette switcher
* [ ] Exchange dropdown with real API data
* [ ] Modular plugin system for charts and controls

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌐 Live Demo

*Coming soon… hosted on Netlify/Vercel*

---

## 🙌 Acknowledgments

Built and maintained by [@russell-henderson](https://github.com/russell-henderson)




