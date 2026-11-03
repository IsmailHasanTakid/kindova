# 🌱 Kindova – Community Event Management Platform

<p align="center">
  <strong>Connect. Contribute. Care.</strong>
  <br />
  A community-driven platform to organize events, connect volunteers, and make a positive impact.
</p>

---

## 📖 About The Project

**Kindova** is a community-driven event management platform designed to bring people together through meaningful social activities.

It allows users to discover community events, create their own initiatives, join events, and manage their participation.

From winter clothes distribution to helping underprivileged people, Kindova makes community service easier and more organized.

The primary goal is to encourage people to participate in social activities and create a positive impact on society.

## ✨ Features

### 🔐 Authentication
- User registration and login.
- Authentication using Better Auth.
- GitHub login integration (if enabled in the deployed version).
- User session management.
- Protected pages and authenticated actions.

### 📅 Event Management
- Create community service events.
- Browse all available events.
- View detailed event information.
- Update events created by the logged-in user.
- Delete owned events.
- Display recent and previous events.

### 🔍 Event Discovery
- Browse upcoming and previous events.
- Search events by title.
- Filter events by category.
- Filter events by event status.
- View event details and organizer information.

### 🤝 Event Participation
- Join community events.
- Leave previously joined events.
- Prevent users from joining their own events.
- Prevent duplicate event participation.
- View joined events.

### 👤 Personal Dashboard
- View events created by the user.
- Manage personal events.
- View joined events.
- Track community participation.

### 🎨 User Experience
- Clean and modern user interface.
- Responsive layouts.
- Reusable components.
- Loading skeletons.
- Toast notifications.
- User-friendly navigation.
- Form validation and error feedback.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React.js | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Better Auth | Authentication |
| Lucide React | Icons |
| React Hot Toast | Notifications |

## 🔗 Backend Integration

Kindova uses a separate Express.js backend to handle event-related operations.

The frontend communicates with the backend through REST APIs using HTTP requests.

**Backend Repository:** [Kindova Server](https://github.com/IsmailHasanTakid/kindova-server)

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/IsmailHasanTakid/kindova
```

### 2. Navigate to the Project

```bash
cd kindova
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Configure the required Better Auth environment variables and OAuth credentials according to your authentication setup.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Make sure the Kindova backend server is running before using event-related functionality.

## 🎯 Project Goal

Kindova aims to make community service more accessible by connecting people with meaningful local activities.

It encourages individuals to work together, support one another, and contribute to a better society.

## 👨‍💻 Developer

**Ismail Hasan Takid**

- GitHub: [@IsmailHasanTakid](https://github.com/IsmailHasanTakid)

---

<p align="center">
  Made with ❤️ for a better community.
  <br />
  <strong>Kindova – Connect. Contribute. Care.</strong>
</p>