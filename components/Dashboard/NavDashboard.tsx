'use client';

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/superbase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import { useGroupedCategories} from "@/hooks/useGroupedCategories";
import Link from "next/link";
import { CategoryWithSub } from "@/types/CategoryWithSub";

function NavDashboard() {
	const [email, setEmail] = useState<string | null>(null);
	const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { data: categories, loading } = useGroupedCategories();

	useEffect(() => {
		const storedEmail = localStorage.getItem("email");
		if (storedEmail) setEmail(storedEmail);
	}, []);

	const handleLogout = async () => {
		await supabaseBrowser.auth.signOut();
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		router.push("/login");
	};

	const handleCategoryClick = (id: string, name: string) => {
		setExpandedCategoryId(expandedCategoryId === id ? null : id);
		router.push(`/dashboard?category=${encodeURIComponent(name)}`);
		setOpen(false);
	};

	const handleSubcategoryClick = (catName: string, subName: string) => {
		router.push(`/dashboard?category=${encodeURIComponent(catName)}&subcategory=${encodeURIComponent(subName)}`);
		setOpen(false);
	};

	return (
		<>
			{/* Botón flotante menú móvil */}
			<button
				onClick={() => setOpen(true)}
				className={`fixed bottom-20 right-5 z-50 sm:hidden bg-neutral-200 rounded-full px-4 py-2 flex justify-center items-center shadow-2xl ${open ? 'hidden' : ''}`}
			>
				<Image src="/img/wireless.webp" alt="wireless" width={35} height={35} />
				<p className="font-semibold text-sm text-neutral-700 ml-2">Menú</p>
			</button>

			{/* Sidebar móvil */}
			<aside className={`md:hidden fixed w-full sm:static min-h-screen inset-y-0 left-0 z-40 bg-white flex-col transition-all duration-300 transform ${open ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0 sm:w-1/6`}>
				<div onClick={() => setOpen(false)} className="flex items-center justify-center sm:h-24 h-16 m-6">
					<Image src="/img/wireless.webp" alt="wireless" width={35} height={35} />
					<p className="ml-2 font-semibold text-neutral-700 text-sm">Wireless.Ar</p>
				</div>

				<button
					aria-label="Cerrar"
					onClick={() => setOpen(false)}
					className="md:hidden cursor-pointer absolute right-3 top-3 text-5xl leading-none text-neutral-700 hover:text-gray-600"
				>
					×
				</button>

				<div className="w-full px-4 text-neutral-700">
					<button
						className="w-full text-left px-2 py-2 hover:bg-neutral-400"
						onClick={() => {
							setExpandedCategoryId(null);
							router.push("/dashboard");
							setOpen(false);
						}}
					>
						<p className="text-xs">Todos</p>
					</button>
					{!loading && categories?.map((cat: CategoryWithSub) => (
						<div key={cat.id}>
							<button
								className="w-full text-left px-2 py-2 hover:bg-neutral-400 cursor-pointer font-medium"
								onClick={() => handleCategoryClick(String(cat.id), cat.name)}
							>
								<p className="text-xs">{cat.name}</p>
							</button>
							{expandedCategoryId === String(cat.id) && cat.subcategories.map((sub: { id: string | number; name: string }) => (
								<button
									key={sub.id}
									className="w-full text-left pl-6 pr-2 py-2 text-sm hover:bg-neutral-400 text-neutral-600"
									onClick={() => handleSubcategoryClick(String(cat.name), sub.name)}
								>
									<p className="text-xs">{sub.name}</p>
								</button>
							))}
						</div>
					))}
					<div className="flex flex-col mt-4">
						<Link href="/banners" className="text-xs w-full px-2 py-2 hover:bg-neutral-300 cursor-pointer">Banners</Link>
						<Link href="/carrousels" className="text-xs w-full px-2 py-2 hover:bg-neutral-300 cursor-pointer">Carrousels</Link>
						<Link href="/categories" className="text-xs w-full px-2 py-2 hover:bg-neutral-300 cursor-pointer">Categorias</Link>
						<Link href="/order" className="text-xs w-full px-2 py-2 hover:bg-neutral-300 cursor-pointer">Orden Home</Link>
					</div>
				</div>

				<div className="flex flex-col justify-center items-center mt-auto mb-4 px-4 text-neutral-800">
					<div className="flex items-center">
						<UserCircle width={20} height={20} />
						<p className="text-xs ml-1">{email}</p>
					</div>
					<button
						onClick={handleLogout}
						className="text-xs underline mt-1 font-semibold hover:font-bold"
					>
						Cerrar sesión
					</button>
				</div>
			</aside>

			{/* Sidebar escritorio */}
			<article className="hidden w-1/6 min-h-screen text-neutral-800 shadow-md md:flex flex-col items-center overflow-y-auto">
				<div className="mt-10 flex justify-center items-center">
					<Image src="/img/wireless.webp" alt="wireless" width={35} height={35} />
					<p className="font-semibold text-xs ml-2">Wireless.Ar</p>
				</div>

				<div className="my-10 w-full">
					<button
						className="w-full text-left px-6 py-2 hover:bg-neutral-300 cursor-pointer"
						onClick={() => {
							setExpandedCategoryId(null);
							router.push("/dashboard");
						}}
					>
						<p className="text-xs">Todos</p>
					</button>
					{!loading && categories?.map((cat: CategoryWithSub) => (
						<div key={cat.id}>
							<button
								className="w-full text-left px-6 py-2 hover:bg-neutral-300 font-medium cursor-pointer"
								onClick={() => handleCategoryClick(String(cat.id), cat.name)}
							>
								<p className="text-xs">{cat.name}</p>
							</button>
							{expandedCategoryId === String(cat.id) && cat.subcategories.map((sub: { id: string | number; name: string }) => (
								<button
									key={sub.id}
									className="w-full text-left pl-10 pr-6 py-2 text-sm hover:bg-neutral-300 cursor-pointer"
									onClick={() => handleSubcategoryClick(String(cat.name),sub.name)}
								>
									<p className="text-xs">{sub.name}</p>
								</button>
							))}
						</div>
					))}
					<div className="flex flex-col mt-4">
						<Link href="/banners" className="text-xs w-full px-6 py-2 hover:bg-neutral-300 cursor-pointer">Banners</Link>
						<Link href="/carrousels" className="text-xs w-full px-6 py-2 hover:bg-neutral-300 cursor-pointer">Carrousels</Link>
						<Link href="/categories" className="text-xs w-full px-6 py-2 hover:bg-neutral-300 cursor-pointer">Categorias</Link>
						<Link href="/order" className="text-xs w-full px-6 py-2 hover:bg-neutral-300 cursor-pointer">Orden Home</Link>
					</div>
				</div>

				<div className="flex flex-col justify-center items-center mt-auto mb-4">
					<div className="flex items-center">
						<UserCircle width={20} height={20} />
						<p className="text-xs ml-1">{email}</p>
					</div>
					<button
						onClick={handleLogout}
						className="text-xs underline mt-1 font-semibold hover:font-bold"
					>
						Cerrar sesión
					</button>
				</div>
			</article>
		</>
	);
}

export default NavDashboard;
