# 🍅 Pomodoro Focus Timer

A beautiful, modern Pomodoro timer application with integrated lofi music player and motivational companion. Built with React, TypeScript, and Tailwind CSS.

![Pomodoro Focus Timer](https://img.shields.io/badge/version-1.0.0-brightgreen) ![React](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)

## ✨ Features

### 🎯 Pomodoro Timer
- **Three timer modes**: Focus (25 min), Short Break (5 min), Long Break (15 min)
- **Customizable durations** for all timer modes
- **Cycle tracking** with progress visualization
- **Auto-start options** for breaks and pomodoros
- **Visual progress ring** with mode-specific colors
- **Tab title updates** showing remaining time

### 🎵 Integrated Lofi Music Player
- **Spotify Web Player** embedded directly in the app
- **Mode-synchronized colors** that adapt to Focus/Break modes
- **Expandable/collapsible** interface for desktop
- **Lofi Beats playlist** for optimal concentration
- **Responsive design** for mobile and desktop layouts

### 💬 Motivational Character Companion
- **Cute anime character** that provides encouragement
- **Dynamic messages** alternating between motivational quotes and fun facts
- **Customizable interval** (5-120 seconds) via settings
- **Mode-aware messages**: Motivational during focus, relaxing during breaks
- **Interactive controls**: Click to minimize bubble, hover to dismiss
- **Toggle on/off** via controls panel

### 🎨 Beautiful UI/UX
- **Glassmorphism design** with backdrop blur effects
- **Dark mode support** with smooth transitions
- **Responsive layout**: 
  - Mobile: Stacked vertical layout
  - Desktop: Two-column grid with sticky positioning
- **Smooth animations** throughout the interface
- **Color-coded modes** with gradients and glows
- **Custom scrollbars** hidden for clean aesthetics

### 📚 Educational FAQ Section
- **Mobile**: Modal popup with full information
- **Desktop**: Inline sidebar with scrollable content
- **Comprehensive guide** to Pomodoro Technique
- **Step-by-step instructions** with numbered list
- **Benefits overview** and fun facts

### ⚙️ Customization Options
- **Timer Durations**: Adjust focus, short break, and long break times
- **Long Break Interval**: Set cycle count before long break
- **Auto-start Settings**: Enable/disable auto-starting
- **Character Message Interval**: Control how often motivational messages change
- **Theme Toggle**: Switch between light and dark modes
- **Character Toggle**: Show/hide the motivational companion

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/itzcaesar/pomodoro-focus.git
cd pomodoro-focus
```

2. Install dependencies
```bash
npm install
```

3. Add character image
- Place your character image as `char.png` in the `public/` folder

4. Start development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🎨 Tech Stack

- **React 19.2.0** - UI Framework
- **TypeScript 5.8.2** - Type Safety
- **Vite 6.2.0** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-First Styling
- **Lucide React** - Icon Library
- **Spotify Web Playback** - Music Integration

## 📁 Project Structure

```
pomodoro-focus/
├── components/
│   ├── Controls.tsx              # Timer controls with theme/settings
│   ├── FaqInline.tsx            # Desktop FAQ sidebar
│   ├── FaqModal.tsx             # Mobile FAQ modal
│   ├── LofiPlayer.tsx           # Spotify player integration
│   ├── ModeSelector.tsx         # Timer mode switcher
│   ├── MotivationalCharacter.tsx # Animated companion character
│   ├── ProgressRing.tsx         # Circular timer progress
│   └── SettingsModal.tsx        # Settings configuration
├── hooks/
│   └── useTimer.ts              # Timer logic & state management
├── utils/
│   ├── sound.ts                 # Audio notifications
│   └── spotify.ts               # Spotify API utilities
├── public/
│   └── char.png                 # Character image asset
├── App.tsx                      # Main application component
├── constants.ts                 # App-wide constants & defaults
├── types.ts                     # TypeScript type definitions
├── index.tsx                    # Application entry point
└── index.html                   # HTML template
```

## 🎯 How to Use

1. **Select Mode**: Choose between Focus, Short Break, or Long Break
2. **Customize Settings**: Click the settings icon to adjust durations and preferences
3. **Start Timer**: Hit the play button to begin your session
4. **Enjoy Music**: Expand the Spotify player to browse lofi beats
5. **Stay Motivated**: Read messages from your companion character
6. **Track Progress**: Watch your cycle count toward the next long break

## 🎨 Color Palette

The app uses a lofi-inspired color scheme that adapts to timer modes:

- **Focus Mode**: Rose & Orange gradients
- **Short Break**: Cyan & Emerald tones
- **Long Break**: Violet & Fuchsia hues

## 💾 Data Persistence

All settings and preferences are saved to `localStorage`:
- Timer durations
- Auto-start preferences
- Dark mode preference
- Character visibility toggle
- Message interval settings

## 🎵 Music Attribution

Music powered by Spotify's "Lofi Beats" playlist. You'll need to authenticate with Spotify to play music.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

**itzcaesar**
- GitHub: [@itzcaesar](https://github.com/itzcaesar)

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique® by Francesco Cirillo
- Design inspired by modern glassmorphism trends
- Character artwork for motivational companion
- Lofi music community for focus-enhancing playlists

---

Made with ❤️ and ☕ for productive work sessions
