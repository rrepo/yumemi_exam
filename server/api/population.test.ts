import { describe, it, expect, vi } from "vitest";
import handler from "~/server/api/population";
import { createEvent } from "h3";

vi.mock("~/server/utils/api", () => ({
  fetchFromApi: vi.fn(async () => ({ result: "mocked data" })),
}));

describe("population API handler", () => {
  it("returns population data when prefCode is provided", async () => {
    const event = createEvent({
      req: { url: "/api/population?prefCode=1", method: "GET" },
    });
    event.node = { req: { url: "/api/population?prefCode=1" } };

    const result = await handler(event);

    expect(result).toEqual({ result: "mocked data" });
  });

  it("throws error when prefCode is missing", async () => {
    const event = createEvent({
      req: { url: "/api/population", method: "GET" },
    });
    event.node = { req: { url: "/api/population" } };

    await expect(handler(event)).rejects.toThrow(
      "Missing 'prefCode' query parameter"
    );
  });
});
