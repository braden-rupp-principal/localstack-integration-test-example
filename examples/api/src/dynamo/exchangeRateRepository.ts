import { DynamoDB } from 'aws-sdk';

const TABLE_NAME = 'ExchangeRateTable';
const LOCALSTACK_HOSTNAME = process.env.LOCALSTACK_HOSTNAME || 'localhost'
const dynamo = new DynamoDB.DocumentClient({
    region: 'us-east-2',
    endpoint: `http://${LOCALSTACK_HOSTNAME}:4566`
});

export type ExchangeRateKey = 'CHF-USD' | 'USD-CHF';

export default class ExchangeRateRepository {

    async scan() {
        return await dynamo.scan({ TableName: TABLE_NAME }).promise();
    }

    async insert(exchange: 'CHF-USD' | 'USD-CHF', rate: number) {
        const result = await dynamo.put({
            TableName: TABLE_NAME,
            Item: { id: exchange, rate: rate.toString() }
        }).promise();
        return result;
    }

    async delete(exchange: 'CHF-USD' | 'USD-CHF') {
        return await dynamo.delete({ TableName: TABLE_NAME, Key: { id: exchange } }).promise();
    }

    async getExchangeRate(exchange: string): Promise<number> {
        const result = await dynamo.get({ TableName: TABLE_NAME, Key: { id: exchange } }).promise();
        return +result.Item.rate;
    }

};

export const exchangeRateRepository = new ExchangeRateRepository();

