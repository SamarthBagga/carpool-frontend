import {  useParams } from "react-router-dom"
import { getRideDetails } from "../services/auth/rideApis";
import { useEffect, useState } from "react";
import { RequestBar } from "../components/RequestBar";
import { EditRideCard } from "../components/EditRideCard";
import { RideDetailsCard } from "../components/RideDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { setRideDetails } from "../store/slices/dataSlice";
export const HostRide = () => {
    const {id} = useParams();
    const ride = useSelector((store)=>store.dataSlice.rideDetails);
    const dispatcher = useDispatch();
    const [editActive,setEdit] = useState(false);
    console.log(id);
    useEffect(()=>{
        (async()=>{
            dispatcher(setRideDetails((await getRideDetails(id).then((value)=>value.rideDetails))));
        })()
    },[id])
    console.log(ride);
    // const {averageRating,totalRatings} = ride?.host?.ratingStats;
    return (<div className="w-screen hideScrollBars overflow-scroll flex-1 backdrop-blur py-5">
                <div className="w-[90%] backdrop-blur mx-auto overflow-hidden rounded-3xl border-[1px] border-white">
            {ride && <div className="flex max-md:flex-col bg-[rgba(255,255,255,0.4)] ">
                        {editActive?<EditRideCard setEdit={setEdit} ride={ride}/>:<RideDetailsCard setEdit={setEdit} ride={ride}/>}
                        <div className="w-[80%] max-md:w-full max-md:border-t-white max-md:border-t-[1px] max-md:border-l-0 border-l-white border-l-[1px]">{ride.requests.length > 0 ?
                          <div className={""}>{ride?.requests.map((request, i) => {
                              return (<RequestBar key={i} request={request}/>)
                          })}</div>
                        :<div className="text-center max-md:h-[10vh]  h-full w-full justify-center items-center flex">No requests made to this ride</div>}
                        </div>
                    </div>
                }
            </div>
    </div>)
}

// {
//     "_id": "65df19b4cbf70ed1d138a9ea",
//     "host": "65df192ccbf70ed1d138a9e6",
//     "from": "Delhi, India",
//     "to": "Jaipur, Rajasthan, India",
//     "capacity": 50,
//     "date": "2024-02-28",
//     "description": "lets go",
//     "requests": [
//         {
//             "_id": "65df19cccbf70ed1d138a9f3",
//             "passenger": {
//                 "ratingStats": {
//                     "totalRatings": 0,
//                     "averageRating": null
//                 },
//                 "_id": "65df192ccbf70ed1d138a9e6",
//                 "firstName": "admin",
//                 "lastName": "admin",
//                 "password": "$2b$11$SeP5BjPkStrNbxoSSNlRJOVk1IAnfNSkzn5Qnp2YBiQ47Ba4f5hAO",
//                 "email": "admin@muj.manipal.edu",
//                 "verifiedEmail": true,
//                 "createdAt": "2024-02-28T11:29:48.299Z",
//                 "updatedAt": "2024-02-28T11:29:48.299Z",
//                 "__v": 0
//             },
//             "ride": "65df19b4cbf70ed1d138a9ea",
//             "status": "pending",
//             "createdAt": "2024-02-28T11:32:28.921Z",
//             "updatedAt": "2024-02-28T11:32:28.921Z",
//             "__v": 0
//         }
//     ],
//     "createdAt": "2024-02-28T11:32:04.465Z",
//     "updatedAt": "2024-02-28T11:32:29.060Z",
//     "__v": 1
// }