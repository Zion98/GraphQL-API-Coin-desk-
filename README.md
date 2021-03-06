# GraphQL-API-Coin-desk-


A GraphQL API with one query. The query calculatePrice will accept three required arguments:
	
- `type`: This can either be buy or sell, nothing else.
- `margin`: This is a percentage that will be used in a calculation. Not a fraction, a percentage. For example, if 0.2 is passed into this argument, then the calculation should be done with 0.2%.
- `exchangeRate`: This is a custom USD/NGN exchange rate that will be used in the calculation detailed below.


### The calculation:
  When calculatePrice is called, your API must make a request to [Coindesk's API](https://www.coindesk.com/coindesk-api) to retrieve the current price of Bitcoin in USD.
  If the type is sell, then your API should subtract the computed value of the margin percentage from the current Bitcoin price it just retrieved.
	If the type is buy, then your API should add the computed value of the margin percentage to the current Bitcoin price it just retrieved.
	Finally, the number calculatePrice responds will be in NGN and not USD. This should be calculated using the exchangeRate argument.


Sample of Query:

  query calculatePrice{
     calculatePrice(type:"buy", margin:34, exchangeRate:435){
        currentPrice
        currency
    }
  }


