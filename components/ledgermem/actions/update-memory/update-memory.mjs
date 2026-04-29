import getmnemo from "../../getmnemo.app.mjs";

export default {
  key: "getmnemo-update-memory",
  name: "Update Memory",
  description: "Updates the content or metadata of an existing memory.",
  version: "0.1.0",
  type: "action",
  props: {
    getmnemo,
    id: { propDefinition: [getmnemo, "memoryId"] },
    content: { propDefinition: [getmnemo, "content"], optional: true },
    metadata: { propDefinition: [getmnemo, "metadata"] },
  },
  async run({ $ }) {
    const result = await this.getmnemo.updateMemory({
      $,
      id: this.id,
      content: this.content,
      metadata: this.metadata,
    });
    $.export("$summary", `Updated memory ${this.id}`);
    return result;
  },
};
