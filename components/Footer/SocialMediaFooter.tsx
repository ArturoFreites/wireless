import Link from "next/link";
import InstagramIcon from "../Icon/InstagramIcon";

function SocialMediaFooter() {
    return (
        <div className="w-full flex flex-col items-center mb-8 md:w-1/2
            md:items-baseline md:ml-20
        "
        >
            <p className="text-neutral-800 font-semibold">Nuestas Redes</p>
            <Link href={"https://www.instagram.com/wireless.ar/"} className="mt-3 mb-6">
                <InstagramIcon width={30} height={30} className="cursor-pointer hover:fill-primary duration-300"/>
            </Link>
        </div>
    );
}

export default SocialMediaFooter;