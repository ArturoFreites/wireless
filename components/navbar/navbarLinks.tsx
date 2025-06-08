import { NavLink } from "@/types/navbar"

type Props = {
    links: NavLink[]
    hidden:boolean
}

function NavBarLinks({ links, hidden}: Props) {
    return (
        <div className={` ${hidden && "hidden"} 
            text-neutral-600  w-full mt-2
            md:flex md:justify-center md:items-center md:w-6/8 md:my-0
        
        `}>
            {links.map((link) => (
                <p
                    key={link.id}
                    className=" text-center md:text-xs p-2 font-semibold cursor-pointer hover:text-neutral-950 duration-300"
                >
                    {link.name}
                </p>
            ))}
        </div>
    )
}

export default NavBarLinks
