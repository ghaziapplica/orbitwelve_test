# 🌐 Frontend Developer Portfolio

A modern, responsive portfolio website built with Next.js 13+ (App Router). Showcase your projects, experience, and skills with a clean, performant design.

## 🚀 Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── profile.jpg                 # Profile image
│   └── projects/                   # Project screenshots or images
│       └── project1.png

├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── layout.js               # Root layout (Navbar, Footer, etc.)
│   │   ├── page.js                 # Homepage (Hero, Skills, etc.)
│   │   ├── about/
│   │   │   └── page.js             # About Me page
│   │   ├── projects/
│   │   │   └── page.js             # Portfolio projects page
│   │   └── contact/
│   │       └── page.js             # Contact form or details
│   │
│   ├── components/                 # Reusable UI + layout components
│   │   ├── ui/                     # Small reusable elements (buttons, cards, etc.)
│   │   ├── layout/                 # Page layout components (Navbar, Footer)
│   │   └── sections/               # Section components (Hero, Skills, Testimonials)
│   │
│   ├── data/                       # Static content and structured data
│   │   ├── projects.js             # Portfolio projects list
│   │   ├── experiences.js          # Work experience / career timeline
│   │   └── socials.js              # Social links and contact info
│   │
│   ├── hooks/                      # Custom React hooks
│   │   └── useScroll.js            # Scroll listener for animations or navbar effects
│   │
│   ├── lib/                        # Helper utilities and logic
│   │   ├── email.js                # Contact form email logic
│   │   └── analytics.js            # Google or Vercel Analytics setup
│   │
│   ├── styles/                     # Global and theme styles
│   │   ├── globals.css             # Global CSS (imports Tailwind base, etc.)
│   │   └── theme.css               # Theme variables (colors, fonts)
│   │
│   └── theme/                      # Theming and design tokens
│       └── index.js                # Central theme config (colors, typography)
│
├── .env.local                      # Local environment variables (never commit)
├── package.json                    # Dependencies and scripts
├── next.config.js                  # Next.js configuration
└── README.md                       # Project documentation
```

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Run the development server

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_EMAIL_SERVICE_ID=your_email_service_id
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAIL_USER_ID=your_user_id
```

## 🧩 Customization

* Update `src/data/projects.js` to add your portfolio projects.
* Modify `src/data/socials.js` for your social links (GitHub, LinkedIn, etc.).
* Edit `src/theme/index.js` or `theme.css` to match your preferred color palette and typography.
* Replace `/public/profile.jpg` and `/public/projects/` with your own images.

## 🚀 Deployment

Easiest method — deploy via **[Vercel](https://vercel.com/)**:

```bash
npm run build
npm start
```

Then push to GitHub and connect your repo to Vercel for instant deployment.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**  
Frontend Developer | UI/UX Enthusiast  
[Portfolio](https://yourwebsite.com) • [LinkedIn](https://linkedin.com/in/yourname) • [GitHub](https://github.com/yourusername)
