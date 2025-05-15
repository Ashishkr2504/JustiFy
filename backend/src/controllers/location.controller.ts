// import { Request, Response } from 'express';
// import { searchNearby } from '../utils/mapmyindia';

// export const getNearbyLegalServices = async (req: Request, res: Response) => {
//   const { lat, lng } = req.query;

//   if (!lat || !lng) return res.status(400).json({ message: 'Latitude and longitude required' });

//   try {
//     const places = await searchNearby(Number(lat), Number(lng));
//     res.status(200).json({ places });
//   } catch (error) {
//     console.error('Error in fetching nearby legal services:', error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };
