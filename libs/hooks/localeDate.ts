export const internationalDate = (date:string|Date): Date => {
    const dateStr = date.toString() + 'Z'
    return new Date(dateStr)
  }