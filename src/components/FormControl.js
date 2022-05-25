import FormInput from "./FormInput";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import MapComponent from "./MapComponent";
import {useEffect, useState} from "react";
import axios from "axios";

const FormControl = () => {

    const [users, setUsers] = useState([])
    const [didWeGetTheInfo, setDidWeGetTheInfo] = useState('loading')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
                if (res.status === 200) {
                    setUsers(res.data)
                    setDidWeGetTheInfo('true')
                }
            } catch (err) {
                setDidWeGetTheInfo('false')
            }
        }

        getUsers()
    }, [])

    const conditionalRendering = () => {
        if (didWeGetTheInfo === 'loading') {
            return (
                <div>Loading...</div>
            )
        }

        if (didWeGetTheInfo === 'true') {
            return (
                <div>
                    <h6 className='text-3xl font-semibold'>Create a Post.</h6>
                    <Formik
                        initialValues={{
                            title: '',
                            body: '',
                            id: ''
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string().required('Title is Required.'),
                            body: Yup.string().required('Body is Required.'),
                            id: Yup.number().required('User is Required.')
                        })}
                        onSubmit={async (values, {setSubmitting, resetForm}) => {
                            setSubmitting(false);
                            try {
                                const result = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
                                    values
                                })
                                if (result) {
                                    resetForm()
                                    alert(`Successfully added your post!`)
                                    setErrorMsg('')
                                }
                            } catch (err) {
                                setErrorMsg('Failed to add your post!')
                            }
                        }}
                    >{({
                           handleSubmit,
                           values,
                           isSubmitting
                       }) => (
                        <Form onSubmit={handleSubmit} className="space-y-2 py-4">
                            <FormInput label="Title" name="title" type="text"/>
                            <FormInput as='textarea' label="Body" name="body" rows={8}/>
                            <FormInput as='select' name="id">
                                <option disabled="">
                                    Select a user
                                </option>
                                {users.map((option) => {
                                    return (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    );
                                })}
                            </FormInput>
                            <button type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-500 text-white px-4 py-2 rounded block">
                                Submit
                            </button>

                            <div>{errorMsg && <p>{errorMsg}</p>}</div>

                            <div className="mt-3">
                                {values.id &&
                                    <MapComponent lat={users[values.id].address.geo.lat}
                                                  lng={users[values.id].address.geo.lng}/>
                                }
                            </div>
                        </Form>
                    )}
                    </Formik>
                </div>
            )
        }

        if (didWeGetTheInfo === 'false') {
            return (
                <div>Error</div>
            )
        }
    }

    return (
        <div className='max-w-screen-md mx-auto py-14 bg-white px-10 rounded-lg shadow-xl'>
            {conditionalRendering()}
        </div>
    )
}

export default FormControl