import Elysia, { type Static, t } from "elysia";
import { app } from "..";
import { setupPlugin } from "../plugins/setup";

const WebSocketResponseSchema = t.Object({
  status: t.Union([t.Literal("complete"), t.Literal("loading")]),
  songId: t.String(),
  title: t.String(),
  artist: t.String(),
});

type WebSocketResponseSchemaType = Static<typeof WebSocketResponseSchema>;

const WS_TOPIC = "ultrastar";
export const wsRouter = new Elysia({
  prefix: "/ws",
  name: "WebSocket",
  tags: ["WebSocket"],
})
  .use(setupPlugin)
  .ws("/", {
    response: WebSocketResponseSchema,
    open(ws) {
      ws.subscribe(WS_TOPIC);
    },
    close(ws) {
      ws.unsubscribe(WS_TOPIC);
    },
  });

export const publishMessage = (data: WebSocketResponseSchemaType) => {
  const message: WebSocketResponseSchemaType = {
    ...data,
  };

  app.server?.publish(WS_TOPIC, JSON.stringify(message));
};
