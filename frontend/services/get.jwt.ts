import { cookies } from 'next/headers';

export async function getJWT() {
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value
  return jwt
}
