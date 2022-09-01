import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Map from "./Map";

export default function FormControl({ TitleErrorMessage, DescriptionErrorMessage }) {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
        }
        fetchData();
    }, []);

    const [titleIsValid, setTitleIsValid] = useState(true);
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [cords, setCords] = useState([81.1496, -37.3159]);

    const titleValidator = (e) => {
        const { target } = e;

        const lastInput = target.value;
        const lastChar = lastInput.slice(-1);

        if (!((lastChar.charCodeAt() >= 65 && lastChar.charCodeAt() <= 90) ||
            (lastChar.charCodeAt() >= 97 && lastChar.charCodeAt() <= 122) ||
            (lastChar.charCodeAt() >= 48 && lastChar.charCodeAt() <= 57) ||
            (lastChar.charCodeAt() === 8) ||
            (lastChar.charCodeAt() === 32) ||
            (lastChar.charCodeAt() === 38) ||
            (lastChar.charCodeAt() === 44) ||
            (lastChar.charCodeAt() === 45) ||
            (lastChar.charCodeAt() === 58))) {
            target.value = lastInput.slice(0, -1);
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
    }

    const descriptionValidator = (e) => {
        const { target: { value } } = e;
        if (value.length < 6) {
            setDescriptionIsValid(false);
        } else {
            setDescriptionIsValid(true);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formBody = e.target;
        if (!(formBody.title.value && formBody.body.value && formBody.users.value)) {
            return;
        }
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formBody.title.value,
                body: formBody.body.value,
                userId: formBody.users.value
            })
        }).then(response => {
            if (response.ok) {
                toast.success('🦄 Submitted Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                throw new Error('Something went wrong');
            }
        }).catch(err => {
            toast.error('🦄 Error Occured!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        })

    }

    useEffect(() => {
        if (currentUser) {
            const userCordinates = users[parseInt(currentUser) - 1].address.geo;
            setCords([userCordinates.lng, userCordinates.lat]);
        }
    }, [currentUser, users]);

    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="w-full max-w-4xl h-full grid grid-cols-1 place-content-center auto-rows-max gap-3 sm:grid-cols-2 p-4">
                    <div className="h-52 rounded relative border-y border-black sm:h-full">
                        <Map center={cords} />
                    </div>
                    <form className="col-span-1 h-full flex flex-col gap-3" onSubmit={submitHandler}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="users" className="text-base text-[#232323] font-medium uppercase">Select a User</label>
                            <select name="users" id="users" className="focus:outline-0 bg-white py-1.5 px-2.5 h-9 border  rounded" required defaultValue={""} onChange={(e) => setCurrentUser(e.target.value)}>
                                <option value="" disabled>Select a User</option>
                                {users && users.map(user => {
                                    return (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-base text-[#232323] font-medium uppercase">Enter Title</label>
                            <input type="text" name="title" id="title" placeholder="Enter a Valid Title..." required className="focus:outline-0 py-1.5 px-2.5 h-9 bg-white border  rounded" onChange={titleValidator} />
                            {!titleIsValid && <small className="text-red-600">{TitleErrorMessage}</small>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="body" className="text-base text-[#232323] font-medium uppercase">Enter Description</label>
                            <textarea name="body" id="body" cols="30" rows="10" placeholder="Enter a Valid Desctription Here..." required className="focus:outline-0 resize-none h-32 py-1.5 px-2.5 h-9 border  rounded sm:h-40"
                                onChange={descriptionValidator}></textarea>
                            {!descriptionIsValid && <small className="text-red-600">{DescriptionErrorMessage}</small>}
                        </div>
                        <button type="submit" className='bg-[#FF725E] rounded uppercase text-white text-xl font-semibold tracking-wide py-1.5 px-3'
                            disabled={!(titleIsValid && descriptionIsValid)}
                        >Submit</button>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover={false}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}