import React, {Component} from "react";
import './App.css';
import FileUpload from "./Cleaned_Mobiles_Dataset_Cleaned_Mobiles_Dataset.csv";
import ProcessData from "./ProcessData";
import BarChart from "./BarChart";
import ScatterPlot from "./ScatterPlot";

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
            <div>
                <div className="groupInfo">
                    <p>Group #: 9</p>
                    <p>Group Members: Jeremy Granizo, Rahul Patel, Alamdar Qanoongo,
                        Daniel Santos Martinez </p>
                </div>
                <div className="parent">
                    <BarChart csv_data={this.state.data}></BarChart>
                    <ScatterPlot csv_data={this.state.data}></ScatterPlot>
                </div>
            </div>
        )
    }
}

export default App;
