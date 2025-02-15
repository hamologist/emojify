import EmojiRecord from 'emojilib';
import Fastify from 'fastify';
import { z } from 'zod';

type Response = {
  output: string;
};

const env = z.object({
  HOST: z.string(),
  PORT: z.coerce.number(),
}).parse(process.env);

const fastify = Fastify({
  logger: true
});

for (const [emoji, keywords] of Object.entries(EmojiRecord)) {
  for (const keyword of keywords) {
    if (keyword.search(/flag/) !== -1) {
      delete EmojiRecord[emoji];
      continue;
    }
  }
}

const emojis = Object.keys(EmojiRecord);

const payloadSchema = z.object({
  input: z.string().max(2000),
});

function emojifier(message: string): string {
    const seperated = message.split(' ');
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

    return seperated.join(' ');
}

fastify.post('/', async (request) => {
  const payload = payloadSchema.parse(request.body);

  return {
    output: emojifier(payload.input),
  } satisfies Response;
});

try {
  await fastify.listen({ host: env.HOST, port: env.PORT })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
