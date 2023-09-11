function isValidEmailAddress(address) {
  return !!address.match(/.+@.+/);
}

export { isValidEmailAddress };
