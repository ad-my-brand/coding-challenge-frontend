import Link from 'next/link';
import React from 'react';

const Navbar = () => {
	return (
		<nav className="flex p-4 px-10 text-lg gap-6">
			<Link href="/">Home</Link>
			<Link href="/form">Form</Link>
		</nav>
	);
};

export default Navbar;
