import {useEffect, useState} from "react";
import { searchRidesApi } from '../services/auth/rideApis';
import { useDispatch } from "react-redux";
import { setSerchedRides } from "../store/slices/dataSlice";
import { useNavigate } from "react-router-dom";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import GoogleMapsAutocomplete from "../components/GoogleMapsAutocomplete.jsx";

export const SearchRide = () => {
  const dispatcher = useDispatch();
  const navigator = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
  });

  const [rideResults, setRideResults] = useState([]);

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = await searchRidesApi(searchData.from, searchData.to, searchData.date);
    const data = await searchRidesApi(from, to, date);
    dispatcher(setSerchedRides(data.rides));
    navigator("/ride-details")
    // if (data && data.rides) {
    //   setRideResults(data.rides);
    // } else {
    //   setRideResults([]);
    // }
  };
  // useEffect(() => {
  //
  //   var searchInput = 'search_input';
  //   var searchOutput = 'search_output';
  //
  //   var autocomplete_out;
  //   var autocomplete_in;
  //   $(document).ready(function () {
  //     autocomplete_in = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
  //       types: ['geocode'],
  //
  //     });
  //
  //     google.maps.event.addListener(autocomplete_in, 'place_changed', function () {
  //       var near_place = autocomplete_in.getPlace();
  //     });
  //   });
  //
  //   $(document).ready(function () {
  //     autocomplete_out = new google.maps.places.Autocomplete((document.getElementById(searchOutput)), {
  //       types: ['geocode'],
  //
  //     });
  //
  //     google.maps.event.addListener(autocomplete_out, 'place_changed', function () {
  //       var near_place = autocomplete_out.getPlace();
  //     });
  //   });
  //   return ()=>{
  //     google?.maps?.event.removeListener(autocomplete_out);
  //     google?.maps?.event.removeListener(autocomplete_in);
  //   }
  // }, []);
  return (
    <div className=" overflow-scroll hideScrollBars py-8 backdrop-blur flex-1 max-h-screen h-fit ">
      <div className={"flex items-center justify-center h-full"}>
      <div className="bg-white p-8 rounded-lg shadow-md w-fit sm:w-96 h-fit">
        <h2 className="text-2xl font-semibold mb-4">Search for a ride</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="from" className="block text-sm font-medium text-gray-600">
              From
            </label>
            {/* <input
              type="text"
              id="from"
              name="from"
              value={searchData.from}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-200 rounded-md"
              placeholder="Enter starting point"
            /> */}
            {/*<label>Enter sfkdsjflksf Starting Location</label>*/}
            {/*<input type="text" className="form-control" id="search_input" placeholder="Type address..."/>*/}
            {/*<ReactGoogleAutocomplete*/}
            {/*  className="w-full border border-gray-200 rounded-md mt-1 p-2"*/}
            {/*  apiKey="AIzaSyAC0nozW7irImOmfyCwDi5VPPoAlM65K10"*/}
            {/*  placeholder="Enter starting location"*/}
            {/*  onPlaceSelected={(places) => {*/}
            {/*    console.log(places);*/}
            {/*    setFrom(places.formatted_address)*/}
            {/*  }}*/}
            {/*/>*/}
            <GoogleMapsAutocomplete changeHandler={setFrom} placeholder={"Enter starting location"}/>
          </div>

          <div className="mb-4">
            <label htmlFor="to" className="block text-sm font-medium text-gray-600">
            To
            </label>
            {/* <input
              type="text"
              id="to"
              name="to"
              value={searchData.to}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-200 rounded-md"
              placeholder="Enter destination"
            /> */}
            {/*<ReactGoogleAutocomplete*/}
            {/*  className="w-full border border-gray-200 rounded-md mt-1 p-2"*/}
            {/*  apiKey="AIzaSyAC0nozW7irImOmfyCwDi5VPPoAlM65K10"*/}
            {/*  placeholder="Enter destination"*/}
            {/*  onPlaceSelected={(places) => { console.log(places); setTo(places.formatted_address) }}*/}
            {/*/>*/}
            <GoogleMapsAutocomplete changeHandler={setTo} placeholder={"Enter destination"}/>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-600">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-200 rounded-md"
              placeholder="Enter date"
            />
          </div>

          <button
            type="submit"
            className="bg-orange text-slate-100 p-2 rounded-md w-full hover:bg-orange-600 transition duration-300"
          >
            Search
          </button>
        </form>
        {/* {rideResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Search Results</h3>
            <ul>
              {rideResults.map((ride, index) => (
                <li key={index} className="mb-2"> 
                  <p>{ride.from}</p>
                  <p>{ride.to}</p>
                  <p>{ride.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )} */}


      </div>
      </div>
    </div>
  )
}