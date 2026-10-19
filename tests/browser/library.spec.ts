import { test, expect } from "@playwright/test";
import { subjects } from "../../src/content";

test("renders every subject without invalid icon components", async ({ page }) => {
  const errors: Error[] = [];
  page.on("pageerror", (error) => errors.push(error));
  await page.goto("/");

  const cards = page.locator(".subject-card");
  await expect(cards).toHaveCount(subjects.length);
  for (const subject of subjects) {
    await expect(cards.filter({ hasText: subject.title })).toBeVisible();
  }
  expect(errors).toEqual([]);
});
