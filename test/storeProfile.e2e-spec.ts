import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shoop' }).click()
  await page.getByText('Perfil da Loja').click()

  await page.getByLabel('Nome').fill('Rocket Pizza')
  await page.getByLabel('Descrição').fill('Another Description')

  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  await expect(page.getByText('Perfil atualizado com sucesso!')).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  await page.waitForTimeout(250)

  await expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()
})