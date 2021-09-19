import React  from 'react';
import axios from 'axios';

class Form_control extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '',
                    datas: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  componentDidMount(){
    axios.get(`https://jsonplaceholder.typicode.com/users` ).then((res)=>{
      console.log(res.data);

      let datas = res.data;
      this.setState({ datas: datas});
      datas.map((data)=>{
        console.log(data.name);
      })
    }).catch((error)=>{
       console.log(error);
    })
  }

  render() {
    let val = this.state.datas;
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </label>
      <input type="submit" value="Submit" />
      <div className="names">
         {
           val.map((data)=>{
             return(
               <h2 key={data.id}> {data.name}</h2>
             )
           })
         }
      </div>
    </form>
    );
  }
}

export default Form_control;