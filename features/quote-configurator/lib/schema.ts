import { z } from 'zod'

export const step1Schema = z.object({
  projectType: z.enum(['site-vitrine', 'site-ecom', 'webapp', 'mobile', 'logiciel']),
})

export const step2Schema = z.object({
  features: z.array(z.string()),
})

export const step3Schema = z.object({
  modifiers: z.array(z.string()),
})

export const step4Schema = z.object({
  // Price summary — no input, just review
})

export const step5Schema = z.object({
  name: z.string().min(2, 'Nom requis (minimum 2 caractères)'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
  message: z.string().max(1000, 'Message trop long (max 1000 caractères)').optional(),
  howDidYouHear: z.enum(['google', 'recommendation', 'social', 'other'], {
    required_error: 'Veuillez sélectionner une option',
  }),
  rgpdConsent: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter pour soumettre le formulaire' }),
  }),
})

export const quoteFormSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step5Schema)

export type QuoteFormData = z.infer<typeof quoteFormSchema>
