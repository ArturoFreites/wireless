import { MapPin } from "lucide-react";

function AddressFooter() {
    return (
        <div className="text-neutral-800 flex flex-col justify-center items-center
            md:w-1/2 md:items-end md:pr-20
            ">
            <div className="flex mb-4 w-48">
                <MapPin />
                <p className="ml-1 text-sm">Belgrano, CABA</p>
            </div>
            <div className="flex w-48">
                <MapPin />
                <p className="ml-1 text-sm">La Costa, Buenos Aires</p>
            </div>
        </div>
    );
}

export default AddressFooter;