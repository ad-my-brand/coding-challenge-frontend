
import { makeStyles } from "@mui/styles";
export const style = makeStyles((theme) => ({
    Box: {
      marginTop: "5rem",
    },
    boxshadow: {
      padding: "1rem",
      background: "white",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    centerItem: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
    },
    flexColumn: {
      flexDirection: "column",
    },



    container :{
      display: "flex",
      flexDirection: "row",
      gap: "2rem",
      alignItems: "center",
      justifyContent: "space-around",
      marginTop:"5rem"
    }

  }));