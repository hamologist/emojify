import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { isRequestPayload, RequestPayload } from './models/request-payload';
import { emojifier } from './emojifier';

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

    return {
        statusCode: 200,
        body: emojifier(payload.message),
    };
}
