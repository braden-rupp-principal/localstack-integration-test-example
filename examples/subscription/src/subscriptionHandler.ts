import { SNSEvent } from "aws-lambda";
import { exchangeRateRepository } from "./dynamo/exchangeRateRepository";

export const handler = async (event: SNSEvent) => {

    const message = event.Records[0].Sns.Message;
    const { currency: excahngeRateKey, exchangeRate } = JSON.parse(message);

    await exchangeRateRepository.insert(excahngeRateKey, +exchangeRate);
}