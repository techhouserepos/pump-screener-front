import type { NextApiRequest, NextApiResponse } from 'next';
import apiTokenMiddleware from './api_token';

export type Handle = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export default function secureHandler(handle: Handle) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (apiTokenMiddleware(req)) {
      await handle(req, res);
    } else {
      res.status(403).end();
    }
  };
}
