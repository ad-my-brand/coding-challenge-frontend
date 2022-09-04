import axios from "axios"
import { useEffect, useState } from "react"
import MapContainer from "./Map"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";

function HomeContent({ users }) {

    // defined property of toast
    const toastPropertyProps = {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const [selectedUserId, setSelectedUserId] = useState("")  // contain id of selected user
    const [postBody, setPostBody] = useState("")              // store body of the post 
    const [postTitle, setPostTitle] = useState("")            // store title of the post

    const [postUploadLoading, setPostUploadLoading] = useState(false)  // loading when post is created

    useEffect(() => {

    }, [users])

    // form handler for creating post
    const createPostFormHandler = async (e) => {
        e.preventDefault();

        // check validation
        if (selectedUserId === "") {
            toast.info("Please select a user", toastPropertyProps)
        } else if (postTitle.length === 0) {
            toast.error("Please enter post title", toastPropertyProps)
        } else if (postBody.length < 10) {
            toast.error("body should have minimun of 10 letters", toastPropertyProps)
        } else {

            setPostUploadLoading(true)

            // make post req using axios
            await axios.post("https://jsonplaceholder.typicode.com/posts", {
                "userId": selectedUserId,
                "title": postTitle,
                "body": postBody
            }).then((res) => {

                // after successful post req
                toast.success("Post created successfully", toastPropertyProps)
                setSelectedUserId("")
                setPostBody("")
                setPostTitle("")
                setPostUploadLoading(false)
            }).catch((err) => {

                // catch error 
                setPostUploadLoading(false)
                toast.error("Something went wrong!", toastPropertyProps)
            })
        }

    }

    return (
        <div className="mx-5 xs:mx-10 sm:mx-12 lg:mx-14 mb-10">
            <div className={`${selectedUserId === "" ? "flex max-w-md mx-auto" : "grid md:gap-x-8 lg:gap-x-14 grid-rows-2 md:grid-rows-none gap-y-10 md:gap-y-0 md:grid-cols-2 w-full"} h-max mt-12 xs:mt-14 sm:mt-20`}>
                <div className="form__card shadow-md w-full h-max py-7 px-3.5 xs:px-6 sm:px-10">
                    <h2 className="text-center mb-5 text-lg xs:text-xl font-medium">
                        <i data-testid="post-icon" className="fa-solid fa-pen-nib mr-2"></i>
                        CREATE POST
                    </h2>
                    <form className="flex flex-col space-y-4" onSubmit={createPostFormHandler}>
                        <div>
                            <select
                                id="userId"
                                data-testid="user-select"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                            >
                                <option value="" defaultChecked>Please Select</option>
                                {
                                    users?.map((user) => (
                                        <option
                                            key={user?.id}
                                            value={user?.id}
                                        >
                                            {user?.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="relative">
                            <input
                                data-testid="post-title"
                                type="text"
                                id="postTitle"
                                className="homeContent__form__input peer"
                                placeholder=" "
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                            <label
                                htmlFor="postTitle"
                                className="homeContent__form__label"
                            >
                                Post Title
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                data-testid="post-body"
                                type="text"
                                id="postBody"
                                className="homeContent__form__input peer"
                                placeholder=" "
                                value={postBody}
                                onChange={(e) => setPostBody(e.target.value)}
                            />
                            <label
                                htmlFor="postBody"
                                className="homeContent__form__label"
                            >
                                Post Body
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <button
                                data-testid="post-btn"
                                className="bg-gradient-to-r from-indigo-400 to-indigo-500 text-white px-6 py-2 font-medium"
                                type="submit"
                            >
                                POST
                                {
                                    postUploadLoading && <Spinner />
                                }
                            </button>
                        </div>
                    </form>
                </div>
                {
                    selectedUserId !== "" && (
                        <MapContainer cordinates={users?.[selectedUserId - 1]?.address?.geo} />
                    )
                }
            </div>
            <ToastContainer
                style={{
                    fontSize: "15px"
                }}
            />
        </div>
    )
}

export default HomeContent