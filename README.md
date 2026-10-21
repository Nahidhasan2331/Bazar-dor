# বাজার দর | BazarDor

**BazarDor (বাজার দর)** is a responsive Bengali-language grocery price comparison web application that helps people in Bangladesh explore daily essential product prices, follow price increases and decreases, and compare prices across markets.

The application presents grocery price information in an accessible interface with category browsing, product details, and secure user accounts.

## Key Features

1. **Daily grocery price overview** — Explore essential products with their current listed prices, units, and price-change indicators.
2. **Price increase and decrease sections** — Quickly identify products with rising or falling prices.
3. **Market-wise price comparison** — View product details, including minimum, maximum, and average prices and prices across different markets.
4. **Category browsing and sorting** — Browse grocery categories and sort products by price, from low to high or high to low.
5. **User authentication** — Sign up and sign in with email and password, Google, or GitHub using Better Auth.
6. **Protected pages and profile updates** — Access product details and profile pages after signing in; update your name on a separate profile-editing page.
7. **Responsive Bengali interface** — Use the application on mobile, tablet, and desktop, with Bengali navigation, loading skeletons, and a custom 404 page.

## Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 16 (App Router) | Application framework and routing |
| React 19 | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS 4 | Responsive styling |
| DaisyUI 5 | UI styling and components |
| Better Auth | Authentication and session management |
| MongoDB Atlas | Authentication database |
| Lucide React / React Icons | Interface icons |
| React Hot Toast | Notifications |
| REST API | Grocery product and market-price data |

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas database
- OAuth credentials if using Google or GitHub sign-in

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nahidhasan2331/bazar-dor.git
   cd bazar-dor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=bazardor
   BETTER_AUTH_SECRET=your_secure_secret
   BETTER_AUTH_URL=http://localhost:3100
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

   Replace the placeholders with your own credentials. **Never commit `.env.local` or other secrets to GitHub.** Configure the matching OAuth callback URLs in the Google and GitHub provider settings.

4. Start the development server:

   ```bash
   npm run dev -- -p 3100
   ```

5. Open [http://localhost:3100](http://localhost:3100).

### Production Build

```bash
npm run build
npm run start -- -p 3100
```

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Homepage with grocery price overview |
| `/category/[slug]` | Category-specific products and sorting |
| `/product/[slug]` | Protected product details and market comparison |
| `/sign-in` | User sign-in |
| `/sign-up` | User registration |
| `/profile` | Protected user profile |
| `/profile/edit` | Update account name |

## Deployment Notes

For production deployment, configure the environment variables in your hosting platform, update `BETTER_AUTH_URL` to your deployed site URL, and register the production OAuth callback URLs with Google and GitHub. Test authentication, protected routes, product API data, and direct-page refreshes after deployment.

## Disclaimer

Displayed prices are indicative and may change depending on market conditions.
