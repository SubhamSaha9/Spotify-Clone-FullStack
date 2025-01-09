<h2 align="center">Sporify Clone - A music streaming platform</h2>

1. ⚙️ [Tech Stack](#tech-stack)
2. 🤸 [Quick Start](#quick-start)
3. 🕸️ [Config Files](#config-files)
4. 🚀 [More](#more)

## <a name="tech-stack">⚙️ Tech Stack</a>

- React 18
- Redux
- Node
- Exprss
- MongoDB
- TailwindCSS
- Cloudinary

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Cloning the Repository**

```bash
git clone https://github.com/SubhamSaha9/Spotify-Clone-FullStack.git
cd Spotify-Clone-FullStack
```

**Installation**

Install the project dependencies for both client and server directory separately using npm:

```bash
npm install
#or
npm i
```

**Set Up Environment Variables**

Create a new file named `.env` in the client of your project as well as in the server directory and add the following content:

- client

```env
REACT_APP_BASE_URL = "http://localhost:8080/api/v1"
```

- server

```env
MONGO_URL=""
CLOUD_NAME=""
CLOUD_API_KEY=
CLOUD_API_SECRET=""
FOLDER_NAME=""
```

Replace the values with your actual credentials from [MongoDB](https://www.mongodb.com), [Cloudinary](https://cloudinary.com) and others.

**Running the Project**

- server

```bash
node index.js
```

- client

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to visit the page.

## <a name="config-files">🕸️ Config File</a>

<details>
<summary><code>index.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

::-webkit-scrollbar {
  display: none;
}

.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #238c41 94%, #0000) top/9px 9px no-repeat,
    conic-gradient(#0000 30%, #238c41);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
```

</details>

<b><i>Make sure all file names remain same.</i></b>

## <a name="more">🚀 More</a>

For more such projects visit my [Github](https://github.com/SubhamSaha9) page.
