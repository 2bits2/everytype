# Everytype Collaborative Editor

This project contains a simple collaborative Markdown editor using [Tiptap](https://tiptap.dev/) and [Yjs](https://yjs.dev/). The editor supports inserting form fields via a slash command and stores submitted data in an SQLite database.

## Quick start

```bash
# Build and start both services
docker-compose up --build
```

* The editor is available at `http://localhost:3000`.
* The collaborative websocket server runs on port `1234` and persists form submissions to `server/data.db`.

