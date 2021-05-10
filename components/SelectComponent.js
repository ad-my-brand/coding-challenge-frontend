import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";

const SelectComponent = ({ item, itemList, handleChange, showError }) => {
	const [open, setOpen] = useState(false);

	return (
		<View
			style={{
				paddingTop: 50,
				flexDirection: "row",
				justifyContent: "center",
			}}>
			<Menu
				visible={open}
				onDismiss={() => setOpen(false)}
				anchor={
					<TouchableOpacity onPress={() => setOpen(true)}>
						<View style={styles.label}>
							<Text style={showError && !Object.keys(item).length && { color: "red" }}>
								{!Object.keys(item).length ? "Please select a user" : item.name}
							</Text>
						</View>
					</TouchableOpacity>
				}>
				{itemList.map((el) => (
					<Menu.Item
						onPress={() => {
							handleChange(el);
							setOpen(false);
						}}
						key={el.id}
						title={el.name}
					/>
				))}
			</Menu>
		</View>
	);
};

export default SelectComponent;

const styles = StyleSheet.create({
	label: {
		height: 50,
		borderColor: "#000",
	},
});
