import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ExchangeRateKey, exchangeRateRepository } from "./dynamo/exchangeRateRepository";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const { currency } = event.pathParameters;
    const { to, amount } = event.queryStringParameters;

    const exchangeRate = await exchangeRateRepository.getExchangeRate(`${currency}-${to}` as ExchangeRateKey);

    const convertedAmount = exchangeRate * Number(amount);

    return {
        statusCode: 200,
        body: formatCurrency(to, convertedAmount)
    };
}

const formatCurrency = (currency, convertedAmount) => currency === 'USD' ? '$' + convertedAmount : convertedAmount + 'fr';
