import { NextApiHandler } from 'next';

const test: NextApiHandler = (req, res) => {
  res.json({ ok: 1 });
};

export default test;
