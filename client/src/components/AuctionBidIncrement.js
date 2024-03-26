const calculateBidIncrement = (highest_bid) => {
  let bidIncrement;

  if (highest_bid < 1) {
    bidIncrement = 0.05;
  } else if (highest_bid < 5) {
    bidIncrement = 0.2;
  } else if (highest_bid < 15) {
    bidIncrement = 0.5;
  } else if (highest_bid < 60) {
    bidIncrement = 1;
  } else if (highest_bid < 150) {
    bidIncrement = 2;
  } else if (highest_bid < 300) {
    bidIncrement = 5;
  } else if (highest_bid < 600) {
    bidIncrement = 10;
  } else if (highest_bid < 1500) {
    bidIncrement = 20;
  } else if (highest_bid < 3000) {
    bidIncrement = 50;
  } else {
    bidIncrement = 100;
  }

  return bidIncrement;
};

export default calculateBidIncrement;
