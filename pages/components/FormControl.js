import { useState } from "react";

export function FormControl(props) {
    const { users } = props;

    const [titleIsValid, setTitleIsValid] = useState(true);
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);

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
            // toast return
            alert('error');
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
        });
        // toast for successfull post
        alert('submitted');
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center p-3 bg-[#FDFDFD]">
                <div className="w-full max-w-4xl h-full grid grid-cols-1 place-content-center auto-rows-max gap-3 bg-[#FDFDFD] sm:grid-cols-2">
                    <div className="w-full h-52 rounded col-span-1 relative flex items-center border border-[#FFB1A4] sm:h-full">
                        {/* insert map here */}
                    </div>
                    <form className="col-span-1 h-full flex flex-col gap-3" onSubmit={submitHandler}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="users" className="text-base text-[#232323] font-medium uppercase">Select a User</label>
                            <select name="users" id="users" className="focus:outline-0 bg-white py-1.5 px-2.5 h-9 border border-[#FFB1A4] rounded" required defaultValue={""}>
                                <option value="" disabled>Select a User</option>
                                {users.map(user => {
                                    return (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-base text-[#232323] font-medium uppercase">Enter Title</label>
                            <input type="text" name="title" id="title" placeholder="Enter a Valid Title..." required className="focus:outline-0 py-1.5 px-2.5 h-9 bg-white border border-[#FFB1A4] rounded" onChange={titleValidator} />
                            {!titleIsValid && <small className="text-red-600">Please Enter a valid title</small>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="body" className="text-base text-[#232323] font-medium uppercase">Enter Description</label>
                            <textarea name="body" id="body" cols="30" rows="10" placeholder="Enter a Valid Desctription Here..." required className="focus:outline-0 resize-none h-32 py-1.5 px-2.5 h-9 border border-[#FFB1A4] rounded sm:h-40"
                                onChange={descriptionValidator}></textarea>
                            {!descriptionIsValid && <small className="text-red-600">Please enter atleast 6 characters</small>}
                        </div>
                        <button type="submit" className='bg-[#FF725E] rounded uppercase text-white text-xl font-semibold tracking-wide py-1.5 px-3'
                            disabled={!(titleIsValid && descriptionIsValid)}
                        >Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}