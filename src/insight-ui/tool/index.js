export const getScreenHeight = theHeight => {
  if (!theHeight) {
    theHeight = 0
  }
  return window.innerHeight + theHeight + 15
}
