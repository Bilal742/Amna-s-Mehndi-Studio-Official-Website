# 🌸 Amna's Mehndi Studio – Official Website

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?logo=react&style=for-the-badge) 
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwind-css&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Welcome to **Amna's Mehndi Studio** – a professional mehndi (henna) services website built with **Next.js**, offering a modern UI, smooth animations, and an elegant user experience.
 
---

## 🌐 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://hood-anixx.vercel.app/)

---

| Feature | Description |
|---------|-------------|
| 🎨 **Beautiful Mehndi Gallery** | Categories include Bridal, Arabic, Simple, Foot Mehndi, and more for easy browsing. |
| 📱 **Fully Responsive Design** | Works perfectly on mobile, tablet, and desktop screens. |
| 🌙 **Light & Dark Theme Support** | Users can switch between light and dark modes seamlessly. |
| 📩 **Contact Form** | Includes validation and smooth toast notifications for better UX. |
| ⭐ **Reviews Section** | Display customer reviews with a “View All” option. |
| 🖼️ **Image Hover Zoom & Modal Slider** | Hover effects and full-screen image slider for better gallery experience. |
| ⚡ **Optimized Next.js 15 App Router** | Fast, SEO-friendly, and fully optimized for performance. |

---

## 📁 Project Structure

```
my-next-app/
├─ .next/
├─ app/
│ ├─ about/
│ │ └─ page.tsx
│ ├─ api/
│ │ ├─ booking/
│ │ │ └─ route.ts
│ │ ├─ contact/
│ │ │ └─ route.ts
│ │ ├─ count/
│ │ │ └─ route.ts
│ │ └─ reviews/
│ │ └─ route.ts
│ ├─ auth/
│ │ └─ page.tsx
│ ├─ booking/
│ │ └─ page.tsx
│ ├─ components/
│ │ ├─ About/
│ │ │ └─ about.tsx
│ │ ├─ Contact/
│ │ │ └─ Contact.tsx
│ │ ├─ Footer/
│ │ │ └─ footer.tsx
│ │ ├─ Gallery/
│ │ │ └─ gallery.tsx
│ │ ├─ Hero/
│ │ │ └─ Hero.tsx
│ │ ├─ Navbar/
│ │ │ └─ Navbar.tsx
│ │ ├─ Reviews/
│ │ │ └─ ReviewSection.tsx
│ │ ├─ Services/
│ │ │ └─ Services.tsx
│ │ ├─ Testimonials/
│ │ │ ├─ Testimonial.tsx
│ │ │ ├─ themeColors.js
│ │ │ └─ themeTypes.ts
│ │ └─ contact/
│ │ └─ context/
│ │ └─ ThemeContext.tsx
│ ├─ firebase/
│ │ ├─ gallery/
│ │ │ └─ page.tsx
│ │ ├─ services/
│ │ │ └─ page.tsx
│ │ └─ testimonials/
│ │ └─ page.tsx
│ ├─ twi.css
│ ├─ globals.css
│ ├─ layout.tsx
│ ├─ page.tsx
│ └─ data/
│ ├─ reviews.json
│ └─ mehandiDaily_data
├─ node_modules/
├─ public/
├─ .env
├─ .gitignore
├─ eslint.config.js
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
└─ tsconfig.json
```

---

## 🚀 Tech Stack

* **Next.js 15** (App Router)
* **React**
* **Tailwind CSS**
* **Lucide Icons**
* **React Hook Form + Zod**
* **Resend Email API** (For contact form)

---

## ⚙️ Setup Instructions

1. **Clone the Repository:**
   
   ```bash
   https://github.com/Bilal742/Amna-s-Mehndi-Studio.git

---
  
3. **Install Dependencies:**
   
   ```bash
   npm install
   or
   yarn
   
---

3. **Run the Development Server:**
   
   ```bash
   npm run dev
   or
   yarn dev

---

4. **Open in Browser:**
   
   ```bash
   Visit http://localhost:3000

--- 

## 🛡️ Environment Variables Setup (Private)

Create a `.env.local` file in the root of your project and add the following **keys only** (values hidden for security):

## Firebase Config

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Google Auth

```
GOOGLE_CLIENT_ID=your_google_client_id
```

## Contact Form (Resend)

```
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_EMAIL=your_contact_email
```

---

## 🎬 Live Sections Overview

## 🏠 Home Page

The Home page is a **comprehensive overview** of the website:

- **Banner Section** – Hero banner highlighting main features.
- **About Section** – Brief introduction about the business.
- **Services Section** – Overview of offered services.
- **Booking Section** – Quick booking form or call-to-action.
- **Featured Gallery Section** – Showcase of top designs.
- **Featured Reviews Section** – Highlighted client testimonials.
- **Contact Section** – Quick contact form.

---

## 📖 About Page

Detailed information about the business:

- About the brand or company.
- Team introduction (optional).
- Mission, vision, and values.

---

## 🛠 Services Page

Comprehensive overview of services offered:

- List of all services with descriptions.
- Pricing or packages (if applicable).
- Call-to-action for booking.

---

## 📅 Booking Page

A dedicated booking page with a full form:

- Name
- Email
- Phone
- Service selection
- Date & time picker
- Additional notes

---

## 🖼️ Gallery Page

Showcase of Mehndi designs:

- Categories (e.g., Bridal, Arabic, Simple, Foot Mehndi)
- Zoom modal on image click
- Full-screen image slider with navigation

---

## 🌟 Reviews Page

All client feedback in one place:

- Ratings (stars or numbers)
- Client testimonials
- Optional filtering by service type

---

## 📞 Contact Page

Get in touch via the contact form:

- Name
- Email
- Phone
- Message
- Optional map for location
- 
---

## 📸 Screenshots (Optional)

> Comming soon

---

## ❤️ Credits

Designed & Developed by **Bilal** for **Amna's Mehndi Studio**.

---

## 📜 License

This project is for personal & portfolio use only. Not allowed for commercial distribution without permission.

---

✨ *Thank you for visiting Amna's Mehndi Studio Website Repository!*
