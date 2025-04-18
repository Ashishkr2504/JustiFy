import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Type declaration to access `req.user`
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
