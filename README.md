# Everytype Collaborative Editor

This project contains a simple collaborative Markdown editor using [Milkdown](https://milkdown.dev/) and [Yjs](https://yjs.dev/). The editor is implemented with React and TypeScript and stores submitted documents in an SQLite database.

## Quick start

```bash
# Build and start both services
docker-compose up --build
```

* The editor is available at `http://localhost:3000`.
* The collaborative websocket server runs on port `1234` and stores documents in `server/data.db`.

