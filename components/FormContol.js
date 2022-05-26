import axios from "axios";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
const FormControl = ({ id, data }) => {
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [name, setName] = useState("");
  const [titleFocus, setTitleFocus] = useState(false);
  const [bodyFocus, setBodyFocus] = useState(false);
  const [err, setErr] = useState(true);
  const handleBodyFocus = () => {
    const bdy = document.getElementById("body");
    if (bodyFocus == false) {
      setBodyFocus(true);
    } else {
      if (postBody == "") {
        setErr(true);
        bdy.style.borderColor = "red";
        bdy.placeholder = "It is a required feild";
      } else {
        bdy.style.borderColor = "rgb(147 197 253)";
        if (postTitle != "") {
          setErr(false);
        }
      }
      setBodyFocus(false);
    }
  };
  const handleTitleFocus = () => {
    const bdy = document.getElementById("title");
    if (titleFocus == false) {
      setTitleFocus(true);
    } else {
      if (postTitle == "") {
        setErr(true);
        bdy.style.borderColor = "red";
        bdy.placeholder = "It is a required feild";
      } else {
        bdy.style.borderColor = "rgb(147 197 253)";
        if (postBody != "") {
          setErr(false);
        }
      }
      setTitleFocus(false);
    }
  };
  const handleSubmit = (e) => {
    if (!err) {
      const toBeSent = {
        title: postTitle,
        body: postBody,
        userId: id,
      };
      axios
        .post("https://jsonplaceholder.typicode.com/posts", toBeSent)
        .then((res) => {
          console.log(res.data);
          setPostTitle("");
          setPostBody("");
          document.getElementById("body").placeholder = "";
          document.getElementById("title").placeholder = "";
          setErr(true);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(toBeSent);
    } else {
      const ttl = document.getElementById("title");
      const bdy = document.getElementById("body");
      if (postBody == "") {
        bdy.style.borderColor = "red";
        bdy.placeholder = "It is a required feild";
      }
      if (postTitle == "") {
        ttl.style.borderColor = "red";
        ttl.placeholder = "It is a required feild";
      }
    }
  };
  const handleFocus = (e) => {
    if (
      postBody.split("").filter((ele) => {
        if (ele != "\n") {
          return true;
        } else {
          return false;
        }
      }).length == 0
    ) {
      setPostBody("");
      e.target.style.height = "24px";
    } else {
      const scrolHeight = e.target.scrollHeight;
      e.target.style.height = `${scrolHeight}px`;
    }
  };
  const handleChange = (e) => {
    if (e.target.id == "title") {
      setPostTitle((prev) => {
        return e.target.value;
      });
      if (err) {
        const bdy = document.getElementById("title");
        bdy.style.borderColor = "rgb(147 197 253)";
      }
    } else {
      setPostBody((prev) => {
        return e.target.value;
      });
      if (err) {
        const bdy = document.getElementById("body");
        bdy.style.borderColor = "rgb(147 197 253)";
      }
    }
    if (e.target.value == "") {
      e.target.placeholder = "";
    }
  };
  useEffect(() => {
    if (data == undefined) return;
    setName(data.props.username);
    setPostTitle("");
    setPostBody("");
  }, [data]);
  return (
    <Wrapper style={{ fontFamily: '"Montserrat",sans-serif' }}>
      <Header>
        <p>{`${name}'s post`}</p>
      </Header>
      <Main>
        <label htmlFor="title" className="text-sm text-blue-400 font-bold">
          Title<span className="text-xs ml-1 text-red-400">*</span>
        </label>
        <Title
          onBlur={handleTitleFocus}
          onFocus={handleTitleFocus}
          type="text"
          id="title"
          value={postTitle}
          onChange={handleChange}
          required
        ></Title>
        <label htmlFor="body" className="text-sm text-blue-400 font-bold">
          Body<span className="text-xs ml-1 text-red-400">*</span>
        </label>
        <Body
          id="body"
          onBlur={handleBodyFocus}
          onFocus={handleBodyFocus}
          onKeyUp={handleFocus}
          onChange={handleChange}
          value={postBody}
          required
        ></Body>
      </Main>
      <Post onClick={handleSubmit}>Post</Post>
    </Wrapper>
  );
};
const Header = tw.div`
flex
justify-center
mb-4
font-bold
text-lg
text-blue-400
border-4
py-1
border-dashed
border-blue-200
`;
const Main = tw.div`
    flex-1
    flex
    flex-col
`;
const Wrapper = tw.div`
flex
flex-col
h-80
w-56
bg-white
rounded-lg
p-4
`;
const Title = tw.input`
border-0
outline-0
border-b-4
mb-2
border-blue-200
placeholder:text-red-300
`;
const Body = tw.textarea`
outline-none
border-b-4
resize-none
scroll-smooth
h-6
overflow-hidden
min-h-6
max-h-24
border-blue-200
placeholder:text-red-300
`;
const Post = tw.button`
bg-blue-400
text-white
font-semibold
rounded
hover:bg-white
hover:text-blue-400
hover:border-blue-400
hover:border-2
transition
h-10
`;
export default FormControl;
