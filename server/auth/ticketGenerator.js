const generateUniqueCsTicket = () => {
  // Generate a random string for the csticket
  const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let csticket = "";
  for (let i = 0; i < 10; i++) {
      csticket += characters.charAt(
          Math.floor(Math.random() * characters.length)
      );
  }
  return csticket;
};

module.exports = generateUniqueCsTicket;