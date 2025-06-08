
import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./navbarLinks";
import { NAVLINKS } from "../services/navbar";
import Store from "./store";
import Advertisements from "../home/advertisements";
import NavbarMobile from "./navbarMobile";

function NavBar() {

    return (
        <nav className="fixed top-0 w-full z-50 shadow-md">
            <Advertisements />
            <div className="bg-white h-fit px-10 flex items-center justify-between w-full flex-col md:flex-row">
                <div className="w-full flex items-center justify-center h-full md:w-1/8 m-4">
                    <Link href={"/"} className="h-full w-5/6 flex justify-center items-center hover:scale-95 duration-300">
                        <Image
                            src={"/img/wireless.webp"}
                            alt="wireless"
                            width={35}
                            height={35}
                        />
                        <p className="pl-1 text-sm text-neutral-700">
                            Wireless.Ar
                        </p>
                    </Link>
                    <NavbarMobile/>
                </div>
                <NavBarLinks links={NAVLINKS} hidden={true} />
                <div className="hidden md:flex justify-center items-center p-4">
                    <Store />
                </div>
            </div>
        </nav>
    );
}


export default NavBar;