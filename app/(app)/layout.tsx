'use client';

import Feedback from "@/components/Feedback";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50">
			{children}
			<Feedback/>
		</main>
	);
}
