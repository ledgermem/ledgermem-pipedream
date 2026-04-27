import ledgermem from "../../ledgermem.app.mjs";

export default {
  key: "ledgermem-add-memory",
  name: "Add Memory",
  description: "Stores a new memory in LedgerMem. [See docs](https://docs.proofly.dev/api#add-memory)",
  version: "0.1.0",
  type: "action",
  props: {
    ledgermem,
    content: { propDefinition: [ledgermem, "content"] },
    metadata: { propDefinition: [ledgermem, "metadata"] },
    actorId: { propDefinition: [ledgermem, "actorId"] },
  },
  async run({ $ }) {
    const result = await this.ledgermem.addMemory({
      $,
      content: this.content,
      metadata: this.metadata,
      actorId: this.actorId,
    });
    $.export("$summary", `Stored memory ${result.id}`);
    return result;
  },
};
