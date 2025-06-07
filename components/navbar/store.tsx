import { ShoppingBag } from "lucide-react";

function Store() {
    return (
        <div className="ml-2">
            <ShoppingBag className="cursor-pointer hover:fill-neutral-500 duration-300" width={18} fill="#11111"/>
        </div>
    );
}

export default Store;