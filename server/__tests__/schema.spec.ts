import app from '../app'; 
import supertest from 'supertest';
const request = supertest(app)


describe("GraphQL TEST", () => {
    it("Returns Amount for BUY", done => {
      request
        .post("/graphql")
        .send({
          query:
            'query {calculatePrice(type: "buy", margin: 0.2, exchangeRate: 450) { currentPrice, currency } }'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res.body.data.calculatePrice).toHaveProperty("currentPrice");
          expect(res.body.data.calculatePrice).toHaveProperty("currency");
  
          done();
        });
    });
  
    it("Returns Amount for SELL", done => {
      request
        .post("/graphql")
        .send({
          query:
            '{calculatePrice(type: "sell", margin: 0.2, exchangeRate: 450) { currentPrice, currency} }'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          expect(res.body.data.calculatePrice).toHaveProperty("currentPrice");
          expect(res.body.data.calculatePrice).toHaveProperty("currency");
  
          done();
        });
    });
  });