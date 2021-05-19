import axios from 'axios';
import { exchangeRateRepository } from '../../subscription/src/dynamo/exchangeRateRepository';
import { getLambdaEndpointRoot } from './helper';

let endpoint;
beforeAll(async () => endpoint = await getLambdaEndpointRoot());

test('should return USD to CHF amount when exchangeRate is 2', async () => {

    await exchangeRateRepository.insert('USD-CHF', 2);

    const response = await axios.get(endpoint + 'convert/USD?amount=10&to=CHF');

    expect(response.data).toEqual('20fr');
});

test('should return CHF to USD amount when exchange rate is .5', async () => {

    await exchangeRateRepository.insert('CHF-USD', .5);

    const response = await axios.get(endpoint + 'convert/CHF?amount=10&to=USD');

    expect(response.data).toEqual('$5');
});
