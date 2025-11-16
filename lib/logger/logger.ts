import pino from "pino";

export const logger = pino({
  level: "info",

  base: {
    service: "my-blog",
    env: "prod",
  },

  formatters: {
    level(label) {
      return { level: label };
    },
  },

  timestamp: pino.stdTimeFunctions.isoTime,
});

export type Logger = typeof logger;
