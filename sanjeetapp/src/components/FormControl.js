import { useState } from 'react';

const styles = {
    backgroundColor:'yellow',
    fontSize :'3em',
    fontWeight:'bold',
    boxShadow:'3px 3px 3px green'
  }
  
  const style2 = {
    display :'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:'4%',
    backgroundColor:'#454545'
  }
  
  const style3 = {
   color:'white',
   marginRight:'4%',
   transform:'translateY(10px)',
   fontSize:'1.4em'
  
  }
  
  const style4 = {
    fontSize:'2em'
  }
function FormControl(){
    const [enteredTitle,setenteredTitle] = useState('');
    const [enteredBody,setEnteredBody] = useState('');
    
    
    
     function formsubmit(event){
        event.preventDefault();
     }
    
     function titlesubmit(event){
      setenteredTitle(event.target.value);
    }
    
    function bodysubmit(event){
      setEnteredBody(event.target.value);
    }
return(
    <>
    
    <div className="App" style={styles}>

  
Form Control Assignment 

</div>


<div>
<form onSubmit={formsubmit}> 
<div style={style2}>
<div style={{paddingTop:'4%'}} >
<label style={style3}><span style={style4}>T</span>itle</label>
<input type="text" onchange={titlesubmit}  ></input>
</div>
<div style={{paddingTop:'2%'}}>
<label style={style3}>
<span style={style4}>B</span>ody
</label>
<input type="text" onchange={bodysubmit}>
</input>
</div>
<div style={{paddingTop:'3%',paddingBottom:'3%',height:'2em'}}><button className="btn" style={{backgroundColor:'yellow',height:'2em',width:'5em',marginLeft:'-5em'}}>Submit</button></div>
</div>
</form>

</div>
<i>- by sanjeet bharti</i>
    </>
)


}

export default FormControl