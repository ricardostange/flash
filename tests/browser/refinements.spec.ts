import { test, expect } from "@playwright/test";

test("theme follows the system, persists explicit choices, and covers dialogs", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Configurações e aparência" }).click();
  await expect(
    page.getByRole("radio", { name: "Sistema", exact: true }),
  ).toBeChecked();
  await page.getByRole("radio", { name: "Claro", exact: true }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Configurações e aparência" }).click();
  await page.getByRole("radio", { name: "Escuro", exact: true }).check();
  await expect(page.getByRole("dialog")).toHaveCSS(
    "background-color",
    "rgb(32, 33, 39)",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Configurações e aparência" }).click();
  await page.getByRole("radio", { name: "Sistema", exact: true }).check();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("training is focused, reachable, keyboard-friendly and saves progress", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Começar revisão" }).click();
  await expect(page.locator(".sidebar")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  const reveal = page.getByRole("button", { name: "Mostrar resposta" });
  await expect(reveal).toBeInViewport();
  await reveal.click();
  await expect(page.locator(".answer h2")).toBeFocused();
  await expect(page.getByRole("button", { name: /^Bom/ })).toBeInViewport();
  if (isMobile) {
    const dock = await page.locator(".study-actions").boundingBox();
    expect(dock!.y + dock!.height).toBeLessThanOrEqual(
      page.viewportSize()!.height + 1,
    );
    await page.getByRole("button", { name: /^Bom/ }).click();
  } else {
    await page.keyboard.press("3");
  }
  await expect(page.locator(".study-heading")).toContainText(
    "1 de 12 concluídos",
  );
  await expect(reveal).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          Object.keys(
            JSON.parse(localStorage.getItem("memoria-progress-v1")!).progress,
          ).length,
      ),
    )
    .toBe(1);
  await page.getByRole("button", { name: "Sair do treino" }).click();
  await expect(
    page.getByRole("heading", { name: "Vamos estudar?" }),
  ).toBeVisible();
});

test("mobile menu traps focus, closes with Escape, and hidden navigation is inert", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile);
  await page.goto("/");
  await expect(page.locator(".sidebar")).toHaveAttribute("inert", "");
  const menu = page.getByRole("button", { name: "Abrir menu" });
  await menu.click();
  await expect(
    page.getByRole("dialog", { name: "Navegação principal" }),
  ).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Como funciona" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Fechar menu", exact: true }).last(),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(page.locator(".sidebar")).toHaveAttribute("inert", "");
});

test("subject selection keeps training scoped and removes redundant subject tiles", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator(".subject-card")
    .filter({ hasText: "Direito Administrativo" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Direito Administrativo",
  );
  await expect(page.locator(".subject-grid")).toHaveCount(0);
  await page.getByRole("button", { name: "Começar revisão" }).click();
  await expect(page.locator(".study-heading")).toContainText(
    "0 de 2 concluídos",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "art. 37",
  );
});

test("small screens do not overflow in either theme or during study", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  const noOverflow = async () => {
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  };
  await noOverflow();
  await page.getByRole("button", { name: "Configurações e aparência" }).click();
  await page.getByRole("radio", { name: "Escuro", exact: true }).check();
  await page.getByRole("button", { name: "Fechar", exact: true }).click();
  await noOverflow();
  await page.getByRole("button", { name: "Começar revisão" }).click();
  await noOverflow();
  await page.getByRole("button", { name: "Mostrar resposta" }).click();
  await noOverflow();
  await page.getByRole("button", { name: /^De novo/ }).click();
  await expect(
    page.getByRole("button", { name: "Mostrar resposta" }),
  ).toBeInViewport();
});
