import React from 'react';
import './landing.css'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { TEInput, TERipple } from "tw-elements-react";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between mt-5">
        <div className='  mb-12 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 p-10'>
          <h1 className='headingtextlanding text-stone-200 text-center mb-6'>Have something to <span className='text-yellow-600'>SELL</span>?</h1>
          <p className='bodytextlanding text-stone-200 text-justify mb-6'>Got something special to sell? <span className='text-yellow-600'>EGold Haven</span> makes it easy! Sell your gold items at EGold Haven. List your treasures, set prices, and connect with eager buyers effortlessly. Join now and turn your gold into cash with simplicity and convenience.</p>
          <div className='text-center mt-8'>
            <button
              type="button"
              className=" inline-block rounded bg-warning-600 text-semibold px-16 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
              Start Selling
            </button>
          </div>
        </div>
        <div className='mb-12 md:mb-0 md:w-9/12 lg:w-6/12 xl:w-6/12 p-10'>
          <h1 className='headingtextlanding text-stone-200 text-center mb-6'>Professional Jewelers, <span className='text-yellow-600'>Join Us</span></h1>
          <p className='bodytextlanding text-stone-200 text-justify mb-6'>Attention jewelers! Join <span className='text-yellow-600'>EGold Haven</span> to showcase your gold creations. Earn commissions for certifying items, and manage your own store page to feature your unique designs. Let your craft shine, and start shaping gold elegance today!</p>
          <div className='text-center mt-8'>
            <button
              type="button"
              className=" inline-block rounded bg-warning-600 px-16 pb-2.5 pt-3 text-sm text-semibold font-medium uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
              Join Platform
            </button>
          </div>
        </div>
      </div>


      <div className='text-center mt-5 md:pl-32 md:pr-32'>
        <h1 className='headingtextlanding text-stone-200 mb-10'>Explore all kinds of Jewelry on <span className='text-yellow-600'>EGold Haven</span></h1>
        <div className='Searchbarsarea flex h-full flex-wrap items-center justify-center lg:justify-between '>

          <div className='sb1 w-32 md:w-96 md:shrink-0 basis-1/3'>
            <div className="relative flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative shrink-0 m-0 -mr-0.5 block h-12 w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-stone-200 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-yellow-600 focus:text-stone-200 focus:shadow-[inset_0_0_0_1px_rgb(202,138,4)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="City"
                aria-label="Search"
                aria-describedby="button-addon1" />



            </div>
          </div>
          <div className="sb2 w-32 md:w-96 md:shrink-0 basis-2/3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative m-0 -mr-0.5 h-12 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-stone-200 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-yellow-600 focus:text-stone-200 focus:shadow-[inset_0_0_0_1px_rgb(202,138,4)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search necklaces, bridal sets and more ..."
                aria-label="Search"
                aria-describedby="button-addon1" />

              <button
                className="relative z-[2] flex items-center rounded-r bg-warning-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black hover:text-white shadow-md transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-lg focus:bg-warning-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-lg hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)]"
                type="button"
                id="button-addon1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd" />
                </svg>
              </button>

            </div>
          </div>
        </div>
      </div>


      <div className='categoriesarea mt-20'> 
        <h1>Categories</h1>
      </div>


    </div>
  );
};

export default Landing;