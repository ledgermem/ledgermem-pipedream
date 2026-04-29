import getmnemo from "../../getmnemo.app.mjs";

export default {
  key: "getmnemo-new-memory",
  name: "New Memory",
  description: "Emits an event when a new memory is added to the workspace.",
  version: "0.1.0",
  type: "source",
  dedupe: "unique",
  props: {
    getmnemo,
    db: "$.service.db",
    timer: {
      type: "$.interface.timer",
      default: { intervalSeconds: 60 * 5 },
    },
    limit: { propDefinition: [getmnemo, "limit"], default: 25 },
  },
  hooks: {
    async deploy() {
      const { items = [] } = await this.getmnemo.listMemories({ limit: 5 });
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
    const { items = [] } = await this.getmnemo.listMemories({ limit: this.limit });
    const fresh = items.filter((m) => !lastSeen || m.createdAt > lastSeen);
    if (fresh.length === 0) return;

    // Compute max BEFORE we sort/emit so cursor advancement is independent of
    // the order the API returns items in.
    const maxCreatedAt = fresh.reduce(
      (acc, m) => (m.createdAt > acc ? m.createdAt : acc),
      fresh[0].createdAt,
    );

    // Emit oldest-first so downstream consumers see chronological order.
    const ordered = [...fresh].sort((a, b) =>
      a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0,
    );
    for (const item of ordered) {
      this.$emit(item, {
        id: item.id,
        summary: `Memory ${item.id}`,
        ts: Date.parse(item.createdAt) || Date.now(),
      });
    }
    await this.db.set("lastSeen", maxCreatedAt);
  },
};
