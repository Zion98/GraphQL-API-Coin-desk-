"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// let args ={
// type: "BUY",
// margin: 2.0,
// exchangeRate: "USD"
// }
const getPrice = async (args) => {
    let type = args.type, margin = args.margin, exchangeRate = args.exchangeRate.toLowerCase(), newPrice;
    if (type.toLowerCase() != "sell" && type.toLowerCase() != "buy") {
        throw "invalid type sent (type can only buy or sell)";
    }
    else {
        return new Promise((resolve, reject) => {
            return axios_1.default({
                method: "GET",
                url: "https://api.coindesk.com/v1/bpi/currentprice/USD.json",
                headers: {
                    Accept: "Application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                res;
                if (res && res.error) {
                    reject("invalid type sent (type can only be buy or sell");
                }
                else {
                    //   console.log(   res.data["bpi"]["USD"] )
                    const payload = res.data["bpi"]["USD"];
                    if (type.toLowerCase() == "sell") {
                        newPrice = payload.rate_float - ((margin / 100) * payload.rate_float);
                        newPrice *= 411;
                    }
                    else if (type.toLowerCase() == "buy") {
                        newPrice = payload.rate_float + ((margin / 100) * payload.rate_float);
                        // newPrice
                        newPrice *= 411;
                        newPrice;
                    }
                    return resolve({
                        price: newPrice,
                        currency: "NGN",
                        type: type.toUpperCase()
                    });
                }
            });
        });
    }
};
exports.default = getPrice;
// getPrice()
// import unirest from "unirest";
// // Get Price Function
// const getPrice = async args => {
//   var type = args.type,
//     margin = args.margin,
//     exchangeRate = args.exchangeRate.toLowerCase(),
//     newPrice;
//   if (type.toLowerCase() != "sell" && type.toLowerCase() != "buy") {
//     throw "invalid type sent (type can only be buy or sell)";
//   } else {
//     return new Promise((resolve, reject) => {
//       unirest
//         .get("https://api.coindesk.com/v1/bpi/currentprice/USD.json")
//         .headers({
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         })
//         .end(async resp => {
//           if (resp && resp.error) {
//             return reject("invalid type sent (type can only be buy or sell)");
//           } else {
//             payload = JSON.parse(resp.body)["bpi"]["USD"];
//             if (type.toLowerCase() == "sell") {
//               newPrice = payload.rate_float - margin * payload.rate_float;
//             } else if (type.toLowerCase() == "buy") {
//               newPrice = payload.rate_float + margin * payload.rate_float;
//             }
//             return resolve({
//               price: newPrice,
//               currency: "NGN",
//               type: type.toUpperCase()
//             });
//           }
//         });
//     });
//   }
// };
// export default{
//   getPrice
// };
