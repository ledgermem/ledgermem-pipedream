import { axios } from "@pipedream/platform";

export default {
  type: "app",
  app: "getmnemo",
  propDefinitions: {
    memoryId: {
      type: "string",
      label: "Memory ID",
      description: "The Mnemo memory ID (e.g. mem_01HXYZ).",
    },
    content: {
      type: "string",
      label: "Content",
      description: "The text content of the memory.",
    },
    query: {
      type: "string",
      label: "Query",
      description: "Search query for semantic retrieval.",
    },
    limit: {
      type: "integer",
      label: "Limit",
      default: 10,
      optional: true,
    },
    actorId: {
      type: "string",
      label: "Actor ID",
      optional: true,
    },
    metadata: {
      type: "object",
      label: "Metadata",
      optional: true,
    },
  },
  methods: {
    _baseUrl() {
      return "https://api.getmnemo.xyz/v1";
    },
    _headers() {
      return {
        "Authorization": `Bearer ${this.$auth.api_key}`,
        "x-workspace-id": this.$auth.workspace_id,
        "Content-Type": "application/json",
        "User-Agent": "getmnemo-pipedream/0.1.0",
      };
    },
    async _makeRequest({ $, path, method = "GET", data, params }) {
      return axios($ ?? this, {
        method,
        url: `${this._baseUrl()}${path}`,
        headers: this._headers(),
        data,
        params,
      });
    },
    addMemory({ content, metadata, actorId, $ }) {
      return this._makeRequest({ $, path: "/memories", method: "POST", data: { content, metadata, actorId } });
    },
    searchMemory({ query, limit, actorId, $ }) {
      return this._makeRequest({ $, path: "/search", method: "POST", data: { query, limit, actorId } });
    },
    updateMemory({ id, content, metadata, $ }) {
      return this._makeRequest({ $, path: `/memories/${encodeURIComponent(id)}`, method: "PATCH", data: { content, metadata } });
    },
    deleteMemory({ id, $ }) {
      return this._makeRequest({ $, path: `/memories/${encodeURIComponent(id)}`, method: "DELETE" });
    },
    listMemories({ limit, cursor, $ }) {
      return this._makeRequest({ $, path: "/memories", method: "GET", params: { limit, cursor } });
    },
  },
};
