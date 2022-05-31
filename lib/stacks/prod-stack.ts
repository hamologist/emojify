import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Emojify } from '../emojify';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';

export class ProdStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const emojify = new Emojify(this, 'Emojify', {});
        const rootDomain = ssm.StringParameter.valueFromLookup(this, '/emojify/prod/root-domain');
        const certificate = certificatemanager.Certificate.fromCertificateArn(
            this,
            'Certificate',
            ssm.StringParameter.valueForStringParameter(this, '/emojify/prod/certificate-arn'),
        );
        const zone = route53.HostedZone.fromLookup(this, 'BaseZone', {
            domainName: rootDomain,
        });
        emojify.restApi.addDomainName('DomainName', {
            domainName: `emojify.${rootDomain}`,
            certificate,
        });
        new route53.ARecord(this, 'ApiDNS', {
            zone,
            recordName: 'emojify',
            target: route53.RecordTarget.fromAlias(
                new route53Targets.ApiGateway(emojify.restApi),
            ),
        });

        new ssm.StringParameter(this, 'DiscordHandlerARNStringParameter', {
            parameterName: '/emojify/prod/discord-handler-arn',
            stringValue: emojify.discordWebsocketHandler.functionArn,
        });
    }
}
