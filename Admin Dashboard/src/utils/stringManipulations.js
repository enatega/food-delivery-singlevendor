/*
 * Transform string by adding newline after x spaces
 * parameter: String, Number
 * return: String
 */
const transformToNewline = (input, spaces = 3) => {
  var spaceCount = 0
  var result = []
  var splittedSesc = input.split('')
  for (let i = 0; i < splittedSesc.length; i++) {
    result.push(splittedSesc[i])
    if (splittedSesc[i] === ' ') {
      ++spaceCount
      if (spaceCount % spaces === 0 && spaceCount !== 0) {
        result.push('\n')
      }
    }
  }
  return result.join('')
}

export { transformToNewline }
