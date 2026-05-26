'use server'

import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

export interface LoginState {
  error?: string
}

/**
 * Server Action for the login form.
 * On success: signIn() calls redirect('/admin') which throws NEXT_REDIRECT — re-thrown here.
 * On failure: returns a LoginState with an error message.
 */
export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Veuillez renseigner votre email et mot de passe.' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin',
    })
    // signIn with redirectTo throws NEXT_REDIRECT before reaching here
    return {}
  } catch (error) {
    // Re-throw NEXT_REDIRECT so Next.js handles the redirect
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email ou mot de passe invalide.' }
        case 'CallbackRouteError':
          return { error: 'Erreur lors de la connexion. Réessayez.' }
        default:
          return { error: 'Une erreur est survenue. Réessayez.' }
      }
    }

    // Unexpected error — don't expose details
    console.error('[loginAction] Unexpected error:', error)
    return { error: 'Erreur serveur. Réessayez dans quelques instants.' }
  }
}
