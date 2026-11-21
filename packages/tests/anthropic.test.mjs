import assert from "node:assert/strict";
import test from "node:test";

test("Anthropic API accepts the configured key", async () => {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  assert.ok(apiKey, "ANTHROPIC_API_KEY is missing. Add it to your local .env.");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2026-10-21",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 16,
      messages: [{ role: "user", content: "Reply with OK." }],
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (response.status === 401) {
    assert.fail("Anthropic rejected ANTHROPIC_API_KEY. Check your local key.");
  }
  if (response.status === 403) {
    assert.fail("Anthropic denied access. Check the key's permissions.");
  }

  assert.ok(response.ok, `Anthropic returned HTTP ${response.status}.`);
  const message = await response.json();
  assert.ok(message.content?.length, "Anthropic returned no message content.");
});