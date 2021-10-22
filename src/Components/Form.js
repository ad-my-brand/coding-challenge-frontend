import styled from "styled-components";

const Form = ({ users, onAdd }) => {
    const HandleChanges = (e) => {
        e.preventDefault();

        onAdd(e.target.body.value, e.target.title.value, e.target.user.value);
        alert("New user added");
    };

    return (
        <Wrapper>
            <form onSubmit={HandleChanges}>
                <div className="fields">
                    <label>
                        <h5>Enter The Name of the User</h5>

                        <select name="user" id="userId">
                            {users.map((data) => (
                                <option value={data.id} key={data.id}>
                                    {data.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="fields">
                    <div className="fields">Enter Body</div>
                    <input
                        type="text"
                        placeholder="enter your body"
                        name="body"
                        required
                    />
                </div>
                <div className="fields">
                    <div className="fields">Enter Title</div>
                    <input
                        type="text"
                        name="title"
                        placeholder="enter your title"
                        required
                    />
                </div>
                <div className="fields">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Form;
const Wrapper = styled.div`
    background-color: rgb(215, 225, 245);
    display: flex;
    flex-flow: column wrap;
    width: 300px;
    align-self: center;
    text-align: center;

    border-radius: 1rem;

    .fields {
        padding: 1rem;
    }
`;

// ----------------------------------------------        Another way using filter method

//                        <DropDown>
//                             {users
//                                 .filter((data) => {
//                                     if (input == "") {
//                                         return data;
//                                     } else if (
//                                         data.name
//                                             .toLowerCase()
//                                             .includes(input.toLowerCase())
//                                     ) {
//                                         return data;
//                                     }
//                                 })
//                                 .map((data, key) => (
//                                     <a
//                                         href="javascript:void(0);"
//                                         onClick={addValue}
//                                         key={data.id}
//                                     >
//                                         {data.name}
//                                     </a>
//                                 ))}
//                         </DropDown>

//  datalist tags html5 practice

//     <ReactHTMLDatalist
//                                 name={"user_id"}
//                                 onChange={HandleChanges}
//                                 classNames={"classone classtwo"}
//                                 options={[
//                                     {users.map((data, key)=>(
//                                         { text: {data.name}, value:{data.id}}
//                                     ))}
//                                 ]}
//                             />

//      <input
//                                 type="text"
//                                 id="users"
//                                 list="userNames"
//                                 placeholder="username"
//                                 onChange={(e) => {
//                                     setUserId(e.target.value);
//                                 }}
//                             ></input> */
// }

// {
//     <datalist id="userNames">
//                                 {users.map((data, key) => (
//                                     <option
//                                         value={data.name}
//                                         id={data.id}
//                                         key={key}
//                                     />
//                                 ))}
//                             </datalist>
// }
