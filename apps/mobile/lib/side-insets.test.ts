// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";

const split = vi.hoisted(() => ({ inboxShown: false }));
vi.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 12, right: 72 }),
}));
vi.mock("./split-view", () => ({ useSplitView: () => split }));

const { useSideInsets } = await import("./side-insets");

async function sideInsets() {
  let value: ReturnType<typeof useSideInsets> | undefined;
  function Probe() {
    value = useSideInsets();
    return null;
  }
  const root = createRoot(document.createElement("div"));
  await act(async () => root.render(createElement(Probe)));
  await act(async () => root.unmount());
  return value;
}

it("keeps content clear of a side status bar and the far cutout", async () => {
  split.inboxShown = false;
  expect(await sideInsets()).toEqual({ paddingLeft: 12, paddingRight: 72 });
});

it("leaves the left edge to the chat list beside the screen", async () => {
  split.inboxShown = true;
  expect(await sideInsets()).toEqual({ paddingLeft: 0, paddingRight: 72 });
});
