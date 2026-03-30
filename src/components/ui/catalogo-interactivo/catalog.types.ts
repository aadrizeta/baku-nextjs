// catalog.types.ts
export type FlipEvent = {
  data: number;
};

export type CatalogViewerProps = {
  onClose: () => void;
};

export type CatalogToolbarProps = {
  currentPage: number;
  totalPages: number;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  onFullscreen: () => void;
};
