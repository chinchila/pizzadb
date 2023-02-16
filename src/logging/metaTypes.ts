export type LoggingMetadata = {
  request: HttpRequestLog;
};

export type HttpRequestLog = {
  method: string;
  url: string;
  fullClientIp: string;
  bytesReceived: number;
  userAgent: string | undefined;
  referrer: string | undefined;
  origin: string | undefined;
};
