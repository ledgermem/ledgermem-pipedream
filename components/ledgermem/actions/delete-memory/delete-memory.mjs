import getmnemo from "../../getmnemo.app.mjs";

export default {
  key: "getmnemo-delete-memory",
  name: "Delete Memory",
  description: "Permanently deletes a memory by ID.",
  version: "0.1.0",
  type: "action",
  props: {
    getmnemo,
    id: { propDefinition: [getmnemo, "memoryId"] },
  },
  async run({ $ }) {
    await this.getmnemo.deleteMemory({ $, id: this.id });
    $.export("$summary", `Deleted memory ${this.id}`);
    return { id: this.id, deleted: true };
  },
};
