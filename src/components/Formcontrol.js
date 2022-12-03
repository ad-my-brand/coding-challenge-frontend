import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Container, Paper, TextField } from "@mui/material";
import clsx from "clsx";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "./Loader";
import { sweetFailed, sweetSuccess } from "./helper";
import LinearLoading from "./LinearLoading";
import { style } from "./Style";
import MyComponent from "./GMap";

export default function Formcontrol() {
  const formStyle = style();
  const [user, setUser] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [lineLoading, setlineLoading] = React.useState(false);
  const [titleLength, setTitleLength] = React.useState(0);
  const [bodyLength, setBodyLength] = React.useState(0);
  const [singleUserData, setSingleUserData] = React.useState();

  const handleChange = (event) => {
    setUser(event.target.value);

    const getSelectedUser = data.filter((userData) => {
      if (userData.name === event.target.value) {
        return userData;
      }
      return false;
    });

    setSingleUserData(getSelectedUser[0]);
  };

  const getUsers = async () => {
    const allUsers = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );

    setData([...allUsers.data]);
    setLoading(false);
  };

  React.useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    setlineLoading(true);
    e.preventDefault();

    const title = e.target.Title.value;
    const body = e.target.Body.value;

    // USER-ID
    const userId = singleUserData && singleUserData.id;

    let SweetMessage = "All fields required!";
    let SweetTitle = "Failed";

    const checks = () => {
      if (!title || !body) {
        setlineLoading(false);
        sweetFailed(SweetTitle, SweetMessage);
        return false;
      }
      if (!user) {
        SweetMessage = "Please select user !";
        setlineLoading(false);
        sweetFailed(SweetTitle, SweetMessage);
        return false;
      }

      return true;
    };

    if (checks() === true) {
      await axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          title,
          body,
          userId,
        })
        .then((res) => {
          if (res.status === 201) {
            SweetMessage = "Data successfully uploaded!";
            SweetTitle = "Success";
            setlineLoading(false);
            e.target.Title.value = "";
            e.target.Body.value = "";
            setUser("");
            setTitleLength(0);
            setBodyLength(0);
            return sweetSuccess(SweetTitle, SweetMessage);
          }
          if (res.status === 404) {
            SweetMessage = "User not found!";
            SweetTitle = "Failed";

            setlineLoading(false);
            sweetFailed(SweetTitle, SweetMessage);
          }
        })
        .catch((err) => {
          SweetMessage = "Error Communicating with server";
          SweetTitle = "Server Error";
          setlineLoading(false);
          sweetFailed(SweetTitle, SweetMessage);
        });
    }
  };

  const inputT = { maxLength: 10 };
  const inputB = { maxLength: 30 };
  const helperTitleText = () => {
    return `${titleLength}/${inputT.maxLength}`;
  };
  const helperBodyText = () => {
    return `${bodyLength}/${inputB.maxLength}`;
  };

  return (
    <Container
      className={formStyle.container}
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "5rem",
        border: "2px solid black",
      }}
    >
      <Paper>
        {loading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
            }}
            component="form"
            noValidate
            autoComplete="on"
            className={clsx(
              formStyle.flexColumn,
              formStyle.centerItem,
              formStyle.Box
            )}
            onSubmit={(e) => handleSubmit(e)}
          >
            {lineLoading && <LinearLoading />}
            <FormControl fullWidth>
              <InputLabel id="select-label">Select - User</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={user}
                label="Select - User"
                onChange={handleChange}
              >
                {data?.map((user, index) => {
                  return (
                    <MenuItem value={user.name} key={index}>
                      {user.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              label="title"
              type="text"
              variant="outlined"
              name="Title"
              inputProps={inputT}
              onChange={(e) => {
                setTitleLength(e.target.value.length);
              }}
              helperText={helperTitleText()}
            />

            <TextField
              label="body"
              type="text"
              variant="outlined"
              name="Body"
              multiline
              minRows={4}
              onChange={(e) => {
                setBodyLength(e.target.value.length);
              }}
              inputProps={inputB}
              helperText={helperBodyText()}
            />

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        )}
      </Paper>

      <Paper
        style={{
          position: "relative",
          width: "30rem",
          height: "30rem",
        }}
      >
     
        <MyComponent singleUserData={singleUserData} />
      </Paper>
    </Container>
  );
}
