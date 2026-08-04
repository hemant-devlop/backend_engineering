import test from "node:test";
import assert from "node:assert/strict";

import { buildRequestLogContext } from "../src/middlewares/reqLoggerMiddleware.js";

test("buildRequestLogContext includes request metadata", () => {
    const req = {
        id: "req-123",
        method: "GET",
        originalUrl: "/health",
        ip: "127.0.0.1",
        get: (headerName) => (headerName === "User-Agent" ? "test-agent" : undefined),
    };

    const res = {
        statusCode: 200,
    };

    const context = buildRequestLogContext(req, res, "started");

    assert.deepEqual(context, {
        requestId: "req-123",
        method: "GET",
        url: "/health",
        ip: "127.0.0.1",
        userAgent: "test-agent",
        phase: "started",
        statusCode: 200,
    });
});
