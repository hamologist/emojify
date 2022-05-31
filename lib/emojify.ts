import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export interface EmojfiyProps {
  stageOptions?: apigateway.StageOptions,
}

export class Emojify extends Construct {
  public readonly restHandler: lambda.Function;
  public readonly discordWebsocketHandler: lambda.Function;
  public readonly restApi: apigateway.RestApi;

  constructor(scope: Construct, id: string, props: EmojfiyProps) {
    super(scope, id);

    this.restApi = new apigateway.RestApi(this, 'EmojifyRestApi', {
      defaultCorsPreflightOptions: {
        allowMethods: [
          'OPTIONS',
          'POST'
        ],
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      },
      deployOptions: props.stageOptions,
    });

    this.restHandler = new lambda.Function(this, 'EmojifyRestHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('src/emojify', { exclude: ['*.ts'] }),
      handler: 'rest-handler.handler',
      memorySize: 256,
    });

    this.discordWebsocketHandler = new lambda.Function(this, 'EmojifyDiscordWebsocketHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('src/emojify', { exclude: ['*.ts'] }),
      handler: 'discord-websocket-handler.handler',
      memorySize: 256,
    });

    const emojifyResource = this.restApi.root.addResource('emojify');
    emojifyResource.addMethod(
        'POST',
        new apigateway.LambdaIntegration(this.restHandler),
    );
  }
}
