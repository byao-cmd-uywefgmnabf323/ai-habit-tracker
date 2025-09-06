# AI Habit Tracker - Bubbly Edition

Welcome to your newly redesigned AI Habit Tracker! This project features a fun, bubbly, and engaging UI, built with Next.js, Tailwind CSS, and Framer Motion.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing Your Bubbly Theme

This project is built with a highly customizable design system. Here's how you can tweak the look and feel:

### 🎨 Colors

The color palette is defined using CSS variables in `src/app/globals.css` and referenced in `tailwind.config.ts`.

1.  **Edit CSS Variables**: Open `src/app/globals.css` and modify the HSL values in the `:root` block to change the core colors of the theme.

    ```css
    /* Example from src/app/globals.css */
    :root {
      --background: 240 10% 99%;
      --foreground: 240 10% 3.9%;
      --primary: 346.8 77.2% 49.8%;
      /* ... more colors */
    }
    ```

2.  **Tailwind Configuration**: The `tailwind.config.ts` file uses these variables. No changes are needed here unless you want to add new color names.

### ✒️ Typography

The project uses [Poppins](https://fonts.google.com/specimen/Poppins) for headings and [Inter](https://fonts.google.com/specimen/Inter) for body text.

1.  **Change Fonts**: Open `src/app/layout.tsx` and import your desired fonts from `next/font/google`.
2.  **Update CSS Variables**: Assign your new fonts to the `--font-inter` and `--font-poppins` CSS variables in the same file.

    ```tsx
    // Example from src/app/layout.tsx
    const fontSans = Inter({ subsets: ["latin"], variable: "--font-inter" });
    const fontHeading = Poppins({ 
      subsets: ["latin"], 
      weight: ["400", "700", "800"], 
      variable: "--font-poppins" 
    });
    ```

### 🫧 Border Radius (Bubbliness)

The bubbly effect is controlled by the `borderRadius` values in `tailwind.config.ts`.

1.  **Adjust Radius**: Open `tailwind.config.ts` and modify the `borderRadius` values. We've added custom large radii like `4xl`, `5xl`, and `6xl`.

    ```javascript
    // Example from tailwind.config.ts
    borderRadius: {
      '4xl': '2rem',
      '5xl': '2.5rem',
      '6xl': '3rem',
      lg: "var(--radius)", // this is 2rem by default now
    },
    ```

2.  **Component-Level**: You can also change the border radius on individual components by modifying their `className` (e.g., changing `rounded-4xl` to `rounded-lg`).

### ✨ Animations

We use [Framer Motion](https://www.framer.com/motion/) for animations. Reusable animation variants are defined in `src/lib/animations.ts`.

1.  **Modify Variants**: Open `src/lib/animations.ts` to tweak the properties of existing animations like `fadeInUp` or `staggerContainer`.
2.  **Apply Animations**: To use an animation, import it and apply it to a `motion` component in your JSX.

    ```tsx
    import { motion } from 'framer-motion';
    import { staggerContainer, fadeInUp } from '@/lib/animations';

    <motion.div variants={staggerContainer} initial="hidden" animate="show">
      <motion.h1 variants={fadeInUp}>Hello, Bubbly World!</motion.h1>
    </motion.div>
    ```

