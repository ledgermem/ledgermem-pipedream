import getmnemo from "../../getmnemo.app.mjs";

export default {
  key: "getmnemo-add-memory",
  name: "Add Memory",
  description: "Stores a new memory in Mnemo. [See docs](https://docs.getmnemo.xyz/api#add-memory)",
  version: "0.1.0",
  type: "action",
  props: {
    getmnemo,
    content: { propDefinition: [getmnemo, "content"] },
    metadata: { propDefinition: [getmnemo, "metadata"] },
    actorId: { propDefinition: [getmnemo, "actorId"] },
  },
  async run({ $ }) {
    const result = await this.getmnemo.addMemory({
      $,
      content: this.content,
      metadata: this.metadata,
      actorId: this.actorId,
    });
    $.export("$summary", `Stored memory ${result.id}`);
    return result;
  },
};
