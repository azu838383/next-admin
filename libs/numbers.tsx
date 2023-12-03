  /* 
  ID Format num, c = 2, d = ',', t = '.'
  US Format num, c = 2, d = '.', t = ','
*/

const formatCurrency = (num: number, c = 2, d = '.', t = ','): string => {
  c = isNaN((c = Math.abs(c))) ? 2 : c
  d = d === undefined ? '.' : d
  t = t === undefined ? ',' : t

  let n = num
  const s = n < 0 ? '-' : ''
  n = Math.abs(Number(n)) || 0
  const i = String(parseInt(n.toFixed(c)))
  let j = i.length
  if (i.length > 3) {
    j = j % 3
  } else {
    j = 0
  }

  return (
    s +
    (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c
      ? d +
        Math.abs(n - parseInt(i))
          .toFixed(c)
          .slice(2)
      : '')
  )
}
const numberToAlphabet = (val: string, tail = ''): string => {
  const newVal = parseInt(val)
  if (newVal <= 26) {
    return `${String.fromCharCode(newVal + 64)}${tail}`.toLowerCase()
  }

  const remainder = newVal % 26 || 26
  const division = String(Math.trunc(newVal / 26) - (remainder === 26 ? 1 : 0))

  return numberToAlphabet(division, `${String.fromCharCode(remainder + 64)}${tail}`.toLowerCase())
}

const isNumeric = (value: any): boolean => {
  if (!value) return false
  return /^-?\d+$/.test(value)
}

// exports.formatCurrency = formatCurrency
// exports.numberToAlphabet = numberToAlphabet
// exports.isNumeric = isNumeric

export { formatCurrency, numberToAlphabet, isNumeric }
