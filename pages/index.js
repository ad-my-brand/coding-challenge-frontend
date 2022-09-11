import Link from 'next/link';

export default function Home() {
	return (
		<div className="p-8">
			<main className="mx-auto flex flex-col p-6 bg-white rounded-lg shadow-xl">
				<h2 className="font-bold text-2xl mb-6">Welcome</h2>
				<p className="my-2">
					👇 You&apos;re probably here for the users form
				</p>
				<Link className="hover:border-blue-400" href="/form">
					Check out the user details form
				</Link>
			</main>
		</div>
	);
}
