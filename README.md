# StreamHub - Movie Streaming Dashboard

A modern, responsive movie streaming dashboard built with Next.js 14, TypeScript, and Tailwind CSS. Discover and explore thousands of movies with an intuitive interface similar to popular streaming platforms.

## 🚀 Features

- **Hero Banner**: Eye-catching display of featured movies with backdrop images
- **Movie Categories**: Browse movies by Popular, Top Rated, Upcoming, and Now Playing
- **Horizontal Scrolling**: Smooth horizontal scrolling with custom scroll buttons
- **Movie Details**: Detailed movie pages with cast information, ratings, and descriptions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Loading**: Optimized images and server-side rendering for performance
- **Type Safety**: Full TypeScript implementation with proper interfaces

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: TMDB (The Movie Database)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- TMDB API Key (get one from [TMDB](https://www.themoviedb.org/settings/api))

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sureshnenavath/StoryBiteAssessment.git
   cd streaming-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
streaming-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with header
│   ├── page.tsx            # Homepage with movie rows
│   ├── movie/[id]/
│   │   └── page.tsx        # Dynamic movie detail pages
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── HeroBanner.tsx      # Hero section
│   ├── MovieCard.tsx       # Individual movie card
│   ├── MovieRow.tsx        # Horizontal movie row
│   ├── MovieDetails.tsx    # Movie detail component
│   ├── CastSection.tsx     # Cast information
│   └── ui/
│       └── ScrollButtons.tsx # Scroll navigation buttons
├── lib/
│   ├── tmdb.ts             # TMDB API functions
│   ├── utils.ts            # Utility functions
│   └── scrollUtils.ts      # Scroll functionality hook
├── types/
│   └── tmdb.ts             # TypeScript interfaces
└── public/                 # Static assets
```

## 🎯 Key Components

### MovieRow Component
- Displays movies in horizontal scrollable rows
- Includes custom scroll buttons for navigation
- Responsive design with different card sizes

### Scroll Functionality
- Custom hook `useScrollWithButtons` for managing scroll state
- Smooth scrolling with button controls
- Automatic button visibility based on scroll position

### API Integration
- Server-side data fetching for optimal performance
- Type-safe API responses
- Error handling and fallbacks

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variable `TMDB_API_KEY` in Vercel dashboard
3. Deploy automatically on each push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes as part of a technical assessment.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com/) for hosting and deployment

## 📞 Contact

For questions about this assessment project, please refer to the AI_Report.md file for additional details.
