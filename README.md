# Digital Wardrobe

Digital Wardrobe is a full-stack mobile application designed to help users digitize, organize, and manage their personal clothing collections. Users can scan items, categorize them, track their value, and manage their fashion profile.

## Features

- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **Dashboard**: A personalized home screen showing wardrobe statistics (item count, total value) and recently added items.
- **Wardrobe Inventory**: A grid-based view of all clothing items with real-time filtering by categories.
- **Smart Scanning**: Add new items by taking or selecting photos, with support for names, brands, prices, and custom tags.
- **Detailed Item Management**: View, edit, or delete specific items, including price/currency and attribute updates.
- **Profile & Settings**: Manage user details including Full Name, Bio, Date of Birth, and Phone Number.
- **Modern UI**: Features a Floating Action Button (FAB) for quick scanning and a clean, responsive layout.

## Screenshots from the app

<p align="center">
  <img src="./screenshots/home.png" width="30%" />
  &nbsp; &nbsp; &nbsp; &nbsp;
  <img src="./screenshots/wardrobe.png" width="30%" />
</p>

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Security & JWT** (Authentication)
- **PostgreSQL** (Database)
- **Hibernate/JPA** (ORM)
- **Lombok** (Boilerplate reduction)

### Frontend (Mobile)
- **React Native** with **Expo**
- **TypeScript**
- **Expo Router** (File-based navigation)
- **AsyncStorage & SecureStore** (Local data persistence)
- **Vector Icons** (Ionicons, MaterialIcons)

## Project Structure

```text
digital-wardrobe/
├── backend/            # Spring Boot Application
│   ├── src/main/java/  # Java Source Code
│   └── pom.xml         # Maven Dependencies
└── mobile/             # React Native / Expo Application
    ├── app/            # Expo Router Pages
    ├── src/            # Components, Screens, Styles, and Utils
    └── package.json    # Node Dependencies