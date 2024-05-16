
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import ModalDynamic from '../modaldynamic';

const Forum = () => {

    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const [open, setOpen] = useState(true)

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(search)
    }



    return (
        <div className='pb-20'>

            <ModalDynamic isOpen={open} onClose={() => setOpen(false)}>
                <div className='m-auto bg-gradient-to-br from-slate-300 to-yellow-200 p-5'>
                <div className='rounded-lg text-center sm:w-3/4 m-auto'>
                    <div className=' min-[150px]:text-3xl md:text-5xl alluse pb-1'> Welcome to <span className='text-yellow-600'>EGold Haven</span> Forum </div>
                    <div className='border-b-2 border-yellow-600 m-auto w-2/4  mb-3'></div>

                    <div className=' md:text-2xl allusebody min-[150px]:text-lg'><span className='md:text-3xl'>Before engaging in discussions, we kindly ask all members to adhere to our community guidelines.</span>
                        <br />
                        <ul className='list-disc text-justify m-10 space-y-2 font-semibold'>
                            <li>Ensure that all posts and replies are written in simple English to facilitate effective communication. </li>
                            <li>Maintain a respectful and courteous tone towards fellow members; constructive discussions are encouraged, while any form of harassment or disrespectful behavior will not be tolerated.</li>
                            <li>Prioritize authenticity in your contributions by sharing only accurate and genuine information. Be mindful of privacy concerns and refrain from sharing personal information publicly. </li>
                            <li>Avoid posting any content that may be considered offensive, inappropriate, or harmful. This includes but is not limited to spam, hate speech, or any form of discrimination.</li>
                        </ul>
                        
                        <span className='md:text-3xl'><b>Thank you</b> for being a part of the <b>EGold Haven community!</b> Let's foster meaningful discussions and share valuable insights together.</span>
                    </div>
                </div>
                </div>
            </ModalDynamic>

            <form onSubmit={handleSearch}>
                <div className='md:flex md:flex-wrap md:justify-between min-[150px]:text-center mt-10'>

                    <div className='text-stone-200 min-[150px]:text-4xl md:text-5xl min-[150px]:text-center md:text-left md:pl-8 alluse mb-8 '> Forum </div>

                    <div className='min-[150px]:w-80 md:w-1/2 md:mt-3 mb-5 min-[150px]:mx-auto md:mx-0'>
                        <input className="m-auto min-[150px]:w-80 w-full h-10 block  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-stone-200 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-yellow-600 focus:text-stone-200 focus:shadow-[inset_0_0_0_1px_rgb(202,138,4)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                            type="text" name="search" value={search} onChange={handleSearchChange} placeholder="Search Posts, discussions etc." />

                    </div>

                </div>
            </form>


            <div className='bg-neutral-900 rounded-lg text-center min-[150px]:py-1 md:py-3 px-3'>

                <div className='flex flex-wrap justify-between mt-5'>
                    <div className='text-stone-200 min-[150px]:text-3xl md:text-4xl min-[150px]:text-center md:text-left md:pl-8 alluse '> Posts </div>
                    {isLoggedIn ?
                    <div className='flex flex-wrap space-x-1'>
                        <button className='bg-danger-600 text-neutral-900 rounded-lg h-10 min-[150px]:w-28 md:w-48 hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto' onClick={() => { }}>Create Post</button>
                        <button className='bg-yellow-600 text-neutral-900 rounded-lg h-10 min-[150px]:w-28 md:w-48 hover:text-stone-200 duration-300 hover:scale-105 alluse font-semibold md:mr-5 mb-2 my-auto' onClick={() => { }}>My Posts</button>
                        
</div>
                        : <div></div>}
                </div>



                <div className='flex flex-wrap justify-between pr-2 pb-0 space-y-3 mt-3'>

                    <div className='text-stone-200 md:text-2xl allusebody min-[150px]:text-lg md:pl-8'>Search for "{search !== '' ? `${search}` : 'All'}"</div>
                    {posts.length > 0 && isFetched ? <div className='allusebody text-lg font-bold text-stone-300'>{posts.length} Results Found</div> : <div></div>}

                </div>

            </div>

        </div>
    );
}

export default Forum;