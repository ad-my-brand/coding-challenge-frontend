import '../index.css'
const stylec = {
    backgroundColor:'',
    borderBottom:'2px solid grey'
    , listStyleType:'none',
    paddingRight:'63px',
    paddingLeft:'34px',
    paddingTop:'23px',
    paddingBottom:'23px',
    marginRight:'5%'
}

function ListPopulate(props) {

    const listitem = "this is string"
    const savejsonDataHandler = (enteredjsonData) => {
        const jsonData = {
          ...enteredjsonData,
          id: Math.random().toString()
        };
        props.onAddjsonHandler(jsonData);
      };

    return(
        <>
     <div className="grida" style={{overflow:'scroll',backgroundColor:'wheat',width:'64%',marginLeft:'-38%'}}>
         {/* <marquee direction="up" scrollAmount="2"> */}
     
    <span style={{margin:'2%'}}> <span style={{fontSize:'2.3em'}}>T</span>itles</span>
      <ul>
     
     <li style={stylec}>
          {props.fetch}
          </li>
          {props.items.map((e) => (
          <li style={stylec} id="ListItem">{e.title}</li>
        ))}
          <li style={stylec}>

          </li>
         
      </ul>
      {/* </marquee> */}
     </div>
    
        </>
    )

}


export default ListPopulate