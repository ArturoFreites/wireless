import Link from "next/link";
import InstagramIcon from "../Icon/InstagramIcon";
import TikTokIcon from "../Icon/TikTokIcon";

function SocialMediaFooter() {
    return (
        <div className="w-full flex flex-col items-center mb-8 md:w-1/2
            md:items-baseline md:ml-20
        "
        >
            <p className="text-neutral-800 font-semibold">Nuestas Redes</p>
            <div className="flex gap-4">
                <Link href={"https://www.instagram.com/wireless.ar/"} target="_blank" rel="noreferrer" className="mt-3 mb-6">
                    <InstagramIcon width={30} height={30} className="cursor-pointer hover:fill-primary duration-300" />
                </Link>
                <Link href={"https://www.tiktok.com/@wireless.ar"} target="_blank" rel="noreferrer" className="mt-3 mb-6">
                    <TikTokIcon width={30} height={30} className="cursor-pointer hover:fill-primary duration-300" />
                </Link>
            </div>
        </div>
    );
}

export default SocialMediaFooter;