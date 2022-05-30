import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import emojis from './emojis';
import { isRequestPayload, RequestPayload } from './models/request-payload';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body = event.body;

    if (!body) {
        return {
            statusCode: 400,
            body: 'Empty body provided',
        };
    }

    let payload: RequestPayload;
    try {
        payload = JSON.parse(body);
    } catch (error) {
        console.log("Invalid payload provided");
        return {
            statusCode: 400,
            body: 'Invalid payload provided',
        };
    }

    if (!isRequestPayload(payload)) {
        return {
            statusCode: 400,
            body: 'Payload is missing or has an empty "message" field',
        };
    }

    const seperated = payload.message.split(' ');
    for (let i = 0; i < seperated.length; i ++) {
        const checkOne = Math.floor(Math.random() * 2);
        const checkTwo = Math.floor(Math.random() * 3);

        if (checkOne === 1) {
            for (let emojiCount = Math.floor(Math.random() * 4); emojiCount > 0; emojiCount--) {
                seperated[i] += emojis[Math.floor(Math.random() * emojis.length)];
            }
        } else if (checkTwo === 1) {
            seperated[i] += emojis[Math.floor(Math.random() * emojis.length)];
        }
    }

    return {
        statusCode: 200,
        body: seperated.join(' '),
    };
}
