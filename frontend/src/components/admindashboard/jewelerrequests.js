import { useNavigate } from "react-router-dom";
import { getJewelerRequests } from "../../services/adminservice";
import { useState } from "react";


const JewelerTable = ({ jewelers }) => {

    const handleAccept = (jewelerId, user) => {
        // Implement accept logic here
        console.log('Accepted jeweler with ID:', jewelerId, 'for user:', user);
      };
    
      const handleReject = (jewelerId, user) => {
        // Implement reject logic here
        console.log('Rejected jeweler with ID:', jewelerId, 'for user:', user);
      };

    return (
        
            <div className="overflow-x-auto">
              <table className="min-w-full border border-danger-600">
                <thead>
                  <tr className="bg-stone-200 text-neutral-900">
                    <th className="border border-danger-600 px-4 py-2">Serial No.</th>
                    <th className="border border-danger-600 px-4 py-2">CNIC No.</th>
                    <th className="border border-danger-600 px-4 py-2">Phone No.</th>
                    <th className="border border-danger-600 px-4 py-2">Store Name</th>
                    <th className="border border-danger-600 px-4 py-2">Commission Rate</th>
                    <th className="border border-danger-600 px-4 py-2">Shop/Store No.</th>
                    <th className="border border-danger-600 px-4 py-2">Address</th>
                    <th className="border border-danger-600 px-4 py-2">City</th>
                    <th className="border border-danger-600 px-4 py-2 w-32">CNIC Images</th>
                    <th className="border border-danger-600 px-4 py-2">Cover Image</th>
                    <th className="border border-danger-600 px-4 py-2">Store Images</th>
                  </tr>
                </thead>
                
                  {jewelers.map((jeweler, index) => (
                    <tbody>
                    <tr key={jeweler._id} className="text-neutral-900">
                      <td className="border border-danger-600 px-4 py-2">{index + 1}</td>
                      <td className="border border-danger-600 px-4 py-2">{jeweler.cnicno}</td>
                      <td className="border border-danger-600 px-4 py-2">{jeweler.phoneno}</td>
                      <td className="border border-danger-600 px-4 py-2">{jeweler.storename}</td>
                      <td className="border border-danger-600 px-4 py-2">{jeweler.commissionrate}</td>
                      <td className="border border-danger-600 px-4 py-2">{jeweler.shopno}</td>
                      <td className="border border-danger-600 px-4 py-2">{jeweler.address}</td>
                      <td className="border border-danger-600 px-4 py-2">{jeweler.city}</td>
                      <td className="border border-danger-600 px-4 py-2 w-32">
                        <div className="flex flex-wrap">
                          {jeweler.cnicimages.map((image, index) => (
                            <img key={index} src={`http://localhost:5000/${image.filePath}`} alt={`CNIC Image ${index}`} className="w-24 h-auto mr-2 mb-2" />
                          ))}
                        </div>
                      </td>
                      <td className="border border-danger-600 px-4 py-2">
                        <img src={`http://localhost:5000/${jeweler.coverimage[0].filePath}`} alt="Cover" className="max-w-full h-auto" />
                      </td>
                      <td className="border border-danger-600 px-4 py-2">
                        <div className="flex flex-wrap">
                          {jeweler.storeimages.map((image, index) => (
                            <img key={index} src={`http://localhost:5000/${image.filePath}`} alt={`Store Image ${index}`} className="w-24 h-auto mr-2 mb-2" />
                          ))}
                        </div>
                      </td>
                    </tr>
                    <tr className="">
                        <td colSpan={12} className="text-center">
                    <button onClick={() => handleAccept(jeweler._id, jeweler.user)} className="bg-green-500 text-lg text-white px-10 py-1 rounded m-5 transform duration-300 hover:scale-110" >Accept</button>
                        <button onClick={() => handleReject(jeweler._id, jeweler.user)} className="bg-red-500 text-lg text-white px-10 py-1 rounded m-5 transform duration-300 hover:scale-110">Reject</button>
                        </td>
                    </tr>
                    </tbody>
                  ))}
              </table>
            </div>
    );
  };



const JewelerRequests = () => {

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


    const fetchdata = async () =>{
        try {
            const data = await getJewelerRequests();
            setJewelers(data); 
        } catch (error) {
            
        }
    }

    const dashboard = () => {

        navigate('/home')
    }

    return(
        <div>
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
                <JewelerTable jewelers={jewelers} />
                </div>
        </div>
    )
}

export default JewelerRequests;