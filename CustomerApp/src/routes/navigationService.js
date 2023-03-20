let navObj = null

function setGlobalRef(ref) {
  navObj = ref
}

function navigate(path, props = {}) {
  navObj.navigate(path, props)
}

function goBack() {
  navObj.goBack()
}

function currentRoute() {
  if (navObj !== null && typeof navObj !== 'undefined') {
    return navObj.getCurrentRoute()
  } else {
    return null
  }
}
export default {
  currentRoute,
  setGlobalRef,
  navigate,
  goBack
}
