import { useSnackbar } from "notistack";
import { Map, Marker } from "pigeon-maps";
import { ChangeEvent, useState } from "react";
import { User } from "../App.types";
import FormControl from "./FormControl";
import SubmitButton from "./SubmitButton";

function Form({ users = [] }: { users: User[] }) {
  const [currentMapPosition, setCurrentMapPosition] = useState<
    [number, number] | null
  >(null);

  const { enqueueSnackbar } = useSnackbar();

  const [dirty, setDirty] = useState<boolean>(false);
  const [validationStatus, setValidationStatus] = useState({
    user: false,
    title: false,
    body: false,
  });

  const [sending, setSending] = useState<boolean>(false);

  const validateUser = (value: string) => {
    setValidationStatus((prev) => ({ ...prev, user: false }));
    if (value === "") return "Please select a user";
    if (!users.find((user) => user.id === parseInt(value)))
      return "User not found";
    setValidationStatus((prev) => ({ ...prev, user: true }));
    return "";
  };

  const validateTitle = (value: string) => {
    setValidationStatus((prev) => ({ ...prev, title: false }));
    if (value === "") return "Please enter a title";
    setValidationStatus((prev) => ({ ...prev, title: true }));
    return "";
  };

  const validateBody = (value: string) => {
    setValidationStatus((prev) => ({ ...prev, body: false }));
    if (value === "") return "Please enter a body";
    setValidationStatus((prev) => ({ ...prev, body: true }));
    return "";
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const areTruthyShort = Object.values(validationStatus).every(Boolean);
    setDirty(true);
    if (areTruthyShort) {
      const json = JSON.stringify(
        Array.from(new FormData(e.target).entries()).reduce(
          (m, [key, value]) => Object.assign(m, { [key]: value }),
          {}
        )
      );
      enqueueSnackbar("Submitting data to API", { variant: "info" });
      setSending(true);
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: json,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          console.log(response.json());
          if (response.ok) {
            enqueueSnackbar("Data submitted successfully", {
              variant: "success",
            });
          } else {
            enqueueSnackbar("Data submission failed", { variant: "error" });
          }
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Failed to post - Network Error", {
            variant: "error",
          });
        })
        .finally(() => {
          setSending(false);
        });
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl w-2/3 max-w-2xl ">
      <figure className="w-1/2 bg-gray-200 ">
        {currentMapPosition && (
          <Map center={currentMapPosition} defaultZoom={3}>
            <Marker
              className="px-3 py-1.5"
              width={50}
              anchor={currentMapPosition}
            />
          </Map>
        )}
      </figure>
      <div className="card-body">
        <h1 className="text-2xl font-bold pb-2 text-center">Send a Post</h1>
        <form
          onSubmit={handleSubmit}
          className="form-control flex flex-col gap-3"
          title="User form"
        >
          <FormControl
            label="User"
            name="userId"
            validate={validateUser}
            component="select"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const position = users.find(
                (user) => user.id === parseInt(e.target.value)
              )?.address.geo;
              if (position)
                setCurrentMapPosition([
                  parseFloat(position.lat),
                  parseFloat(position.lng),
                ]);
              else setCurrentMapPosition(null);
            }}
            dirty={dirty}
            defaultValue=""
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </FormControl>

          <FormControl
            label={"Title"}
            name="title"
            validate={validateTitle}
            component="input"
            defaultValue={""}
            dirty={dirty}
          />
          <FormControl
            label={"Body"}
            name="body"
            validate={validateBody}
            component="textarea"
            defaultValue={""}
            dirty={dirty}
          />
          <SubmitButton loading={sending} />
        </form>
      </div>
    </div>
  );
}

export default Form;
