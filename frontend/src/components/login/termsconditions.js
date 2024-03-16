import { Link } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

const TermsConditions = () => {
    return (
        <div>
            <h1 className="pt-12 mb-8 text-center text-stone-200 alluse text-4xl font-semibold">Terms & Conditions</h1>
            <div className='p-5'>
                <h1 className="text-stone-200 alluse text-2xl mb-1 font-semibold">Acceptance of Terms</h1>
                <p className="text-stone-200 alluse text-justify text-lg mb-8">
                By registering an account on EGold Haven, you agree to abide by these terms and conditions. These terms govern your use of our platform and any services offered therein.
                </p>

                <h1 className="text-stone-200 alluse text-2xl mb-1 font-semibold">User Eligibility</h1>
                <p className="text-stone-200 alluser text-justify text-lg mb-8">
                You must be at least 18 years old to register for an account on EGold Haven. By registering, you confirm that you are of legal age to enter into agreements and that all information provided during registration is accurate and complete.
                </p>


                <h1 className="text-stone-200 alluse text-2xl mb-1 font-semibold">Account Security</h1>
                <p className="text-stone-200 alluser text-justify text-lg mb-8">
                You are responsible for maintaining the security of your account credentials, including your username and password. You agree not to share your account information with anyone else and to notify us immediately of any unauthorized use of your account.
                </p>

                <h1 className="text-stone-200 alluse text-2xl mb-1 font-semibold">User Conduct</h1>
                <p className="text-stone-200 alluser text-justify text-lg mb-8">
                You agree to use EGold Haven in a manner consistent with all applicable laws and regulations. You will not engage in any illegal, abusive, or fraudulent activities on the platform.
                </p>

                <h1 className="text-stone-200 alluse text-2xl mb-1 font-semibold">Privacy Policy</h1>
                <p className="text-stone-200 alluser text-justify text-lg mb-8">
                By registering for an account, you agree to the terms of our Privacy Policy, which outlines how we collect, use, and disclose your personal information. You can review our Privacy Policy
                 <Link to='/privacypolicy' target="_blank" className="text-yellow-600"> here</Link>.
                </p>

                <h1 className="text-stone-200 alluse text-2xl mb-1 font-semibold">Termination of Account</h1>
                <p className="text-stone-200 alluser text-justify text-lg mb-8">
                EGold Haven reserves the right to block your account at any time, with or without cause, and without prior notice. If your account is terminated, you will no longer have access to the platform or any services offered therein.
                </p>

                <h1 className="text-stone-200 alluse text-2xl mb-1 font-semibold">Changes to Terms</h1>
                <p className="text-stone-200 alluser text-justify text-lg mb-8">
                EGold Haven may update or modify these terms and conditions at any time without prior notice. It is your responsibility to review these terms periodically for any changes. Your continued use of the platform after the posting of changes constitutes your acceptance of the updated terms.
                </p>

                
            </div>
        </div>
    );
}

export default TermsConditions;