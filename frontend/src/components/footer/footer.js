import './footer.css'
import React from 'react';
import { Link } from 'react-router-dom';
import "tw-elements-react/dist/css/tw-elements-react.min.css";

const Footer = () => {

    return (
        <footer className="bg-transparent-100 text-center text-stone-200 dark:bg-transparent-600 dark:text-white-200 lg:text-left footer" >
            <div
                className="flex items-center justify-center border-b-2 border-yellow-600 p-6 dark:border-#926f34-500 lg:justify-between">
                <div className="mr-12 hidden lg:block ftext">
                    <span>Get connected with us on social networks:</span>
                </div>
                {/* <!-- Social network icons container --> */}
                <div className="flex justify-center">
                    <a className="mr-6 text-stone-200 dark:text-stone-200 iconactive" href='#'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                        </svg>
                    </a>
                    <a className="mr-6 text-stone-200 dark:text-stone-200 iconactive" href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                        </svg>
                    </a>
                    <a className="mr-6 text-stone-200 dark:text-stone-200 iconactive" href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                        </svg>
                    </a>
                    <a className="mr-6 text-stone-200 dark:text-stone-200 iconactive" href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                    </a>

                </div>
            </div>

            {/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* <!-- TW Elements section --> */}
                    <div className="">
                        <div className="logo-container mb-4">
                            <img src='/images/EGHLogomini.png' alt='logo' className='footerlogo'></img>
                        </div>
                        <p className='text-justify ftext'>
                            Explore, buy, and sell with confidence at EGold Haven – Your ultimate marketplace for authentic gold jewelry.
                            <br /><br />
                            Our gold certification process through authorized dealers on the platform ensures that <span className='text-yellow-600'>EGold Haven</span> is your trusted destination for timeless gold jewelry.
                        </p>
                    </div>
                    {/* <!-- Products section --> */}
                    <div className="md:ml-20 sm:ml-0">
                        <h6
                            className="mb-2 flex justify-center font-semibold uppercase md:justify-start fheading">
                            All Categories
                        </h6>
                        <p className="mb-2 ftext">
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Rings</a>
                        </p>
                        <p className="mb-2 ftext">
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Earrings</a>
                        </p>
                        <p className="mb-2 ftext">
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Necklaces</a>
                        </p>
                        <p className='mb-2 ftext'>
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Chains</a>
                        </p>
                        <p className='mb-2 ftext'>
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Bracelets</a>
                        </p>
                        <p className='mb-2 ftext'>
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Bangles</a>
                        </p>
                        <p className='mb-2 ftext'>
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Anklets</a>
                        </p>
                        <p className='mb-2 ftext'>
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Pendants</a>
                        </p>
                        <p className='mb-2 ftext'>
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Bridal Sets</a>
                        </p>
                        <p className='mb-2 ftext'>
                            <a className="text-stone-200 dark:text-neutral-200 active"
                                href='#'>Coins & Bars</a>
                        </p>
                    </div>
                    {/* <!-- Useful links section --> */}
                    <div className="md:ml-10 sm:ml-0">

                        <h6
                            className=" mb-5 flex justify-center font-semibold uppercase md:justify-start fheading">
                            Useful links

                        </h6>

                        <p className="mb-5 ftext">
                            <Link className="text-stone-200 dark:text-neutral-200 active"
                                to='/'>Home</Link>
                        </p>
                        <p className="mb-5 ftext">
                            <Link className="text-stone-200 dark:text-neutral-200 active"
                                to='/listings'>Listings</Link>
                        </p>
                        <p className="mb-5 ftext">
                            <Link className="text-stone-200 dark:text-neutral-200 active"
                                to='/products'>Products</Link>
                        </p>
                        <p className="mb-5 ftext">
                            <Link className="text-stone-200 dark:text-neutral-200 active"
                                to='/forum'>Forum</Link>
                        </p>
                        <p className="mb-5 ftext">
                            <Link className="text-stone-200 dark:text-neutral-200 active"
                                to='/faq'>FAQ's</Link>
                        </p>
                        <p className='mb-5 ftext'>
                            <Link className="text-stone-200 dark:text-neutral-200 active"
                                to="/privacypolicy" target='_blank'>Privacy Policy</Link>
                        </p>
                    </div>
                    {/* <!-- Contact section --> */}
                    <div>
                        <h6
                            className="mb-4 flex justify-center font-semibold uppercase md:justify-start fheading">
                            Contact
                        </h6>
                        <p className="mb-4 flex items-center justify-center md:justify-start ftext">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-3 h-5 w-5">
                                <path
                                    d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path
                                    d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                            Egoldhaven@gmail.com
                        </p>
                        <p className="mb-4 flex items-center justify-center md:justify-start ftext">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="mr-3 h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                    clipRule="evenodd" />
                            </svg>
                            + 92 319 5256589
                        </p>

                    </div>
                </div>
            </div>

            {/* <!--Copyright section--> */}
            <div className=" p-6 text-center dark:bg-neutral-700">
                <span>© 2024 Copyright : </span>
                <Link
                    className="ftext text-yellow-600"
                    to="/">EGold Haven</Link>
            </div>
        </footer>
    );
}

export default Footer;