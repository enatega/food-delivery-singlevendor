export function normalizeTrackingOptions(options) {
  if (!options) {
    return null
  }

  const { usernameOrEmail, ...rest } = options

  if (usernameOrEmail) {
    if (usernameOrEmail.includes('@')) {
      rest.email = usernameOrEmail
    } else {
      rest.username = usernameOrEmail
    }
  }

  return rest
}
