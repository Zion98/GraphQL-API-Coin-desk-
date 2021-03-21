"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const request = supertest_1.default(app_1.default);
describe("GraphQL TEST", () => {
    it("Returns Amount for BUY", done => {
        request
            .post("/graphql")
            .send({
            query: 'query {calculatePrice(type: "buy", margin: 0.2, exchangeRate: 450) { currentPrice, currency } }'
        })
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.data.calculatePrice).toHaveProperty("currentPrice");
            expect(res.body.data.calculatePrice).toHaveProperty("currency");
            done();
        });
    });
    it("Returns Amount for SELL", done => {
        request
            .post("/graphql")
            .send({
            query: '{calculatePrice(type: "sell", margin: 0.2, exchangeRate: 450) { currentPrice, currency} }'
        })
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.data.calculatePrice).toHaveProperty("currentPrice");
            expect(res.body.data.calculatePrice).toHaveProperty("currency");
            done();
        });
    });
});
