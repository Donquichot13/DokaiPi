import {
  Monitor,
  ShoppingBag,
  LayoutDashboard,
  Smartphone,
  Cpu,
  Search,
  Lock,
  CreditCard,
  BarChart3,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export interface ServiceFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface ServiceData {
  slug: string
  label: string
  tagline: string
  description: string
  basePrice: number
  duration: string
  icon: LucideIcon
  heroGradient: string
  accentColor: string
  features: ServiceFeature[]
  techStack: string[]
  deliverables: string[]
  faq: { question: string; answer: string }[]
}

export const SERVICES: Record<string, ServiceData> = {
  'site-vitrine': {
    slug: 'site-vitrine',
    label: 'Site vitrine',
    tagline: 'Votre présence en ligne, sans compromis.',
    description:
      "Un site vitrine professionnel, rapide et optimisé SEO. Jusqu'à 6 pages, design sur mesure, mobile-first. Idéal pour les artisans, PME et professions libérales qui veulent une présence digitale sérieuse.",
    basePrice: 1800,
    duration: '2-4 semaines',
    icon: Monitor,
    heroGradient: 'from-blue-600/20 to-blue-400/10',
    accentColor: 'text-blue-400',
    features: [
      {
        icon: Search,
        title: 'SEO optimisé',
        description:
          'Balises méta, données structurées, sitemap, robots.txt. Prêt pour Google dès le lancement.',
      },
      {
        icon: Zap,
        title: 'Performance maximale',
        description: 'Core Web Vitals 90+, images optimisées, lazy loading. LCP < 2s sur mobile.',
      },
      {
        icon: Lock,
        title: 'Sécurité & RGPD',
        description:
          'HTTPS, headers de sécurité, gestion des cookies conforme RGPD. Aucun souci légal.',
      },
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    deliverables: [
      "Jusqu'à 6 pages (Accueil, Services, À propos, Contact...)",
      'Formulaire de contact avec notifications email',
      'Version mobile et tablette parfaite',
      'Dashboard Google Analytics configuré',
      'Formation CMS pour modifier le contenu',
      'Documentation de maintenance',
    ],
    faq: [
      {
        question: 'Puis-je modifier le contenu moi-même ?',
        answer:
          "Oui, si vous optez pour l'option CMS (+800€). Vous aurez accès à une interface simple pour modifier textes et images sans toucher au code.",
      },
      {
        question: 'Le site est-il hébergé chez vous ?',
        answer:
          "Non. Le site est déployé sur Vercel (gratuit jusqu'à 100k visiteurs/mois) sous votre propre compte. Vous êtes propriétaire à 100%.",
      },
      {
        question: 'Que comprend le délai de 2-4 semaines ?',
        answer:
          'Brief initial, maquettes Figma validées, développement, tests, déploiement et formation. Tout est inclus.',
      },
    ],
  },

  'application-web': {
    slug: 'application-web',
    label: 'Application web / SaaS',
    tagline: 'Du MVP à la plateforme qui scale.',
    description:
      'Applications web complexes, dashboards, outils SaaS. Architecture moderne, authentification robuste, API REST, CI/CD automatisé. On livre du code propre, testé et maintenable — pas juste un prototype.',
    basePrice: 5500,
    duration: '5-10 semaines',
    icon: LayoutDashboard,
    heroGradient: 'from-cyan-600/20 to-cyan-400/10',
    accentColor: 'text-cyan-400',
    features: [
      {
        icon: Lock,
        title: 'Auth & rôles',
        description:
          'NextAuth v5 ou Clerk, multi-providers (Google, GitHub, email), rôles granulaires, sessions sécurisées.',
      },
      {
        icon: BarChart3,
        title: 'Dashboard & analytics',
        description:
          'Tables de données, graphiques temps réel, exports CSV/PDF, KPIs personnalisés selon votre métier.',
      },
      {
        icon: Zap,
        title: 'Architecture scalable',
        description:
          'Next.js App Router, API Routes, Server Actions, Edge Functions. Prêt pour 10 ou 100 000 utilisateurs.',
      },
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Stripe'],
    deliverables: [
      'MVP complet et fonctionnel',
      'Authentification et gestion des utilisateurs',
      'API REST documentée (OpenAPI)',
      'Dashboard administrateur',
      'Tests unitaires et E2E',
      'CI/CD automatisé (GitHub Actions + Vercel)',
      'Documentation technique complète',
    ],
    faq: [
      {
        question: 'Travaillez-vous sur des projets avec des données sensibles ?',
        answer:
          'Oui. On maîtrise chiffrement, RBAC, audit logs, et conformité RGPD. Chaque projet inclut une revue de sécurité.',
      },
      {
        question: 'Peut-on intégrer des outils tiers (CRM, ERP...) ?',
        answer:
          "Absolument. On a intégré HubSpot, Salesforce, Stripe, Twilio, et des dizaines d'autres APIs. Comptez +750€ par intégration complexe.",
      },
      {
        question: "Qu'advient-il après la livraison ?",
        answer:
          'On vous forme sur la codebase, on documente tout, et on propose des contrats de maintenance (à partir de +10% du prix projet/an). Le code vous appartient.',
      },
    ],
  },

  'application-mobile': {
    slug: 'application-mobile',
    label: 'Application mobile',
    tagline: 'iOS & Android. Une seule codebase, deux stores.',
    description:
      "Applications mobiles cross-platform avec Flutter ou React Native. Publication sur l'App Store et Google Play incluse. UX native, performances au rendez-vous, push notifications, deep linking.",
    basePrice: 6900,
    duration: '6-12 semaines',
    icon: Smartphone,
    heroGradient: 'from-emerald-600/20 to-emerald-400/10',
    accentColor: 'text-emerald-400',
    features: [
      {
        icon: Zap,
        title: 'Performance native',
        description:
          'Flutter ou React Native selon votre besoin. Animations 60fps, temps de chargement < 1s, UX qui ne ressemble pas à du web.',
      },
      {
        icon: Lock,
        title: 'Publication stores',
        description:
          'On gère toute la soumission App Store et Google Play : certificates, provisioning profiles, ASO de base.',
      },
      {
        icon: BarChart3,
        title: 'Notifications & offline',
        description:
          'Push notifications via FCM/APNs, mode hors-ligne avec sync automatique, stockage local chiffré.',
      },
    ],
    techStack: ['Flutter', 'React Native', 'Firebase', 'Supabase', 'FCM', 'App Store Connect'],
    deliverables: [
      'App iOS + Android (codebase unifiée)',
      'Backend API et base de données',
      'Système de notifications push',
      'Publication sur les deux stores',
      'Analytics in-app (Mixpanel ou Firebase)',
      'Tests sur appareils réels',
      'Monitoring post-lancement (Crashlytics)',
    ],
    faq: [
      {
        question: 'Quelle différence entre Flutter et React Native ?',
        answer:
          'Flutter offre des performances légèrement supérieures et un rendu pixel-perfect. React Native est idéal si votre équipe est JS-first. On vous conseille selon votre contexte.',
      },
      {
        question: 'Combien coûte la publication sur les stores ?',
        answer:
          "Apple Developer Program : 99$/an. Google Play : 25$ unique. Ces frais sont à votre charge — mais on s'occupe de tout le process.",
      },
      {
        question: "Peut-on avoir une version web en plus de l'app ?",
        answer:
          'Oui. Flutter web est une option, ou on peut développer une PWA en parallèle. On vous propose la solution la plus adaptée à votre budget.',
      },
    ],
  },

  'logiciel-sur-mesure': {
    slug: 'logiciel-sur-mesure',
    label: 'Logiciel sur mesure',
    tagline: 'Automatisez ce qui vous ralentit.',
    description:
      "Outils internes, scripts d'automatisation, backends métier, migrations de données. Pour les entreprises qui ont des processus spécifiques qu'aucun SaaS du marché ne couvre — ou des legacy à moderniser.",
    basePrice: 5200,
    duration: '4-10 semaines',
    icon: Cpu,
    heroGradient: 'from-orange-600/20 to-orange-400/10',
    accentColor: 'text-orange-400',
    features: [
      {
        icon: Zap,
        title: 'Automatisation',
        description:
          'Cron jobs, webhooks, pipelines ETL, intégrations API tierces. On automatise vos tâches manuelles répétitives.',
      },
      {
        icon: CreditCard,
        title: 'Intégrations métier',
        description:
          'Connexion à vos outils existants (ERP, CRM, comptabilité). Format de données personnalisé, aucun compromis.',
      },
      {
        icon: Lock,
        title: 'Sécurité & audit',
        description:
          'Chiffrement des données sensibles, logs immuables, authentification MFA, conformité ISO/RGPD.',
      },
    ],
    techStack: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'],
    deliverables: [
      'Logiciel livré et déployé en production',
      'Documentation utilisateur et technique',
      'Tests automatisés (couverture > 80%)',
      'Monitoring et alertes (Sentry, Grafana)',
      'Formation équipe incluse',
      'Code source, vous êtes propriétaire',
    ],
    faq: [
      {
        question: 'On a un vieux logiciel à moderniser. Vous faites ça ?',
        answer:
          "Oui, c'est même une spécialité. On audite l'existant, on identifie les risques, et on migre progressivement. Sans disruption de votre production.",
      },
      {
        question: 'Quelles technologies utilisez-vous pour les automatisations ?',
        answer:
          'Node.js ou Python selon le contexte, avec des queues (BullMQ, Celery), des schedulers (cron, Temporal), et des pipelines de données (dbt, custom ETL).',
      },
      {
        question: 'Le logiciel peut-il tourner sur nos serveurs on-premise ?',
        answer:
          "Oui. On livre une image Docker déployable partout. On peut aussi assurer le déploiement si vous disposez d'une infra Kubernetes ou simple VM Linux.",
      },
    ],
  },
}
