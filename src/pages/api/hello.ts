import type { NextApiRequest, NextApiResponse } from "next";

const hello = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req);
  res.status(200).json({ message: "Hello World" });
};

export default hello;
