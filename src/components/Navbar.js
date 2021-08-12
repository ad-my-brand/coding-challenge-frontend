import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div className="bg-gray-900 text-white px-2">
                <div className="mx-auto container flex justify-between ">
                    <h1 className="text-xl md:text-2xl font-semibold py-2"><code>Location Finder</code></h1>
                    <nav className="flex items-center">
                        <ul className="flex space-x-6 items-center pr-4">
                            <Link to="/"><li className="hover:text-gray-500"><code>Home</code></li></Link>
                        </ul>
                    </nav>
                </div>
                {/* <hr className="border-gray-200 my-2"/> */}
            </div>
        )
    }
}
