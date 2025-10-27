import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { singInMock } from './SingInMock'


export const worker = setupWorker(
  singInMock
)

export async function enableMSW() {
  if(env.MODE !== 'test'){
    return
  }
  await worker.start()
} 