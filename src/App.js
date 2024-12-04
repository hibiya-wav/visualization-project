import React, {Component} from "react";
import './App.css';
import FileUpload from "./Cleaned_Mobiles_Dataset_Cleaned_Mobiles_Dataset.csv";
import ProcessData from "./ProcessData";
import BarChart from "./BarChart";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        fetch(FileUpload)
            .then(response => response.text())
            .then(FileUpload => {
                const processData = new ProcessData();
                const usableData = processData.csvToJson(FileUpload);
                this.setState({data: usableData});
            });
    }

    render() {
        return (
            <div className="parent">
                <BarChart csv_data={this.state.data}></BarChart>
            </div>
        )
    }
}

export default App;
