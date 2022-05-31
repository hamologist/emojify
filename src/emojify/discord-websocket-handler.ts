import { emojifier } from './emojifier';
import axios from 'axios';

interface Data {
    id: string;
    name: string;
    options: Array<{
        name: string;
        value: string;
    }>;
}

export interface VerifiedInteraction {
    data: Data
    type: number;
    token: string;
    applicationId: string;
}

export const handler = async (interaction: VerifiedInteraction): Promise<void> => {
    try {
        const emojified = emojifier(interaction.data.options[0].value);

        await axios.patch(
            `https://discord.com/api/v8/webhooks/${interaction.applicationId}/${interaction.token}/messages/@original`,
            { content: emojified }
        );
    } catch (error) {
        console.error("Discord emojification failed", error);
        await axios.delete(
            `https://discord.com/api/v8/webhooks/${interaction.applicationId}/${interaction.token}/messages/@original`
        );
        await axios.post(
            `https://discord.com/api/v8/webhooks/${interaction.applicationId}/${interaction.token}`,
            { content: 'Emojification failed', flag: 1<<6 },
        );
    }
}
