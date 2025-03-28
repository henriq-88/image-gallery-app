# 📸 Image Gallery App

Based on the [T3 Stack](https://create.t3.gg/), built a simple image gallery built with Next.js, SQLite, Drizzle, and tRPC. Users can upload images, and two additional thumbnails (256px and 512px) are generated automatically.

## 🚀 Tech Stack

- [Next.js](https://nextjs.org) - React framework for server-side rendering and that simplifies routing, endpoint generation.
- [SQLite](https://www.sqlite.org/) - Lightweight relational database.
- [Drizzle](https://orm.drizzle.team) - Type-safe database queries.
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework.
- [tRPC](https://trpc.io) - Type-safe API communication.
- [sharp](https://sharp.pixelplumbing.com/) - Image processing for generating thumbnails.
- [Headless UI](https://headlessui.com/) - Accessible UI components.

## 📂 Features

- Upload images and store metadata in SQLite.
- Generate two thumbnails (256px and 512px) using sharp.
- View images in a responsive gallery.
- API powered by tRPC for type safety.

## 🛠️ Setup

1. Install dependencies:

```sh
npm install
```

2. Setup ENV variables

```sh
cp .env.example .env
```

3. Set up the database:

```sh
npm run db:generate

npm run db:push
```

4. Run the development server:

```sh
npm run dev
```

## 📡 API Routes

- **image.getAll** - Retrieves all images with thumbnails.
- **image.upload** - Uploads an image, generates thumbnails, and stores metadata.
- **image.deleteById** - Delete a specifc image by ID, and its related thumbnail images.

## 📸 Image Processing

Uploaded images are processed using sharp:

- Original: Stored as uploaded.
- Thumbnails:
  - 256px - Small preview
  - 512px - Medium preview

## 🖼️ UI Components

- Top Bar - Contains app name and the Upload Image button
- Image Gallery - Displays images in a responsive grid.
- Image Picker Popover - Drag and drop an image, or click the button to select to first preview and then upload an image.
- Image Thumbnail - Displays an approriate sized thumbnail image depending on the screen size. Hover over it to delete it.
- Image Viewer Dialog - Displays the original image in a dialog view, together with the two thumbnail images.
