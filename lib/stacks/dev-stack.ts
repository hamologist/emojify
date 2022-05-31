import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Emojify } from '../emojify';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class DevStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const emojify = new Emojify(this, 'Emojify', {
            stageOptions: {
                stageName: 'dev'
            }
        });

        new ssm.StringParameter(this, 'DiscordHandlerARNStringParameter', {
            parameterName: '/emojify/dev/discord-handler-arn',
            stringValue: emojify.discordWebsocketHandler.functionArn,
        });
    }
}
