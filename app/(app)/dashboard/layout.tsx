import NavDashboard from "@/components/Dashboard/NavDashboard";

function AppLayout({children }: { children: React.ReactNode }) {
    return (
		<main className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
			<NavDashboard />
			<article className="w-full md:w-4/5 p-4 md:p-10 overflow-x-auto text-neutral-800">
				{children}
			</article>
		</main>
	);
}

export default AppLayout;