import { useState, useEffect } from 'react'
import { Select, Option } from "@material-tailwind/react";
import { connect } from 'react-redux';
import Map from '../components/Map';
import FormInput from '../components/FormInput';
import SpinnerImg from '../images/spinner.gif'
import Spinner from '../components/Spinner';

import { postUser } from '../store/actions/user';

const Home = ({ users, msg, loading, postUser }) => {
    const [selectUser, setSelectUser] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [position, setPosition] = useState()

    const [errorUser, setErrorUser] = useState(false)
    const [errorTitle, setErrorTitle] = useState(false)
    const [errorBody, setErrorBody] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const onUserChange = (e) => {
        setSelectUser(e)
        setErrorUser(false)
        const select = users?.find((user) => user?.id === e)
        setPosition([select?.address?.geo?.lat, select?.address?.geo?.lng])
    }

    const onTitleChange = (e) => {
        setTitle(e)
        setErrorTitle(false)
    }

    const onBodyChange = (e) => {
        setBody(e)
        setErrorBody(false)
    }

    const onSubmit = e => {
        e.preventDefault()
        if (selectUser?.length === 0) {
            setErrorUser(true)
        }
        if (title?.length === 0) {
            setErrorTitle(true)
        }
        if (body?.length === 0) {
            setErrorBody(true)
        }

        if (selectUser && title && body) {
            postUser(title, body, selectUser)
            setLoading2(true)
        }
        setTitle('')
        setBody('')
    }

    useEffect(() => {
        if (msg.length > 0) {
            setLoading2(false)
        }
    }, [msg])

    return (
        <div className=' bg-[#eef1f3] flex flex-col justify-center items-center p-5 xl:py-12 min-h-screen' >
            {loading ? <Spinner /> :
                <>
                    <Map position={position} city={users?.find((user) => user?.id === selectUser)?.address?.city} />
                    <form className="mt-10" onSubmit={onSubmit} >

                        <div className="flex w-72 md:w-80 xl:w-96 flex-col gap-1 mb-3 z-10">
                            <Select className='bg-white' size="md" label="Select User" onChange={e => onUserChange(parseInt(e))} error={errorUser} >
                                {users?.map((user) => {
                                    return (
                                        <Option key={user?.id} value={user?.id.toString()} className='' >{user?.name}</Option>
                                    )
                                })}
                            </Select>
                            {errorUser && <span className='ml-1 text-xs text-red-600' >Please select a user</span>}
                        </div>
                        <FormInput value={title} placeholder={'Title'} onChange={onTitleChange} error={errorTitle} errorMsg={'Please enter title'} />
                        <FormInput value={body} placeholder={'Body'} onChange={onBodyChange} error={errorBody} errorMsg={'Please enter body'} />

                        <div className='flex justify-center mt-2' >
                            <button className="rounded-full bg-blue-500 active:scale-90 duration-700 active:bg-blue-700 font-semibold w-full h-10" type='submit' >{loading2 ? (<img className='h-8 mx-auto' src={SpinnerImg} alt='Loading' />) : 'Submit'}</button>
                        </div>
                    </form>
                </>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.user.users,
    msg: state.user.msg,
    loading: state.user.loading
})

export default connect(mapStateToProps, { postUser })(Home)