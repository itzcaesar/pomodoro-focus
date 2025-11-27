# 🍅 Pomodoro Focus Timer

A beautiful, modern Pomodoro timer application with integrated Spotify music player, aesthetic backgrounds, and motivational companion. Built with React, TypeScript, and Tailwind CSS.

![Pomodoro Focus Timer](https://img.shields.io/badge/version-2.0.0-brightgreen) ![React](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)

## ✨ Features

### 🎯 Pomodoro Timer
- **Three timer modes**: Focus (25 min), Short Break (5 min), Long Break (15 min)
- **Customizable durations** for all timer modes
- **Cycle tracking** with progress visualization
- **Auto-start options** for breaks and pomodoros
- **Visual progress ring** with mode-specific colors
- **Tab title updates** showing remaining time
- **Color-synchronized UI** - all components adapt to current timer mode

### 🎵 Multi-Platform Music Player
- **YouTube & Spotify support** - choose your preferred platform
- **YouTube advantages**: Full playback for free users, built-in volume controls, no login required
- **Spotify advantages**: Access to official playlists, familiar interface
- **Custom playlist/video URLs** - paste any URL from either platform
- **Platform switcher** in settings with visual selection
- **Mode-synchronized colors** that adapt to Focus/Break modes
- **Expandable/collapsible** interface for desktop
- **Responsive design** for mobile and desktop layouts
- **Default content**: YouTube lofi stream (24/7) and Spotify lofi playlist

### 🖼️ Aesthetic Backgrounds
- **Pixabay API integration** for beautiful, curated background images
- **Automatic orientation** - horizontal for desktop, vertical for mobile
- **16 aesthetic search queries** for varied lofi-inspired imagery
- **Auto-refresh** every hour with new backgrounds
- **Photographer attribution** with credits overlay
- **Toggle on/off** via settings
- **Secure API implementation** - development and production modes

### 💬 Motivational Character Companion
- **Cute anime character** that provides encouragement
- **Dynamic messages** alternating between motivational quotes and fun facts
- **Customizable interval** (5-120 seconds) via settings
- **Mode-aware messages**: Motivational during focus, relaxing during breaks
- **Color-synchronized speech bubbles** matching timer mode
- **Bounce animation** for engaging interaction
- **Interactive controls**: Click to minimize bubble, hover to dismiss
- **Toggle on/off** via controls panel

### 🎨 Beautiful UI/UX
- **Glassmorphism design** with advanced backdrop blur effects
- **Consistent blur intensity** across all components
- **Dark mode support** with pure black panels
- **Responsive layout**: 
  - Mobile: Stacked vertical layout
  - Desktop: Two-column grid with sticky positioning
- **Smooth animations** throughout the interface
- **Color-coded modes** with gradients and glows:
  - Focus: Rose & Orange
  - Short Break: Cyan & Emerald
  - Long Break: Violet & Fuchsia
- **Custom scrollbars** hidden for clean aesthetics
- **Enhanced text visibility** in both light and dark modes

### 📚 Educational FAQ Section
- **Mobile**: Modal popup with full information
- **Desktop**: Inline sidebar with scrollable content, glassmorphism panel
- **Comprehensive guide** to Pomodoro Technique
- **Step-by-step instructions** with numbered list
- **Benefits overview** and fun facts about the technique
- **Mode-synchronized colors** for visual consistency

### ⚙️ Customization Options
- **Timer Durations**: Adjust focus, short break, and long break times
- **Long Break Interval**: Set cycle count before long break
- **Auto-start Settings**: Enable/disable auto-starting
- **Character Message Interval**: Control how often motivational messages change
- **Music Platform**: Choose between YouTube or Spotify
- **Custom Music URLs**: Paste YouTube video/playlist or Spotify playlist links
- **Aesthetic Backgrounds**: Toggle background images on/off
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

3. Set up environment variables
Create a `.env` file in the root directory:
```env
# For development (local testing)
VITE_PIXABAY_API_KEY=your_pixabay_api_key_here

# For production (Vercel deployment)
PIXABAY_API_KEY=your_pixabay_api_key_here
```

Get your free Pixabay API key at: https://pixabay.com/api/docs/

4. Start development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Deployment to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variable `PIXABAY_API_KEY` in Vercel dashboard
4. Deploy!

The app includes a serverless API route (`/api/background`) for secure API key handling in production.

## 🎨 Tech Stack

- **React 19.2.0** - UI Framework
- **TypeScript 5.8.2** - Type Safety
- **Vite 6.2.0** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-First Styling
- **Lucide React** - Icon Library
- **YouTube & Spotify Embeds** - Multi-platform Music
- **Pixabay API** - Background Images
- **Vercel** - Hosting & Serverless Functions

## 📁 Project Structure

```
pomodoro-focus/
├── api/
│   └── background.ts            # Vercel serverless function for Pixabay API
├── components/
│   ├── Controls.tsx             # Timer controls with theme/settings
│   ├── FaqInline.tsx           # Desktop FAQ sidebar with glassmorphism
│   ├── FaqModal.tsx            # Mobile FAQ modal
│   ├── MusicPlayer.tsx         # Multi-platform music player (YouTube/Spotify)
│   ├── ModeSelector.tsx        # Timer mode switcher with color sync
│   ├── MotivationalCharacter.tsx # Animated companion with mode-based colors
│   ├── ProgressRing.tsx        # Circular timer progress
│   └── SettingsModal.tsx       # Settings with platform switcher & URLs
├── hooks/
│   └── useTimer.ts             # Timer logic & state management
├── utils/
│   ├── pixabay.ts              # Pixabay API integration with dev/prod modes
│   └── sound.ts                # Audio notifications
├── App.tsx                     # Main application with background system
├── constants.ts                # Mode colors, gradients, player styles
├── types.ts                    # TypeScript definitions with Settings interface
├── index.tsx                   # Application entry point
└── index.html                  # HTML with global CSS and animations
```

## 🎯 How to Use

1. **Select Mode**: Choose between Focus, Short Break, or Long Break
2. **Customize Settings**: Click the settings icon to adjust durations and preferences
3. **Add Your Playlist**: Paste any Spotify playlist URL in settings for custom music
4. **Start Timer**: Hit the play button to begin your session
5. **Enjoy Music**: Expand the Spotify player to browse and play your playlist
6. **Stay Motivated**: Read messages from your companion character
7. **Track Progress**: Watch your cycle count toward the next long break
8. **Toggle Backgrounds**: Enable aesthetic backgrounds for a more immersive experience

## 🎨 Color System

The app uses a comprehensive color synchronization system:

- **Focus Mode**: Rose & Orange gradients
  - Timer ring, mode selector, FAQ icon, character bubble
- **Short Break**: Cyan & Emerald tones
  - All UI elements adapt to calming blue-green palette
- **Long Break**: Violet & Fuchsia hues
  - Purple gradients across all synchronized components

### Glassmorphism Design
- **glass-button**: 10px blur for controls and smaller panels
- **glass-panel**: 20px blur for main containers
- **Dark mode**: Pure black (`rgba(0,0,0,0.6)`) panels for true OLED black
- **Light mode**: Bright, translucent white panels

## 💾 Data Persistence

All settings and preferences are saved to `localStorage`:
- Timer durations
- Auto-start preferences
- Dark mode preference
- Character visibility toggle
- Message interval settings
- Music platform choice (YouTube/Spotify)
- Custom YouTube/Spotify URLs
- Background toggle preference

Settings migrate automatically when new features are added.

## 🎵 Music Setup

### Choosing Your Platform
1. Open Settings
2. Click on either **YouTube** or **Spotify** button
3. Paste your custom URL (optional)

### YouTube (Recommended)
- ✅ **No login required**
- ✅ **Full playback** for all users
- ✅ **Volume controls** built-in
- ✅ Works with videos and playlists
- Default: Lofi Girl 24/7 stream

**How to use:**
1. Find any lofi video or playlist on YouTube
2. Copy the URL
3. Paste in Settings → YouTube Playlist URL
4. Enjoy full control over playback!

### Spotify
- Requires login for full songs (otherwise 30-second previews)
- Great for official curated playlists
- Default: Spotify "Lofi Beats" playlist

**How to use:**
1. Find any playlist on Spotify
2. Click "Share" → "Copy playlist link"
3. Paste in Settings → Spotify Playlist URL
4. Log into Spotify in the player for full playback

## 🖼️ Background Images

Powered by Pixabay API with:
- **16 aesthetic queries**: lofi aesthetic, cozy aesthetic, pastel colors, etc.
- **Automatic orientation**: Horizontal (desktop) / Vertical (mobile)
- **Hourly refresh**: New background every hour
- **Credit system**: 5-second photographer attribution overlay
- **Secure implementation**: API key hidden via serverless function in production

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
- Character image from [source URL]
- Background images provided by [Pixabay](https://pixabay.com)
- Music integration powered by [Spotify](https://spotify.com)
- Lofi music community for focus-enhancing playlists

## 🔧 Recent Updates (v2.0.0)

### New Features
- 🎵 **Multi-platform music player** - YouTube and Spotify support with platform switcher
- ✨ Custom YouTube video/playlist URLs
- ✨ Custom Spotify playlist support
- 🖼️ Pixabay API integration for aesthetic backgrounds
- 🎨 Complete color synchronization across all UI components
- 💫 Enhanced glassmorphism with consistent blur effects
- 🌓 Improved dark mode with pure black panels
- 📱 Better responsive design for mobile/desktop

### Improvements
- YouTube as default platform (no login, full playback, volume controls)
- Settings migration system for backward compatibility
- Dual-mode API handling (development/production)
- Enhanced text visibility in both themes
- Optimized background image loading
- Secure API key management with Vercel serverless functions
- Platform-specific URL validation and parsing

### Bug Fixes
- Fixed mode selector gradient issues
- Resolved FAQ and player blur inconsistencies
- Improved localStorage handling for new settings
- Fixed background orientation detection

---

Made with ❤️ and ☕ for productive work sessions
