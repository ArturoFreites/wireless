import AddressFooter from "./Footer/AddressFooter";
import SocialMediaFooter from "./Footer/SocialMediaFooter";
import EmailIcon from "./Icon/EmailIcon";

function Footer() {
    return (
        <footer className="bg-neutral-50 pt-10">
            <div className="w-full md:flex">
                <SocialMediaFooter/>
                <AddressFooter/>
            </div>
            <div className="flex text-neutral-600 items-center justify-center py-4 font-medium text-xs">
                <EmailIcon width={20} height={20}/>
                <p className="ml-2">
                    wirelesstech.ar@gmail.com
                </p>
            </div>
            <div className="flex flex-col text-neutral-800 items-center pt-12 pb-6 font-semibold text-xs">
                <p>
                    © 2024 Wireless.Ar. All rights reserved.
                </p>
            </div>
            <div className="h-2 bg-red-500 
            bg-gradient-to-b
            from-[#ED5AA3] from-[0%]
            to-[#8BACE5]  to-[50%]
            ">
            </div>
        </footer>
    );
}

export default Footer;