'use client';
import { useRef, useState, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";

// Las typings de `react-pageflip` para esta versión suelen exigir muchos props extra.
// Para evitar errores TS en el proyecto y centrarnos en el comportamiento,
// tipamos el componente de forma laxa.
const FlipBook = HTMLFlipBook as any;

const pages = [
  '/images/catalog-pages/portada.jpg',
  '/images/catalog-pages/2.jpg',
  '/images/catalog-pages/3.jpg',
  '/images/catalog-pages/4.jpg',
  '/images/catalog-pages/5.jpg',
  '/images/catalog-pages/6.jpg',
  '/images/catalog-pages/7.jpg',
  '/images/catalog-pages/8.jpg',
  '/images/catalog-pages/9.jpg',
  '/images/catalog-pages/10.jpg',
  '/images/catalog-pages/11.jpg',
  '/images/catalog-pages/12.jpg',
  '/images/catalog-pages/13.jpg',
]

type CatalogViewerProps = {
  onClose: () => void
}

type FlipEvent = {
  data: number
}

export default function CatalogViewer({ onClose }: CatalogViewerProps) {

  // `react-pageflip` no ofrece tipos completos para `ref` en esta versión
  // (para evitar errores TS, tipamos como `any`).
  const flipRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, portrait: false })

  const totalPages = pages.length

  //Calcular dimensiones del libro según la ventana
  const calcDimensions = useCallback(() => {
    const vh = window.innerHeight
    const vw = window.innerWidth
    const ratio = 0.707  // A4: 1/√2. Ajusta al ratio real de tus imágenes
    const toolbarHeight = 56

    const isMobile = vw < 768

    if (isMobile) {
      // En móvil: una sola página, ocupa casi toda la pantalla
      const availableHeight = vh - toolbarHeight - 24  // 24px de margen
      const availableWidth = vw - 24                  // 12px margen a cada lado

      // Intentamos maximizar por alto
      let pageHeight = availableHeight
      let pageWidth = pageHeight * ratio

      // Si el ancho calculado se pasa del disponible, recalculamos desde el ancho
      if (pageWidth > availableWidth) {
        pageWidth = availableWidth
        pageHeight = pageWidth / ratio
      }

      setDimensions({
        width: Math.floor(pageWidth),
        height: Math.floor(pageHeight),
        portrait: true,
      })
    } else {
      // En escritorio: dos páginas, misma lógica de antes
      const availableHeight = vh - toolbarHeight - 24
      const availableWidth = vw - 48  // 24px margen a cada lado

      let pageHeight = availableHeight
      let pageWidth = pageHeight * ratio

      // El libro son dos páginas juntas, comprobamos que no superen el ancho total
      if (pageWidth * 2 > availableWidth) {
        pageWidth = availableWidth / 2
        pageHeight = pageWidth / ratio
      }

      setDimensions({
        width: Math.floor(pageWidth),
        height: Math.floor(pageHeight),
        portrait: false,
      })
    }
  }, [])

  useEffect(() => {
    calcDimensions()
    window.addEventListener('resize', calcDimensions)
    return () => window.removeEventListener('resize', calcDimensions)
  }, [calcDimensions])

  //Manejar eventos del teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Escuchar cambios de fullscreen desde el navegador (ej. tecla Esc nativa)
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const handleNext = () => {
    const flip = flipRef.current?.pageFlip?.()
    flip?.flipNext?.()
  }
  const handlePrev = () => {
    const flip = flipRef.current?.pageFlip?.()
    flip?.flipPrev?.()
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen()
    }
  }

  const handleFlip = (e: FlipEvent) => setCurrentPage(e.data)

  if (dimensions.width === 0) return null

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 12,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button type="button" onClick={onClose}>
          Cerrar
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button type="button" onClick={handlePrev} disabled={currentPage <= 0}>
            Anterior
          </button>
          <button type="button" onClick={handleNext} disabled={currentPage >= totalPages - 1}>
            Siguiente
          </button>
          <button type="button" onClick={handleFullscreen}>
            {isFullscreen ? "Salir" : "Pantalla completa"}
          </button>
        </div>
      </div>

      <FlipBook
        ref={flipRef}
        width={dimensions.width}
        height={dimensions.height}
        size="stretch"
        minWidth={dimensions.width}
        maxWidth={dimensions.width}
        minHeight={dimensions.height}
        maxHeight={dimensions.height}
        onFlip={handleFlip}
      >
        {pages.map((src, idx) => (
          <div
            key={src}
            style={{
              width: dimensions.width,
              height: dimensions.height,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Página ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none", userSelect: "none" }}
            />
          </div>
        ))}
      </FlipBook>

      <div style={{ width: "100%", textAlign: "center", fontSize: 12, opacity: 0.8 }}>
        {currentPage + 1} / {totalPages}
      </div>
    </div>
  )
}