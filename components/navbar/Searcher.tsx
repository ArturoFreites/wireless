'use client'

import { Search } from "lucide-react";
import { useState } from "react";

function Searcher() {

    const [open,setOpen] = useState(false)
    return (
        <div className="flex rounded-md">
            <Search onClick={()=>setOpen(!open)} width={18}  className="text-neutral-900
                hover:text-neutral-400 cursor-pointer
            "/>
            <input className={`
            ${!open && "hidden"} duration-300
            bg-neutral-200 rounded-md ml-2 pl-2 text-neutral-900 text-xs
            `}
            >
            </input>
        </div>
    );
}

export default Searcher;