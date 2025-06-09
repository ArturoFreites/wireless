import NavDashboard from "@/components/dashboard/navDashboard";

function PageDashboard() {
    return (
        <section className="flex w-full">
            <NavDashboard/>
            <article className="w-5/6 text-neutral-800 p-10">
                <h1 className="font-bold">Listado</h1>
            </article>
        </section>
    );
}

export default PageDashboard;