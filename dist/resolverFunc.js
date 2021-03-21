"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const convertRate = async (args) => {
    try {
        let type = args.type;
        let margin = args.margin;
        let exchangeRate = args.exchangeRate;
        let realTimePrice = 0;
        const resolver = await axios_1.default({
            method: "GET",
            url: "https://api.coindesk.com/v1/bpi/currentprice/USD.json",
            headers: {
                Accept: "Application/json",
                "Content-Type": "application/json",
            },
        });
        const payload = resolver.data["bpi"]["USD"];
        if (type.toUpperCase().trim() == "SELL") {
            realTimePrice = payload.rate_float - (margin / 100) * payload.rate_float;
            realTimePrice *= exchangeRate;
        }
        else if (type.toUpperCase().trim() == "BUY") {
            realTimePrice = payload.rate_float + (margin / 100) * payload.rate_float;
            realTimePrice *= exchangeRate;
        }
        else {
            throw new Error("Your Arguments for type can either be buy or sell");
        }
        return {
            currentPrice: realTimePrice,
            currency: "NGN",
        };
    }
    catch (e) {
        return e.message;
        throw new Error("Enter the correct Arguments");
    }
};
exports.default = convertRate;
