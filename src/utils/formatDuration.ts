export const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.round(duration % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
  