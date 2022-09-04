import Image from "next/image"
import Link from "next/link"

function Header() {
    return (
        <nav className="w-full bg-white shadow-md">
            <div className="h-max mx-2 xs:mx-5 sm:mx-8 py-4 px-2 sm:p-4 flex justify-between items-center">
                <Link href="/">
                    <a>
                        <div className="flex items-center w-4/5 sm:w-auto">
                            <Image
                                data-testid="logo__image"
                                src="https://in.admybrand.com/assets/svg/web_logo.svg"
                                height={50}
                                width={200}
                                alt="logo"
                            />
                            <h2
                                data-testid="logo__text"
                                className="text-2xl hidden md:inline font-medium text-gray-700 mb-1.5 ml-3"
                            >
                                Coding Challenge</h2>
                        </div>
                    </a>
                </Link>
                <div className="sm:mr-5 mb-1">
                    <div
                        className="p-1 xs:p-2 flex space-x-3 xs:space-x-4 sm:space-x-6"
                        data-testid="social__icons"
                    >
                        <i className="fa-brands fa-github social__icon"></i>
                        <i className="fa-brands fa-linkedin social__icon"></i>
                        <i className="fa-solid fa-envelope social__icon"></i>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header