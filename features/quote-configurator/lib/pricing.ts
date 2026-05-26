/**
 * DokaiPi Pricing Engine — pure functions, no side effects
 * Source of truth: pricing-spec.md §1, §2, §3, §4
 *
 * Key rules:
 * - Modifiers applied in TABLE ORDER (§3), never user-selection order
 * - code-ownership is a fixed +1200€ added AFTER all percentage modifiers
 * - Final rounding: Math.ceil(rawTotal / 50) * 50
 * - Min display: 1200€ → show "Sur demande"
 * - Max display: 40000€ → show "À partir de 40 000€"
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProjectTypeId = 'site-vitrine' | 'site-ecom' | 'webapp' | 'mobile' | 'logiciel'

export type FeatureId =
  // Auth
  | 'auth-basic'
  | 'auth-social'
  | 'auth-2fa'
  | 'user-profiles'
  | 'roles-permissions'
  // Payment
  | 'payment-stripe'
  | 'subscriptions'
  | 'invoicing'
  | 'multi-currency'
  // Content & i18n
  | 'cms-integration'
  | 'blog'
  | 'i18n'
  | 'seo-advanced'
  // Communication
  | 'contact-form'
  | 'email-transac'
  | 'push-notifications'
  | 'live-chat'
  | 'newsletter'
  // Data & dashboard
  | 'admin-dashboard'
  | 'analytics'
  | 'data-export'
  | 'api-public'
  | 'search-advanced'
  // Integrations
  | 'crm-integration'
  | 'calendar-sync'
  | 'maps'
  | 'social-share'
  | 'webhook-api'
  // Design & UX
  | '3d-experience'
  | 'custom-animations'
  | 'dark-mode'
  | 'pwa'
  // AI
  | 'ai-chatbot'
  | 'ai-content-gen'
  | 'ai-recommendations'
  | 'ai-search'

export type ModifierId =
  | 'design-premium'
  | 'urgency-30d'
  | 'urgency-15d'
  | 'maintenance-6m'
  | 'maintenance-1y'
  | 'extended-warranty'
  | 'code-ownership'
  | 'native-mobile'

export interface PriceBreakdown {
  projectType: ProjectTypeId
  basePrice: number
  features: { id: FeatureId; price: number }[]
  featuresTotal: number
  subtotal: number // base + features
  modifiers: { id: ModifierId; label: string; amount: number; type: 'percentage' | 'fixed' }[]
  rawTotal: number // after modifiers, before rounding
  totalHT: number // rounded to next 50€
  totalTTC: number // totalHT × 1.20
  displayMode: 'price' | 'sur-demande' | 'devis-sur-mesure'
  estimatedDuration: string
}

// ─── Reference data ───────────────────────────────────────────────────────────

export const PROJECT_TYPES: Record<ProjectTypeId, { label: string; basePrice: number }> = {
  'site-vitrine': { label: 'Site vitrine', basePrice: 1800 },
  'site-ecom': { label: 'Site e-commerce', basePrice: 3200 },
  webapp: { label: 'Application web / SaaS', basePrice: 5500 },
  mobile: { label: 'Application mobile', basePrice: 6900 },
  logiciel: { label: 'Logiciel sur mesure', basePrice: 5200 },
}

export const FEATURES: Record<
  FeatureId,
  { label: string; price: number; applicableTo: ProjectTypeId[] | 'all' }
> = {
  // Auth
  'auth-basic': {
    label: 'Authentification email/mdp',
    price: 450,
    applicableTo: ['webapp', 'mobile', 'logiciel'],
  },
  'auth-social': {
    label: 'Login Google/Apple/GitHub',
    price: 300,
    applicableTo: ['webapp', 'mobile'],
  },
  'auth-2fa': {
    label: 'Double authentification',
    price: 400,
    applicableTo: ['webapp', 'mobile', 'logiciel'],
  },
  'user-profiles': {
    label: 'Profils utilisateurs',
    price: 550,
    applicableTo: ['webapp', 'mobile'],
  },
  'roles-permissions': {
    label: 'Rôles et permissions',
    price: 800,
    applicableTo: ['webapp', 'logiciel'],
  },
  // Payment
  'payment-stripe': {
    label: 'Paiement Stripe',
    price: 600,
    applicableTo: ['site-ecom', 'webapp', 'mobile'],
  },
  subscriptions: {
    label: 'Abonnements récurrents',
    price: 900,
    applicableTo: ['webapp', 'mobile'],
  },
  invoicing: {
    label: 'Facturation automatique',
    price: 750,
    applicableTo: ['site-ecom', 'webapp', 'logiciel'],
  },
  'multi-currency': { label: 'Multi-devises', price: 450, applicableTo: ['site-ecom', 'webapp'] },
  // Content
  'cms-integration': {
    label: 'CMS (Sanity/Strapi)',
    price: 800,
    applicableTo: ['site-vitrine', 'site-ecom'],
  },
  blog: { label: 'Module blog', price: 400, applicableTo: ['site-vitrine', 'site-ecom'] },
  i18n: { label: 'Multilingue (par langue +)', price: 300, applicableTo: 'all' },
  'seo-advanced': {
    label: 'SEO avancé + structured data',
    price: 500,
    applicableTo: ['site-vitrine', 'site-ecom'],
  },
  // Communication
  'contact-form': { label: 'Formulaire de contact', price: 150, applicableTo: 'all' },
  'email-transac': {
    label: 'Emails transactionnels',
    price: 350,
    applicableTo: ['webapp', 'mobile', 'site-ecom'],
  },
  'push-notifications': {
    label: 'Notifications push',
    price: 600,
    applicableTo: ['mobile', 'webapp'],
  },
  'live-chat': { label: 'Chat en direct', price: 500, applicableTo: 'all' },
  newsletter: { label: 'Système newsletter', price: 400, applicableTo: 'all' },
  // Data
  'admin-dashboard': {
    label: 'Dashboard admin',
    price: 1100,
    applicableTo: ['site-ecom', 'webapp', 'mobile', 'logiciel'],
  },
  analytics: { label: 'Analytics avancés', price: 600, applicableTo: 'all' },
  'data-export': {
    label: 'Export CSV/Excel/PDF',
    price: 400,
    applicableTo: ['webapp', 'logiciel'],
  },
  'api-public': {
    label: 'API publique documentée',
    price: 1200,
    applicableTo: ['webapp', 'mobile', 'logiciel'],
  },
  'search-advanced': {
    label: 'Recherche avancée + filtres',
    price: 550,
    applicableTo: ['site-ecom', 'webapp'],
  },
  // Integrations
  'crm-integration': {
    label: 'Intégration CRM (HubSpot…)',
    price: 750,
    applicableTo: ['webapp', 'site-ecom'],
  },
  'calendar-sync': {
    label: 'Sync calendrier (Google…)',
    price: 550,
    applicableTo: ['webapp', 'mobile'],
  },
  maps: { label: 'Cartes interactives', price: 400, applicableTo: 'all' },
  'social-share': { label: 'Partage réseaux sociaux', price: 150, applicableTo: 'all' },
  'webhook-api': {
    label: 'Webhooks entrants/sortants',
    price: 450,
    applicableTo: ['webapp', 'logiciel'],
  },
  // Design
  '3d-experience': {
    label: 'Expérience 3D interactive',
    price: 1800,
    applicableTo: ['site-vitrine', 'webapp'],
  },
  'custom-animations': { label: 'Animations sur mesure', price: 900, applicableTo: 'all' },
  'dark-mode': { label: 'Mode sombre', price: 250, applicableTo: 'all' },
  pwa: { label: 'Progressive Web App', price: 600, applicableTo: ['site-vitrine', 'webapp'] },
  // AI
  'ai-chatbot': { label: 'Chatbot IA intégré', price: 1200, applicableTo: 'all' },
  'ai-content-gen': {
    label: 'Génération de contenu IA',
    price: 900,
    applicableTo: ['webapp', 'site-ecom'],
  },
  'ai-recommendations': {
    label: 'Recommandations personnalisées',
    price: 1100,
    applicableTo: ['site-ecom', 'webapp', 'mobile'],
  },
  'ai-search': {
    label: 'Recherche sémantique',
    price: 1300,
    applicableTo: ['webapp', 'site-ecom'],
  },
}

/** Modifiers in TABLE ORDER — applied strictly in this sequence (§3) */
export const MODIFIER_ORDER: ModifierId[] = [
  'design-premium',
  'urgency-30d',
  'urgency-15d',
  'maintenance-6m',
  'maintenance-1y',
  'extended-warranty',
  'code-ownership',
  'native-mobile',
]

export const MODIFIERS: Record<
  ModifierId,
  { label: string; type: 'percentage' | 'fixed'; value: number; applicableTo?: ProjectTypeId[] }
> = {
  'design-premium': { label: 'Design 100% sur mesure premium', type: 'percentage', value: 0.25 },
  'urgency-30d': { label: 'Livraison sous 1 mois', type: 'percentage', value: 0.2 },
  'urgency-15d': { label: 'Livraison sous 15 jours', type: 'percentage', value: 0.4 },
  'maintenance-6m': { label: 'Maintenance + support 6 mois', type: 'percentage', value: 0.1 },
  'maintenance-1y': { label: 'Maintenance + support 1 an', type: 'percentage', value: 0.18 },
  'extended-warranty': { label: 'Garantie étendue 2 ans', type: 'percentage', value: 0.12 },
  'code-ownership': { label: 'Cession totale du code source', type: 'fixed', value: 1200 },
  'native-mobile': {
    label: 'Mobile natif (iOS + Android séparés)',
    type: 'percentage',
    value: 0.6,
    applicableTo: ['mobile'],
  },
}

const DURATION_MAP: Record<ProjectTypeId, string> = {
  'site-vitrine': '2-4 semaines',
  'site-ecom': '4-6 semaines',
  webapp: '5-10 semaines',
  mobile: '6-12 semaines',
  logiciel: '4-10 semaines',
}

// ─── Core calculation ─────────────────────────────────────────────────────────

export function isFeatureApplicable(featureId: FeatureId, projectType: ProjectTypeId): boolean {
  const f = FEATURES[featureId]
  if (!f) return false
  if (f.applicableTo === 'all') return true
  return (f.applicableTo as ProjectTypeId[]).includes(projectType)
}

/**
 * calculatePrice — the single source of truth for all pricing.
 *
 * Modifiers are applied in TABLE ORDER regardless of user-selection order.
 * Percentage modifiers multiply the running total sequentially.
 * code-ownership (fixed) is added after all percentage mods.
 * Final result rounded up to next multiple of 50.
 */
export function calculatePrice(
  projectType: ProjectTypeId,
  selectedFeatures: FeatureId[],
  selectedModifiers: ModifierId[]
): PriceBreakdown {
  // 1. Base price
  const basePrice = PROJECT_TYPES[projectType].basePrice

  // 2. Features (only applicable ones count)
  const featureDetails = selectedFeatures
    .filter((fId) => isFeatureApplicable(fId, projectType))
    .map((fId) => ({ id: fId, price: FEATURES[fId].price }))

  const featuresTotal = featureDetails.reduce((sum, f) => sum + f.price, 0)
  const subtotal = basePrice + featuresTotal

  // 3. Apply modifiers in TABLE ORDER
  const modifierSet = new Set(selectedModifiers)
  let running = subtotal
  const modifierDetails: PriceBreakdown['modifiers'] = []

  for (const modId of MODIFIER_ORDER) {
    if (!modifierSet.has(modId)) continue

    const mod = MODIFIERS[modId]

    // native-mobile only applies to 'mobile' projects
    if (modId === 'native-mobile' && projectType !== 'mobile') continue

    if (mod.type === 'percentage') {
      const amount = running * mod.value
      modifierDetails.push({ id: modId, label: mod.label, amount, type: 'percentage' })
      running += amount
    } else {
      // Fixed modifiers are recorded but applied after all percentages
      // (code-ownership is the only fixed one — add it at end)
      modifierDetails.push({ id: modId, label: mod.label, amount: mod.value, type: 'fixed' })
    }
  }

  // Add fixed modifier amounts after percentages
  const fixedTotal = modifierDetails
    .filter((m) => m.type === 'fixed')
    .reduce((sum, m) => sum + m.amount, 0)

  const rawTotal = running + fixedTotal

  // 4. Round up to next 50€
  const totalHT = Math.ceil(rawTotal / 50) * 50

  // 5. TTC
  const totalTTC = Math.round(totalHT * 1.2)

  // 6. Display mode
  let displayMode: PriceBreakdown['displayMode'] = 'price'
  if (totalHT < 1200) displayMode = 'sur-demande'
  else if (totalHT > 40000) displayMode = 'devis-sur-mesure'

  return {
    projectType,
    basePrice,
    features: featureDetails,
    featuresTotal,
    subtotal,
    modifiers: modifierDetails,
    rawTotal,
    totalHT,
    totalTTC,
    displayMode,
    estimatedDuration: DURATION_MAP[projectType],
  }
}
