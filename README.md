# Lorricards

A modern flashcard application built with React and TypeScript, featuring seamless authentication and state management.

## 📋 Overview

Lorricards is a web-based flashcard application designed to help users create, organize, and study flashcards efficiently. The application features a clean, responsive interface built with modern web technologies.

## ✨ Features

- 🔐 **Google Authentication** - Secure sign-in with Google OAuth
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🎨 **Modern UI** - Beautiful interface powered by Tailwind CSS
- 💾 **State Management** - Efficient state handling with Zustand
- ⚡ **Fast Performance** - Built with Vite for optimal build times and HMR

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | UI framework for building interactive user interfaces |
| **TypeScript** | Type-safe JavaScript for better developer experience |
| **Zustand** | Lightweight state management solution |
| **Axios** | HTTP client for API requests |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Google OAuth** | Authentication provider for secure user login |
| **Vite** | Next-generation frontend build tool |

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Google OAuth credentials (for authentication)

### Installation

1. Clone the repository
```bash
git clone https://github.com/jeremydanielestrada/Lorricards.git
cd Lorricards
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env file in the root directory
# Add your Google OAuth credentials and API endpoints
VITE_GOOGLE_CLIENT_ID=your_client_id_here
VITE_API_URL=your_api_url_here
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
Lorricards/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── store/          # Zustand store configurations
│   ├── services/       # API services and Axios configurations
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── App.tsx         # Main application component
├── public/             # Static assets
└── index.html          # HTML entry point
```

## 🔧 Configuration

### ESLint

The project uses ESLint with TypeScript support. For production applications, consider enabling type-aware lint rules:

```js
export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### Tailwind CSS

Tailwind is configured to scan all component files. Customize your theme in `tailwind.config.js`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Jeremy Daniel Estrada**

- GitHub: [@jeremydanielestrada](https://github.com/jeremydanielestrada)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- All contributors and supporters of this project

---

Built with ❤️ using React and TypeScript