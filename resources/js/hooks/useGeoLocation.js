import React from 'react'

export default function useGeoLocation() {
    const [location, setLocation] = React.useState({
        loaded: false,
        coordinates: {lat:"",lng:""}
    })

    const onSuccess = location =>{
        setLocation({
            loaded: true,
            coordinates: {lat:location.latitude,lng:location.longitude}
        })
    }

    const onError = error =>{
        setLocation({
            loaded: true,
            error
        })
    }

    React.useEffect(()=>{
        if(!("geolocation" in navigator))
        {
            onError({
                code:0,
                message:"Geolocation is not supported",
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },[])
    return location;
}
