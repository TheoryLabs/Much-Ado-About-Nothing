import muchAdoAboutNothing from './'
// const muchAdoAboutNothing = require('./')


(async () => {
  try {
    await console.log(muchAdoAboutNothing())
    await muchAdoAboutNothing
  }
  catch(err) {
    console.error(err)
    throw err
  }
})()
