# LedgerMem for Pipedream

Pipedream components for [LedgerMem](https://proofly.dev) — long-term memory for AI agents and automation workflows.

## Repo layout

```
components/ledgermem/
  ledgermem.app.mjs                  Shared app definition + _makeRequest
  actions/
    add-memory/add-memory.mjs        POST /v1/memories
    search-memory/search-memory.mjs  POST /v1/search
    update-memory/update-memory.mjs  PATCH /v1/memories/:id
    delete-memory/delete-memory.mjs  DELETE /v1/memories/:id
  sources/
    new-memory/new-memory.mjs        Polling source — emits new memories
```

## Install (development)

Pipedream loads components directly from a forked clone of [`PipedreamHQ/pipedream`](https://github.com/PipedreamHQ/pipedream).

```bash
git clone git@github.com:PipedreamHQ/pipedream.git
cp -R components/ledgermem pipedream/components/ledgermem
cd pipedream/components/ledgermem
pd dev               # Live-reloads against your Pipedream account
```

Once your component works locally, open a PR to `PipedreamHQ/pipedream` adding `components/ledgermem` — that publishes it to all Pipedream users.

## Auth

`ledgermem.app.mjs` uses Pipedream's standard custom-auth model with two fields the user enters when connecting the account:

| Auth key       | HTTP header                  |
| -------------- | ---------------------------- |
| `api_key`      | `Authorization: Bearer <key>`|
| `workspace_id` | `x-workspace-id`             |

## Actions

| Action            | Method              | Description           |
| ----------------- | ------------------- | --------------------- |
| `add-memory`      | POST `/v1/memories` | Store a memory.       |
| `search-memory`   | POST `/v1/search`   | Semantic search.      |
| `update-memory`   | PATCH `/v1/memories/:id` | Update content / metadata. |
| `delete-memory`   | DELETE `/v1/memories/:id` | Remove a memory.   |

## Sources

| Source       | Type      | Description                                    |
| ------------ | --------- | ---------------------------------------------- |
| `new-memory` | Polling   | Emits one event per new memory (5-min poll).   |

## Submission to PipedreamHQ/pipedream

1. Fork https://github.com/PipedreamHQ/pipedream.
2. Copy `components/ledgermem` into `components/`.
3. Open a PR following [Component Submission Guidelines](https://pipedream.com/docs/components/guidelines).

## License

MIT — see `LICENSE`.
