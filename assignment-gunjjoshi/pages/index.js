import Link from 'next/link';
import '../app/globals.css';

const IndexPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold mb-4">Welcome to My App</h1>
            <Link href="/form">
                <p className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                    Go to Form
                </p>
            </Link>
        </div>
    );
};

export default IndexPage;
