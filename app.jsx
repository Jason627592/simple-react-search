const data = [
  {
    name: "Ivan",
    age: "18",
    job: "CEO"
  },
  {
    name: "Raymond",
    age: "28",
    job: "Software Engineer"
  },
  {
    name: "Chris",
    age: "19",
    job: "Driver"
  },
  {
    name: "Bob",
    age: "12",
    job: "Student"
  },
  {
    name: "Ada",
    age: "24",
    job: "Teacher"
  },
  {
    name: "David",
    age: "16",
    job: "Student"
  }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_staff: 0,
            search_string: ""
        };
        this.changeStaffDisplay = this.changeStaffDisplay.bind(this);
    }

    changeStaffDisplay(user_id){
        this.setState({selected_staff: user_id});
    }

    updateSearchResult(){
        this.setState({search_string: document.querySelector("#search_name").value});
    }

    render() {
        return (
            <div className="container">
                <div id="left-panel">
                    <label htmlFor="search_name">Search Name:&nbsp;</label>
                    <input type="text" id="search_name" placeholder="Search ..." onChange={() => {this.updateSearchResult()}}></input>
                    <ShortResult change_display={this.changeStaffDisplay} search_string={this.state.search_string}/>
                </div>
                <div id="right-panel">
                    <SelectedDetail selected={this.state.selected_staff}/>
                </div>
            </div>
        );
    }
}

class ShortResult extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search_result: []
        };
    }

    highlightName(name){
        let index = name.indexOf(this.props.search_string);
        let search_length = this.props.search_string.length;
        // console.log(index);
        return name.substring(0, index) + "<span class='highlight'>" + name.substr(index, search_length) + "</span>" + name.substr(index + search_length);
    }

    calculateResult(name){
        if(name.includes(this.props.search_string)) return this.highlightName(name)
        return "";
    }

    render(){
        let result = data.map((info, index) => (
            <div key={index} onClick={() => {this.props.change_display(index)}} dangerouslySetInnerHTML={{__html: this.calculateResult(info['name'])}}></div>
        ));

        return(
            <div>{result}</div>
        )
    }
}

function SelectedDetail(props){
    return(
        <div>
            <p>Name: {data[props.selected]["name"]}</p>
            <p>Age: {data[props.selected]["age"]}</p>
            <p>Job: {data[props.selected]["job"]}</p>
        </div>
    )
}

ReactDOM.render(<App/>, document.querySelector("#app"));
