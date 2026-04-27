import ledgermem from "../../ledgermem.app.mjs";

export default {
  key: "ledgermem-new-memory",
  name: "New Memory",
  description: "Emits an event when a new memory is added to the workspace.",
  version: "0.1.0",
  type: "source",
  dedupe: "unique",
  props: {
    ledgermem,
    db: "$.service.db",
    timer: {
      type: "$.interface.timer",
      default: { intervalSeconds: 60 * 5 },
    },
    limit: { propDefinition: [ledgermem, "limit"], default: 25 },
  },
  hooks: {
    async deploy() {
      const { items = [] } = await this.ledgermem.listMemories({ limit: 5 });
      for (const item of items.slice(0, 5)) {
        this.$emit(item, {
          id: item.id,
          summary: `Memory ${item.id}`,
          ts: Date.parse(item.createdAt) || Date.now(),
        });
      }
    },
  },
  async run() {
    const lastSeen = (await this.db.get("lastSeen")) ?? "";
    const { items = [] } = await this.ledgermem.listMemories({ limit: this.limit });
    const fresh = items.filter((m) => !lastSeen || m.createdAt > lastSeen);
    if (fresh.length === 0) return;

    for (const item of fresh.reverse()) {
      this.$emit(item, {
        id: item.id,
        summary: `Memory ${item.id}`,
        ts: Date.parse(item.createdAt) || Date.now(),
      });
    }
    await this.db.set("lastSeen", fresh[fresh.length - 1].createdAt);
  },
};
