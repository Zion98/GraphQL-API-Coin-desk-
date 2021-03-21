import axios from "axios";

const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";

const convertRate = async (args: {
  type: any;
  margin: any;
  exchangeRate: any;
}) => {
  try {
    let type = args.type;
    let margin = args.margin;
    let exchangeRate = args.exchangeRate;
    let realTimePrice: number = 0;

    const resolver = await axios({
      method: "GET",
      url: apiUrl,
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    });

    const payload = resolver.data["bpi"]["USD"];

    if (type.toUpperCase().trim() == "SELL") {
      realTimePrice = payload.rate_float - (margin / 100) * payload.rate_float;
      realTimePrice *= exchangeRate;
    } else if (type.toUpperCase().trim() == "BUY") {
      realTimePrice = payload.rate_float + (margin / 100) * payload.rate_float;
      realTimePrice *= exchangeRate;
    } else {
      throw new Error("Your Arguments for type can either be buy or sell");
    }
    return {
      currentPrice: realTimePrice,
      currency: "NGN",
    };
  } catch (e) {
    return e.message;
  }
};

export default convertRate;
