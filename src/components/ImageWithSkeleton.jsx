import { useEffect, useRef, useState } from 'react'

export default function ImageWithSkeleton({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  skeletonClassName = '',
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    setIsLoaded(false)

    if (imageRef.current?.complete) {
      setIsLoaded(true)
    }
  }, [src])

  const handleLoad = (event) => {
    setIsLoaded(true)
    onLoad?.(event)
  }

  const handleError = (event) => {
    setIsLoaded(true)
    onError?.(event)
  }

  return (
    <div className={`image-skeleton-wrap ${wrapperClassName} ${isLoaded ? 'is-loaded' : ''}`.trim()}>
      <div className={`image-skeleton ${skeletonClassName}`.trim()} aria-hidden="true" />
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
