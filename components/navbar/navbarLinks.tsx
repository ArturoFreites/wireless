import { NavLink } from "@/types/navbar";


type Props = {
    links: NavLink[]
}


function NavBarLinks({ links }: Props) {
    return (
        <div className="flex justify-center items-center text-neutral-600
            w-6/8
        ">
            {
                links.map(
                    (link) => (
                        <p key={link.id}
                            className="text-xs p-2 font-semibold 
                                cursor-pointer hover:text-neutral-950 duration-300
                            "
                        >
                            {link.name}
                        </p>
                    )
                )
            }
        </div>
    );
}

export default NavBarLinks;