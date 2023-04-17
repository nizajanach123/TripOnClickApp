const findNearesAttraction = async (origin, destinations) => {

    let obj = {
        minDistanceAddressIndex: 0,
        distance: 0,
        duration: 0
    };
    const service = new window.google.maps.DistanceMatrixService();
    await service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: destinations,
            travelMode: 'DRIVING',
            unitSystem: window.google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
        },
        (response, status) => {
            if (status === 'OK') {
                const distances = response.rows[0].elements.map(element => element.distance.value);
                const index = distances.indexOf(Math.min(...distances));
                obj.minDistanceAddressIndex = index;
                obj.distance = response.rows[0].elements[index].distance.value;
                obj.duration = response.rows[0].elements[index].duration.value;
            } else {
                console.error(`Error: ${status}`);
            }
        }
    );

    return obj;
}
export default findNearesAttraction;