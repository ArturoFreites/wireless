import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./navbarLinks";
import { NAVLINKS } from "../services/navbar";
import Store from "./store";
import Advertisements from "../home/advertisements";

function NavBar() {
    return (
        <nav className="fixed top-0 w-full z-50 shadow-md">
            <Advertisements />
            <div className="bg-white h-14 px-10 flex items-center justify-between w-full">
                <div className="w-1/8">
                    <Link href={"/"} className="h-full w-fit flex items-center hover:scale-95 duration-300">
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
                </div>
                <NavBarLinks links={NAVLINKS} />
                <Store />
            </div>
        </nav>
    );
}


export default NavBar;