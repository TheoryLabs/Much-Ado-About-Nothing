module.exports = (str = `Much ado about a whole lotta nuthin\` - TheoryLabs (https://TheoryLabs.dev)`) => {
  if (typeof str !== "string") throw new TypeError("Expected argument given be typeof 'string'. Recieved: ${typeof str}");
  let _s = str.toUpperCase();
  console.log(_s)
  return _s
};
