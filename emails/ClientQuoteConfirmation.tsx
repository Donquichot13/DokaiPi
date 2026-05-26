/* eslint-disable @next/next/no-head-element */
import * as React from 'react'
import { PriceBreakdown, PROJECT_TYPES } from '@/features/quote-configurator/lib/pricing'
import type { QuoteFormData } from '@/features/quote-configurator/lib/schema'

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

const colors = {
  bg: '#0a0a0a',
  card: '#111111',
  border: '#222222',
  text: '#ffffff',
  muted: '#888888',
  accent: '#0075FF',
  accentEnd: '#582CFF',
}

interface Props {
  data: QuoteFormData
  breakdown: PriceBreakdown
  quoteNumber: string
}

export function ClientQuoteConfirmationEmail({ data, breakdown, quoteNumber }: Props) {
  const projectLabel = PROJECT_TYPES[data.projectType]?.label ?? data.projectType
  const firstName = data.name.split(' ')[0]

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Votre demande de devis {quoteNumber}</title>
      </head>
      <body
        style={{
          backgroundColor: colors.bg,
          fontFamily: 'Inter, -apple-system, sans-serif',
          margin: 0,
          padding: '40px 20px',
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          {/* Logo + header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div
              style={{ fontSize: 28, fontWeight: 800, color: colors.text, letterSpacing: '-1px' }}
            >
              DokaiPi
            </div>
            <div style={{ marginTop: 4, fontSize: 13, color: colors.muted }}>
              Agence web premium
            </div>
          </div>

          {/* Main card */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 16,
              padding: 32,
              marginBottom: 20,
            }}
          >
            {/* Greeting */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: 8 }}>
                Merci {firstName}&nbsp;!
              </div>
              <div style={{ fontSize: 14, color: '#aaaaaa', lineHeight: 1.7 }}>
                Votre demande de devis a bien été reçue. Nous allons l&apos;analyser et vous
                répondre dans les <strong style={{ color: colors.text }}>24 heures ouvrées</strong>.
              </div>
            </div>

            {/* Quote number */}
            <div
              style={{
                padding: 16,
                backgroundColor: '#0d1a2e',
                border: `1px solid #1a3460`,
                borderRadius: 8,
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>
                Référence de votre demande
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: colors.accent }}>
                {quoteNumber}
              </div>
              <div style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                Conservez cette référence pour tout échange avec nous.
              </div>
            </div>

            {/* Project summary */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: colors.muted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 12,
                }}
              >
                Récapitulatif
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td
                      style={{ color: colors.muted, fontSize: 13, padding: '5px 0', width: '40%' }}
                    >
                      Type de projet
                    </td>
                    <td style={{ color: colors.text, fontSize: 13, fontWeight: 500 }}>
                      {projectLabel}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: colors.muted, fontSize: 13, padding: '5px 0' }}>
                      Fonctionnalités
                    </td>
                    <td style={{ color: colors.text, fontSize: 13 }}>
                      {data.features.length} sélectionnée{data.features.length > 1 ? 's' : ''}
                    </td>
                  </tr>
                  {data.modifiers.length > 0 && (
                    <tr>
                      <td style={{ color: colors.muted, fontSize: 13, padding: '5px 0' }}>
                        Options
                      </td>
                      <td style={{ color: colors.text, fontSize: 13 }}>
                        {data.modifiers.length} sélectionnée{data.modifiers.length > 1 ? 's' : ''}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ color: colors.muted, fontSize: 13, padding: '5px 0' }}>
                      Délai estimé
                    </td>
                    <td style={{ color: colors.text, fontSize: 13 }}>
                      {breakdown.estimatedDuration}
                    </td>
                  </tr>
                  <tr style={{ borderTop: `1px solid ${colors.border}` }}>
                    <td style={{ color: colors.muted, fontSize: 13, padding: '10px 0 4px' }}>
                      Estimation HT
                    </td>
                    <td
                      style={{
                        color: colors.text,
                        fontSize: 15,
                        fontWeight: 700,
                        padding: '10px 0 4px',
                      }}
                    >
                      {breakdown.displayMode === 'price'
                        ? fmt(breakdown.totalHT)
                        : breakdown.displayMode === 'sur-demande'
                          ? 'Sur demande'
                          : `À partir de ${fmt(40000)}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* What happens next */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: 24,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: colors.muted,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 16,
              }}
            >
              La suite
            </div>
            {[
              {
                step: '1',
                title: 'Analyse de votre demande',
                desc: 'Nous étudions les spécificités de votre projet sous 24h.',
              },
              {
                step: '2',
                title: 'Devis détaillé',
                desc: 'Vous recevez un devis complet avec planning et livrables.',
              },
              {
                step: '3',
                title: 'Appel découverte',
                desc: '30 minutes pour aligner nos visions et répondre à vos questions.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: '#0d1a2e',
                    border: `1px solid ${colors.accent}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: colors.accent, fontSize: 12, fontWeight: 700 }}>
                    {step}
                  </span>
                </div>
                <div>
                  <div
                    style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 2 }}
                  >
                    {title}
                  </div>
                  <div style={{ color: colors.muted, fontSize: 12, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', color: colors.muted, fontSize: 11, lineHeight: 1.8 }}>
            <div>DokaiPi — Agence web premium</div>
            <div>contact@dokaipi.com</div>
            <div style={{ marginTop: 8 }}>
              Vous recevez cet email car vous avez soumis une demande de devis sur dokaipi.com.
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
