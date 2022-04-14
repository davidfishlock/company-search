export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    const dateFormat = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
    return dateFormat.format(date)
  } catch (error) {
    console.error('Error formatting date: ', error)
    return ''
  }
}
