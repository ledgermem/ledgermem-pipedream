import getmnemo from "../../getmnemo.app.mjs";

export default {
  key: "getmnemo-search-memory",
  name: "Search Memory",
  description: "Semantic search across the workspace memory store.",
  version: "0.1.0",
  type: "action",
  props: {
    getmnemo,
    query: { propDefinition: [getmnemo, "query"] },
    limit: { propDefinition: [getmnemo, "limit"] },
    actorId: { propDefinition: [getmnemo, "actorId"] },
  },
  async run({ $ }) {
    const result = await this.getmnemo.searchMemory({
      $,
      query: this.query,
      limit: this.limit,
      actorId: this.actorId,
    });
    const hits = result.hits ?? [];
    $.export("$summary", `Found ${hits.length} memories`);
    return result;
  },
};
