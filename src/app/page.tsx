// app/page.tsx
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import CatalogButton from '@/src/components/ui/catalogo-interactivo/catalog-button'

const CatalogoViewer = dynamic(
  () => import('@/src/components/layout/catalogo-interactivo/catalog-viewer'),
  { ssr: false }
)

export default function Home() {
  const [catalogoAbierto, setCatalogoAbierto] = useState(false)

  return (
    <main className="mt-20">
      <h1>BAKU</h1>

      <CatalogButton
        onClick={() => setCatalogoAbierto(true)}
        isOpen={catalogoAbierto}
      />

      {catalogoAbierto && (
        <CatalogoViewer onClose={() => setCatalogoAbierto(false)} />
      )}
    </main>
  )
}