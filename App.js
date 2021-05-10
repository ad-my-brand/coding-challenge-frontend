import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, TextInput, Button, Snackbar } from "react-native-paper";

import axios from "axios";

import SelectComponent from "./components/SelectComponent";

const App = () => {
	const [user, setUser] = useState({});
	const [userList, setUserList] = useState([]);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [showError, setShowError] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [showAlertError, setShowAlertError] = useState(false);

	const handleSelect = (item) => setUser(item);

	const handleSubmit = () => {
		if (!Object.keys(user).length || !title || !body) setShowError(true);
		else
			axios
				.post("https://jsonplaceholder.typicode.com/posts", {
					userId: user.id,
					title,
					body,
				})
				.then(() => {
					setShowError(false);
					setUser({});
					setTitle("");
					setBody("");
					setShowAlert(true);
				})
				.catch((error) => {
					console.log(error);
					setShowAlertError(true);
				});
	};

	useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((res) => setUserList(res.data.map((item) => ({ id: item.id, name: item.name }))));
	}, []);

	return (
		<PaperProvider>
			<View style={styles.container}>
				<SelectComponent item={user} itemList={userList} handleChange={handleSelect} showError={showError} />
				<TextInput
					error={showError && !title}
					style={{ width: "100%" }}
					label="Title"
					mode="outlined"
					value={title}
					onChangeText={(text) => setTitle(text)}
				/>
				<TextInput
					error={showError && !body}
					style={{ width: "100%", marginTop: 10 }}
					label="Body"
					mode="outlined"
					value={body}
					onChangeText={(text) => setBody(text)}
				/>
				<Button style={{ marginTop: 20 }} mode="contained" onPress={handleSubmit}>
					Submit
				</Button>
				<Snackbar
					visible={showAlert}
					onDismiss={() => setShowAlert(false)}
					duration={3000}
					style={showAlertError && { backgroundColor: "red" }}>
					{showAlertError ? "Has something problem" : "Created Succesfully"}
				</Snackbar>
			</View>
		</PaperProvider>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		marginHorizontal: 20,
	},
});
