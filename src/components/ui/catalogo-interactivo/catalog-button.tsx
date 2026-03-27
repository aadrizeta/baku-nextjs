// components/ui/catalogo-interactivo/catalog-button.tsx
interface CatalogButtonProps {
  onClick: () => void
  isOpen?: boolean
}

export default function CatalogButton({ onClick, isOpen = false }: CatalogButtonProps) {
  return (
    <button
      className="catalog-button"
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      onClick={onClick}
    >
      VER CATÁLOGO INTERACTIVO 2026
    </button>
  )
}