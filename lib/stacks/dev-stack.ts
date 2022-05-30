import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Emojify } from '../emojify';

export class DevStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        new Emojify(this, 'Emojify', {
            stageOptions: {
                stageName: 'dev'
            }
        });
    }
}
