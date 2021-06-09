module.exports = (str = `much ado about a wholleeeeee lotta nuthin\``) => {
  if (typeof str !== "string") throw new TypeError("Expected argument given be typeof 'string'. Recieved: ${typeof str}");
  return str.replace(/\s/g, "");
};
