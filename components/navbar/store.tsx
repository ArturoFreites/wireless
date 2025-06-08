import { ShoppingBag } from "lucide-react";

function Store() {
    return (
        <div className="
            flex m-4
            md:ml-2 cursor-pointer hover:scale-95 duration-300
        ">
            <ShoppingBag width={20} fill="#11111"/>
            <div className="bg-primary rounded-full px-2 text-xs
                flex justify-center items-center
            ">
                <p className=" text-white font-semibold">
                    3
                </p>
            </div>
        </div>
    );
}

export default Store;