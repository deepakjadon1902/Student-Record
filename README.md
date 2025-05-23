# Student-Record 🎓

**Student-Record** is a sleek, responsive web app that allows users to manage student records with ease. From adding new students and editing details to uploading profile pictures and deleting records — this dashboard has all the essentials wrapped in a modern UI.

---

## ✨ Features

- **Add New Student**: Input personal details like name, email, course, and profile picture.
- **Edit Details**: Update any student’s info in just a few clicks.
- **Upload Image**: Upload and display a student's profile photo.
- **Delete Student**: Remove a record permanently with confirmation.
- **Responsive Layout**: Works seamlessly across desktop and mobile.
- **Dynamic Table View**: View, search, and sort student data in real-time.
- **State Management**: Efficient use of React state and hooks for smooth interaction.

---

## 🛠 Tech Stack

- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **Form Handling**: React Hooks
- **Image Handling**: Browser File Uploads (can integrate cloud storage or Supabase later)
- **Local State Storage** (can be extended to Supabase/Backend API)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/deepakjadon1902/Student-Record.git
cd Student-Record
### 2️⃣ Install Dependencies
bash
Copy
Edit
npm install
### 3️⃣ Run the App
bash
Copy
Edit
npm run dev
Navigate to http://localhost:5173 to access the dashboard.

### 📖 Usage Guide
➕ Add a Student
Click the Add Student button.

Fill in details like name, course, email, and upload a profile picture.

Click Save to add the student to the list.

✏️ Update Student Details
Click the Edit icon beside a student record.

Modify the fields and save the changes.

🖼️ Upload Profile Image
While adding or editing a student, select an image file.

Preview will be shown after upload.

🗑️ Delete a Student
Click the Delete icon next to the student entry.

Confirm deletion in the popup.

🎨 Styling
Built with Tailwind CSS for utility-first styling.

Mobile-friendly design using responsive grids.

Transitions and hover effects for modern interaction.

### 📂 Project Structure
graphql
Copy
Edit
src/
│
├── components/       # Reusable components like Form, Card, Table
├── pages/            # Main dashboard view
├── assets/           # Uploaded images or icons
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── types/            # TypeScript types and interfaces
### 🤝 Contributing
Fork the repository 🍴

Create a new branch 🛠

Add your feature or fix ✨

Open a pull request 🚀

Contributions are welcome! Let’s build this dashboard even better together.

📌 Future Improvements (optional ideas)
Add user authentication with Supabase or Firebase

Cloud-based image storage (Supabase/Cloudinary)

Export student data as PDF or CSV

Search and filter options

Dark mode toggle 🌙

🎓 StudentDashboard – Built to manage, built to scale.
🧠 Crafted with care by DJ  💥
