import { useNavigate } from "react-router-dom";
import { acceptJeweler, getJewelerRequests, rejectJeweler } from "../../services/adminservice";
import { useEffect, useState } from "react";
import { Image } from 'antd';
import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getloginStatus } from "../../services/authservice";


const JewelerTable = ({ jewelers, triggerRefresh}) => {


    const handleAccept = async (userId) => {
        
        try {
            const response = await acceptJeweler(userId);
            triggerRefresh();
        }
        catch (error) {
            console.error('Error:', error);
        }
      };
    
      const handleReject = async (jewelerId, userId) => {
        try {
          const response = await rejectJeweler(jewelerId, userId);
          triggerRefresh();
      }
      catch (error) {
          console.error('Error:', error);
      }
    };
      

    return (
        
      <div className="overflow-x-auto h-screen alluser text-xl">
     {jewelers.map((jeweler, index) => (<table  key={index} className="min-w-full border border-danger-600 border-2 border-stone-200 mt-10 mb-10 bg-zinc-700 rounded-lg">
        <thead>
            <tr className="text-stone-200">
            <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Request Time</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">CNIC No.</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Phone No.</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Store Name</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Commission Rate</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Shop/Store No.</th>
                
                
                
            </tr>
        </thead>
        <tbody>
                
                    <tr className="text-stone-200">
                    <td className="border border-stone-200 px-4 py-2">{new Date(jeweler.createdAt).toLocaleString()}</td>
                        <td className="border border-stone-200 px-4 py-2">{jeweler.cnicno}</td>
                        <td className="border border-stone-200 px-4 py-2">{jeweler.phoneno}</td>
                        <td className="border border-stone-200 px-4 py-2">{jeweler.storename}</td>
                        <td className="border border-stone-200 px-4 py-2">{jeweler.commissionrate}</td>
                        <td className="border border-stone-200 px-4 py-2">{jeweler.shopno}</td>
                        
                    </tr>
                
            
        </tbody>
        <thead>
        <tr className="text-stone-200">
        <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Address</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">City</th>
                <th className="border border-stone-200 px-4 py-2 w-32 bg-zinc-800">CNIC Images</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Cover Image</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Store Images</th>
                <th className="border border-stone-200 px-4 py-2 bg-zinc-800">Actions</th>
            </tr>
        </thead>
        <tbody>
          <tr className="text-stone-200">
          <td className="border border-stone-200 px-4 py-2">{jeweler.address}</td>
          <td className="border border-stone-200 px-4 py-2">{jeweler.city}</td>
                        <td className="border border-stone-200 px-4 py-2 w-32">
                            <div className="flex flex-wrap">
                                {jeweler.cnicimages.map((image, index) => (
                                    <Image width={100} key={index} src={`http://localhost:5000/${image.filePath}`} alt={`CNIC Image ${index}`} className="p-2 border-2 border-yellow-600 rounded-lg m-1"  />
                                ))}
                            </div>
                        </td>
                        <td className="border border-stone-200 px-4 py-2">
                            <Image width={100} src={`http://localhost:5000/${jeweler.coverimage[0].filePath}`} alt="Cover" className="p-2 border-2 border-yellow-600 rounded-lg m-1" />
                        </td>
                        <td className="border border-stone-200 px-4 py-2">
                            <div className="flex flex-wrap">
                                {jeweler.storeimages.map((image, index) => (
                                    <Image width={100} key={index} src={`http://localhost:5000/${image.filePath}`} alt={`Store Image ${index}`} className="p-2 border-2 border-yellow-600 rounded-lg " />
                                ))}
                            </div>
                        </td>
                        <td rowSpan={2} className="border border-stone-200 px-4 py-2">
                            <div className="text-center">
                                <button onClick={() => handleAccept(jeweler.user)} className="bg-green-500 text-lg text-white px-6 py-1 rounded m-1 transform duration-300 hover:scale-110">Accept</button>
                                <button onClick={() => handleReject(jeweler._id, jeweler.user)} className="bg-red-500 text-lg text-white px-6 py-1 rounded m-1 transform duration-300 hover:scale-110">Reject</button>
                            </div>
                        </td>
                    </tr>
        </tbody>
    </table>))}
</div>
    );
  };



const JewelerRequests = () => {

  const[trigger, setTrigger] = useState(false)
  const[isFetched, setIsFetched] = useState(false)
  const isLoggedIn = useSelector(selectIsLoggedIn);

    const navigate = useNavigate();
    const [jewelers, setJewelers] = useState([
        {
          _id: '1',
          user: '23',
          cnicno: '12345-6789101-1',
          phoneno: '123-456-7890',
          storename: 'Sample Store',
          commissionrate: '10%',
          shopno: '123',
          address: '123 Sample Address',
          city: 'Sample City',
          cnicimages: [
            { filePath: '' },
            { filePath: '' }
          ],
          coverimage: [{ filePath: '' }],
          storeimages: [
            { filePath: '' },
            { filePath: '' }
          ]
        },
      ]);

      const triggerRefresh = () => {
        setTrigger(!trigger); // Toggle refresh trigger
    };

    const fetchdata = async () =>{
        try {
            const data = await getJewelerRequests();
            if(data._id){
            setJewelers(data); 
            setIsFetched(true);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const status = await getloginStatus();
                if (!status.verified) {
                    navigate('/home');
                } else {
                    fetchdata();
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
    
        checkLoginStatus();
    }, [trigger]);

    const dashboard = () => {

        navigate('/home')
    }

    return(
        <div className="bg-neutral-900 h-screen">
            <div className='p-10 flex flex-wrap justify-center md:justify-between '>
                    <h1 className='m-5 text-5xl font-medium text-yellow-600 text-center'>Jeweler Requests</h1>
                    <button
                        type="button"
                        onClick={fetchdata}
                        className="m-5 inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                    >
                        Fetch Data
                    </button>

                    <button
                        type="button"
                        onClick={dashboard}
                        className="m-5 inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-lg text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600"
                    >
                        Back to Dashboard
                    </button>
                </div>


                <div className="table-container">
                  {isFetched ? <div><JewelerTable jewelers={jewelers} triggerRefresh={triggerRefresh}/></div> : <div className="text-center text-3xl text-stone-200">Refresh requests / No new Requests Found !!</div>}
                
                  
                </div>
        </div>
    )
}

export default JewelerRequests;