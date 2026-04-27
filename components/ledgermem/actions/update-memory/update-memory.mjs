import ledgermem from "../../ledgermem.app.mjs";

export default {
  key: "ledgermem-update-memory",
  name: "Update Memory",
  description: "Updates the content or metadata of an existing memory.",
  version: "0.1.0",
  type: "action",
  props: {
    ledgermem,
    id: { propDefinition: [ledgermem, "memoryId"] },
    content: { propDefinition: [ledgermem, "content"], optional: true },
    metadata: { propDefinition: [ledgermem, "metadata"] },
  },
  async run({ $ }) {
    const result = await this.ledgermem.updateMemory({
      $,
      id: this.id,
      content: this.content,
      metadata: this.metadata,
    });
    $.export("$summary", `Updated memory ${this.id}`);
    return result;
  },
};
