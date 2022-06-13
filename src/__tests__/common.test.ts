import { handlePubSubMessage } from '../common';
import jsf from 'json-schema-faker';
import { PubSubMessage, PubSubMessageType } from '../types';
import pino from 'pino';

function createPubSubdata(input: unknown, stringify = true): PubSubMessageType {
  const message = jsf.generate(PubSubMessage) as PubSubMessageType;
  const data = Buffer.from(
    stringify ? JSON.stringify(input) : (input as string),
  ).toString('base64');
  return {
    ...message,
    data,
  };
}

describe('common', () => {
  it('should handle simple PubSub messages', async () => {
    const message = createPubSubdata('hello-world', false);
    const handler = jest.fn();

    await handlePubSubMessage({
      message,
      handler,
      parseJson: false,
      log: pino(),
    });
    expect(handler).toHaveBeenCalledWith({ message, data: 'hello-world' });
  });
  it('should handle JSON PubSub messages', async () => {
    const message = createPubSubdata({ name: 'Simen' });
    const handler = jest.fn();

    await handlePubSubMessage({
      message,
      handler,
      parseJson: true,
      log: pino(),
    });
    expect(handler).toHaveBeenCalledWith({ message, data: { name: 'Simen' } });
  });

  it('should pass context', async () => {
    const message = createPubSubdata('');
    const handler = jest.fn();

    await handlePubSubMessage({
      message,
      handler,
      context: { hello: 'there' },
      log: pino(),
    });
    expect(handler).toHaveBeenCalledWith({
      message,
      data: '',
      context: { hello: 'there' },
      log: pino(),
    });
  });
});
