import { test, expect } from '@playwright/test';

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', {waitUntil: 'networkidle'});

  await page.getByRole('textbox', { name: 'Nome do estabelecimento' }).fill('Pizza Shoop')
  await page.getByRole('textbox', { name: 'Seu Nome' }).fill('John Doe')
  await page.locator('#email').fill('johndoe@example.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('81234353423')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso')

  await expect(toast).toBeVisible()
});

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', {waitUntil: 'networkidle'});

  await page.getByRole('textbox', { name: 'Nome do estabelecimento' }).fill('Invalid Name')
  await page.getByRole('textbox', { name: 'Seu Nome' }).fill('Viktor')
  await page.locator('#email').fill('Viktor@example.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('81234353433')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar Restaurante.')

  await expect(toast).toBeVisible()
});

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-up', {waitUntil: 'networkidle'});
  await page.getByRole('link', { name: 'Fazer login' }).click()

  await expect(page.url()).toContain('/sign-in')
 
});
