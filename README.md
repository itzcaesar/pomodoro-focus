# 🍅 Pomodoro Focus Timer

A beautiful, modern Pomodoro timer with integrated music player, aesthetic backgrounds, motivational companion, and productivity tracking.

![Version](https://img.shields.io/badge/version-3.1.0-brightgreen) ![React](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)

## ✨ Features

- **🎯 Timer**: Focus (25min), Short Break (5min), Long Break (15min) with customizable durations
- **⌨️ Shortcuts**: Space (play/pause), R (reset), 1/2/3 (modes), Esc (close)
- **🔔 Notifications**: Sound chime + browser alerts + confetti on cycle completion
- **📊 Statistics**: Session tracking, streaks, focus/break time, history
- **🎵 Music**: YouTube & Spotify support with custom URLs
- **🖼️ Backgrounds**: Pixabay API with hourly refresh
- **💬 Character**: Motivational companion with glassmorphism speech bubbles
- **🎨 UI**: Enhanced glassmorphism, dark mode, mode-synced colors (Amber/Teal/Sky)

## 🚀 Quick Start

```bash
# Clone & install
git clone https://github.com/itzcaesar/pomodoro-focus.git
cd pomodoro-focus
npm install

# Setup .env
VITE_PIXABAY_API_KEY=your_key_here

# Run
npm run dev
```

Get your free Pixabay API key: https://pixabay.com/api/docs/

## 🛠️ Tech Stack

- React 19.2.0 + TypeScript 5.8.2
- Vite 6.2.0 + Tailwind CSS
- Lucide React Icons
- YouTube & Spotify Embeds
- Pixabay API
- Vercel Hosting

## 📦 Build & Deploy

```bash
npm run build
npm run preview

# Deploy to Vercel
# Add PIXABAY_API_KEY env variable in dashboard
```

## 🎨 Color Modes

- **Focus**: Amber → Orange
- **Short Break**: Teal → Emerald  
- **Long Break**: Sky → Blue

All UI components sync with active mode.

## 💾 Persistence

Settings, preferences, and stats saved to localStorage with automatic migration.

## 📝 License

MIT License - Open source and free to use.

## 👨‍💻 Author

**itzcaesar** - [@itzcaesar](https://github.com/itzcaesar)

---

Made with ❤️ for productive work sessions
