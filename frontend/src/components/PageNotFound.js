import { Link } from "react-router-dom";



const PageNotFound = () => {
    return(
        <div className=" md:h-[600px] text-stone-200 text-center alluse p-36">

            <p className="text-8xl pb-5 text-danger-600">404</p>
            <p className="text-6xl pb-10">Page Not Found</p>

            <Link
              to='/'
              className=" inline-block rounded bg-warning-600 text-bold px-16 pb-2.5 pt-3 text-base font-large uppercase leading-normal text-stone-900 hover:text-white  transition duration-150 ease-in-out hover:bg-yellow-600 hover:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(202,138,4,0.3),0_4px_18px_0_rgba(202,138,4,0.2)] focus:outline-none focus:ring-0 active:bg-yellow-600">
              Home Page
            </Link>

        </div>
    );
}

export default PageNotFound;