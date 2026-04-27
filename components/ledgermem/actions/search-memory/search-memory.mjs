import ledgermem from "../../ledgermem.app.mjs";

export default {
  key: "ledgermem-search-memory",
  name: "Search Memory",
  description: "Semantic search across the workspace memory store.",
  version: "0.1.0",
  type: "action",
  props: {
    ledgermem,
    query: { propDefinition: [ledgermem, "query"] },
    limit: { propDefinition: [ledgermem, "limit"] },
    actorId: { propDefinition: [ledgermem, "actorId"] },
  },
  async run({ $ }) {
    const result = await this.ledgermem.searchMemory({
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
