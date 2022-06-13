import type * as express from 'express';
import pino from 'pino';
import { handlePubSubMessage } from '../common';
import { gcpLogOptions } from '../pino-config';
import { PubSubConfig, PubSubHandler } from '../types';

export interface PubSubCloudFunctionsConfig
  extends Omit<PubSubConfig, 'handler' | 'path'> {
  logger?: pino.LoggerOptions;
}

export type CloudFunctionFun = (
  req: express.Request,
  res: express.Response,
) => Promise<void>;

export function createPubSubCloudFunctions<T = unknown>(
  handler: PubSubHandler<T>,
  options: PubSubCloudFunctionsConfig = {},
): CloudFunctionFun {
  const { parseJson, onError, logger } = options;
  return async (req, res): Promise<void> => {
    try {
      await handlePubSubMessage({
        message: req.body.message,
        handler,
        context: req.body,
        parseJson,
        log: pino(gcpLogOptions(logger)),
      });

      res.status(200).send();
    } catch (error) {
      if (onError) {
        await onError(error);
        res.status(200).send();
      } else throw error;
    }
  };
}
