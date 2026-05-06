# Code It MERN — Local development

Quick notes to run the app locally for development.

Run the app in development (uses ts-node esmodule loader):

```bash
npm run dev
```

MongoDB
- If you want DB-backed routes, run a local MongoDB instance (e.g. via Homebrew):

```bash
brew services start mongodb-community@6.0
# or with docker
docker run -d -p 27017:27017 --name mongo mongo:6.0
```

Set a valid Mongo URI in `.env` as `MONGODB_URL` (must start with `mongodb://` or `mongodb+srv://`).

If no valid `MONGODB_URL` is present, the server will start but DB-bound routes will be unavailable.
