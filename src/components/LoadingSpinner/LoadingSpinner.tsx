import type { CSSProperties } from 'react'
import { PacmanLoader } from 'react-spinners'
export function LoadingSpinner ({
  isLoading,
  styling,
  size
}: Readonly<{
  isLoading: boolean
  styling?: CSSProperties
  size: string
}>) {
  return (
    <PacmanLoader
      color="#D2D2D2"
      size={size}
      loading={isLoading}
      cssOverride={styling}
      aria-label="Loading spiner"
    />
  )
}