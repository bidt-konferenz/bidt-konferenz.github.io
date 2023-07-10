handsfree = new Handsfree({hands: true})
handsfree.start()

// From anywhere
handsfree.data.hands.landmarks

// From inside a plugin
handsfree.use('logger', data => {
  if (!data.hands) return

  // Show a log whenever the left hand is visible
  if (data.hands.landmarksVisible[0]) {
    console.log(data.hands.landmarks[0])
  }
})

// From an event
document.addEventListener('handsfree-data', event => {
  const data = event.detail
  if (!data.hands) return

  // Show a log whenever the right hand for person #2 is visible
  if (data.hands.landmarksVisible[3]) {
    console.log(data.hands.landmarks[3])
  }
})