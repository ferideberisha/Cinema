// import React, { useState, useEffect } from "react";
// import apiConfig from "../../api/apiConfig";

// const CastList = ({ movieId }) => {
//   const [casts, setCasts] = useState([]);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     console.log("Fetching cast list for movie ID:", movieId);
//     const getCredits = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=65ef3d7c21044c8268020ff5731427a9`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           const castList = data.cast || [];
//           console.log("Cast List Data:", castList); // Add this line for debugging
//           setCasts(castList.slice(0, 5));
//         } else {
//           setError(true);
//         }
//       } catch (error) {
//         console.log(error);
//         setError(true);
//       }
//     };

//     console.log("Movie ID:", movieId);
//     getCredits();
//   }, [movieId]);

//   return (
//     <div className="casts">
//       {error ? (
//         <p>Error loading cast list</p>
//       ) : (
//         casts.map((item, i) => (
//           <div key={i} className="casts__item">
//             {item.profile_path ? (
//               <div
//                 className="casts__item__img"
//                 style={{
//                   backgroundImage: `url(${apiConfig.w500Image(
//                     item.profile_path
//                   )}
//                   )`,
//                 }}
//               ></div>
//             ) : (
//               <div className="casts__item__img--unavailable">No Image</div>
//             )}
//             <p className="casts__item__name">{item.name}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CastList;
