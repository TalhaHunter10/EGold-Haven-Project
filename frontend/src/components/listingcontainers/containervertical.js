import './container.css'

const ContainerVertical  = () => {
    return (
        <div className="pl-2 pr-2 containertext cursor-pointer mt-1 pb-10">
            <div class=" w-80 transform overflow-hidden rounded-lg bg-stone-600 text-stone-200  duration-300 hover:scale-105">
                <img class="h-48 w-full object-cover object-center md:h-48" src="./images/cover1.jpg" alt="Item" />
                <div class="p-4">
                    <p class="mr-2 font-extrabold text-right "><span className='border-b-2 border-yellow-600'>Rs. 200,000</span></p>
                    <h2 class="mb-2 text-lg font-semibold mt-1 ">22 karat Gold Necklace</h2>
                    <p class="mb-2 font-medium ">Category - <span className='font-extrabold border-b-2 border-yellow-600'>Necklace</span></p>
                    <div className="flex-auto flex space-x-2 mt-4">
                        <img alt="location" src="./images/location.png" className='w-4 h-4 mt-1'></img>
                        <p className=''>
                            Shah Khalid, Rawalpindi
                        </p>
                    </div>


                    <div class="flex justify-between mt-4">
                    <div className="flex-auto flex space-x-2">
                        <img alt="time" src="./images/time.png" className='w-3 h-3 mt-1'></img>
                        <p className=''>
                            2 days ago
                        </p>
                    </div>
                        <img alt="favorite" src="./images/favoriteblank.png" className='w-7 h-7 hover:scale-110 duration-200 transform'></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContainerVertical;