"use strict";
// import axios from 'axios';
// let accessToken: string | null = null;
// export const getMapmyIndiaToken = async () => {
//   if (accessToken) return accessToken;
//   const res = await axios.post('https://outpost.mapmyindia.com/api/security/oauth/token', null, {
//     params: {
//       grant_type: 'client_credentials',
//       client_id: process.env.MAPMYINDIA_CLIENT_ID,
//       client_secret: process.env.MAPMYINDIA_CLIENT_SECRET,
//     },
//   });
//   console.log("Access Token fetched:", res.data.access_token);
//   accessToken = res.data.access_token;
//   return accessToken;
// };
// export const searchNearby = async (lat: number, lng: number) => {
//   const token = await getMapmyIndiaToken();
//   console.log("Using Access Token:", token);
//   const res = await axios.get(
//     `https://atlas.mapmyindia.com/api/places/nearby/json?keywords=lawyer,legal&refLocation=${lat},${lng}&radius=3000`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   if (!res.data.suggestedLocations || res.data.suggestedLocations.length === 0) {
//     console.log("No results found for the given location and keywords.");
//     return [];
//   }
//   return res.data.suggestedLocations;
// };
