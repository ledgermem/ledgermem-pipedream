import ledgermem from "../../ledgermem.app.mjs";

export default {
  key: "ledgermem-delete-memory",
  name: "Delete Memory",
  description: "Permanently deletes a memory by ID.",
  version: "0.1.0",
  type: "action",
  props: {
    ledgermem,
    id: { propDefinition: [ledgermem, "memoryId"] },
  },
  async run({ $ }) {
    await this.ledgermem.deleteMemory({ $, id: this.id });
    $.export("$summary", `Deleted memory ${this.id}`);
    return { id: this.id, deleted: true };
  },
};
