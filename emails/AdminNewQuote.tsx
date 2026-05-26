/* eslint-disable @next/next/no-head-element */
import * as React from 'react'
import {
  PriceBreakdown,
  PROJECT_TYPES,
  FEATURES,
  MODIFIERS,
} from '@/features/quote-configurator/lib/pricing'
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
  green: '#22c55e',
}

interface Props {
  data: QuoteFormData
  breakdown: PriceBreakdown
  quoteNumber: string
}

export function AdminNewQuoteEmail({ data, breakdown, quoteNumber }: Props) {
  const projectLabel = PROJECT_TYPES[data.projectType]?.label ?? data.projectType

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nouveau devis {quoteNumber}</title>
      </head>
      <body
        style={{
          backgroundColor: colors.bg,
          fontFamily: 'Inter, -apple-system, sans-serif',
          margin: 0,
          padding: '40px 20px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{ fontSize: 24, fontWeight: 700, color: colors.text, letterSpacing: '-0.5px' }}
            >
              DokaiPi
            </div>
            <div
              style={{
                marginTop: 16,
                padding: '8px 12px',
                display: 'inline-block',
                backgroundColor: '#1a2a1a',
                border: '1px solid #2d5a2d',
                borderRadius: 6,
              }}
            >
              <span style={{ color: colors.green, fontSize: 12, fontWeight: 600 }}>
                ● Nouveau devis reçu
              </span>
            </div>
          </div>

          {/* Quote number */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: 24,
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>Référence</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.text }}>{quoteNumber}</div>
            <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
              {new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>

          {/* Contact */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: 24,
              marginBottom: 16,
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
              Contact
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Nom', data.name],
                  ['Email', data.email],
                  ...(data.phone ? [['Téléphone', data.phone]] : []),
                  ...(data.company ? [['Entreprise', data.company]] : []),
                  ...(data.website ? [['Site web', data.website]] : []),
                  ['Source', data.howDidYouHear],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td
                      style={{
                        color: colors.muted,
                        fontSize: 13,
                        padding: '5px 0',
                        width: '35%',
                        verticalAlign: 'top',
                      }}
                    >
                      {label}
                    </td>
                    <td
                      style={{
                        color: colors.text,
                        fontSize: 13,
                        padding: '5px 0',
                        fontWeight: 500,
                      }}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.message && (
              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  backgroundColor: '#1a1a1a',
                  borderRadius: 8,
                  borderLeft: `3px solid ${colors.accent}`,
                }}
              >
                <div style={{ fontSize: 11, color: colors.muted, marginBottom: 6 }}>Message</div>
                <div style={{ fontSize: 13, color: colors.text, lineHeight: 1.6 }}>
                  {data.message}
                </div>
              </div>
            )}
          </div>

          {/* Project */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: 24,
              marginBottom: 16,
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
              Projet
            </div>

            <div style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: 16 }}>
              {projectLabel}
            </div>

            {data.features.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                  Fonctionnalités ({data.features.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {data.features.map((fId) => (
                    <span
                      key={fId}
                      style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        backgroundColor: '#1a1a2e',
                        border: '1px solid #2a2a4e',
                        borderRadius: 4,
                        color: '#8888ff',
                      }}
                    >
                      {FEATURES[fId as keyof typeof FEATURES]?.label ?? fId}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.modifiers.length > 0 && (
              <div>
                <div style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>Options</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {data.modifiers.map((mId) => (
                    <span
                      key={mId}
                      style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        backgroundColor: '#1a2a1a',
                        border: '1px solid #2a4a2a',
                        borderRadius: 4,
                        color: '#88cc88',
                      }}
                    >
                      {MODIFIERS[mId as keyof typeof MODIFIERS]?.label ?? mId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price */}
          <div
            style={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: 24,
              marginBottom: 32,
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
              Estimation
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ color: colors.muted, fontSize: 13, padding: '4px 0' }}>
                    Base projet
                  </td>
                  <td style={{ color: colors.text, fontSize: 13, textAlign: 'right' }}>
                    {fmt(breakdown.basePrice)}
                  </td>
                </tr>
                {breakdown.featuresTotal > 0 && (
                  <tr>
                    <td style={{ color: colors.muted, fontSize: 13, padding: '4px 0' }}>
                      Fonctionnalités
                    </td>
                    <td style={{ color: colors.text, fontSize: 13, textAlign: 'right' }}>
                      +{fmt(breakdown.featuresTotal)}
                    </td>
                  </tr>
                )}
                {breakdown.modifiers.map((m) => (
                  <tr key={m.id}>
                    <td style={{ color: colors.muted, fontSize: 13, padding: '4px 0' }}>
                      {m.label}
                    </td>
                    <td style={{ color: colors.text, fontSize: 13, textAlign: 'right' }}>
                      +{fmt(m.amount)}
                    </td>
                  </tr>
                ))}
                <tr style={{ borderTop: `1px solid ${colors.border}` }}>
                  <td
                    style={{
                      color: colors.text,
                      fontSize: 15,
                      fontWeight: 700,
                      padding: '12px 0 4px',
                    }}
                  >
                    Total HT
                  </td>
                  <td
                    style={{
                      color: colors.text,
                      fontSize: 15,
                      fontWeight: 700,
                      textAlign: 'right',
                      padding: '12px 0 4px',
                    }}
                  >
                    {breakdown.displayMode === 'price'
                      ? fmt(breakdown.totalHT)
                      : breakdown.displayMode === 'sur-demande'
                        ? 'Sur demande'
                        : 'Devis sur mesure'}
                  </td>
                </tr>
                {breakdown.displayMode === 'price' && (
                  <tr>
                    <td style={{ color: colors.muted, fontSize: 12, padding: '2px 0' }}>
                      Total TTC
                    </td>
                    <td style={{ color: colors.muted, fontSize: 12, textAlign: 'right' }}>
                      {fmt(breakdown.totalTTC)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', color: colors.muted, fontSize: 11 }}>
            DokaiPi — Notification interne automatique
          </div>
        </div>
      </body>
    </html>
  )
}
