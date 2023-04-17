const DistanceAndDuration= async (origin, destination) =>{

        let obj = {
           distance: "",
           duration: "",

         };
         const service = new window.google.maps.DistanceMatrixService();
         await service.getDistanceMatrix(
           {
             origins: [origin],
             destinations: [destination],
             travelMode: 'DRIVING',
             unitSystem: window.google.maps.UnitSystem.METRIC,
             avoidHighways: false,
             avoidTolls: false,
           },
            (response, status) => {
             if (status === 'OK') {
               obj.distance = response.rows[0].elements[0].distance.value;
               obj.duration = response.rows[0].elements[0].duration.value;
  
             } else {
               console.error(`Error: ${status}`);
             }
           }
         );
       
          return obj;
       }
  
export default DistanceAndDuration;
 