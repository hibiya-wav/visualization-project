import React, {Component} from "react";

class ProcessData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            jsonData: null,
        };
    }

    handleFileSubmit = (event) => {
        event.preventDefault();
        const {file} = this.state;

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const json = this.csvToJson(text);
                this.setState({jsonData: json});
                this.props.set_data(json);
            };
            reader.readAsText(file);
        }
    };

    csvToJson = (csv) => {
        const lines = csv.split("\n");
        const headers = lines[0].split(",");
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(",");
            const obj = {};

            headers.forEach((header, index) => {
                obj[header.trim()] = currentLine[index]?.trim();
            });

            if (Object.keys(obj).length && lines[i].trim()) {
                const parsedObj = {
                    Brand: obj.Brand,
                    Camera: obj.Camera,
                    Description: obj.Description,
                    Link: obj.Link,
                    "Product Name": obj["Product Name"],
                    "Actual price (USD)": parseFloat(obj["Actual price (USD)"]),
                    "Discount price (USD)": parseFloat(obj["Discount price (USD)"]),
                    "Display Size (inch)": parseFloat(obj["Display Size (inch)"]),
                    "Ram (Gb)": parseInt(obj["Ram (Gb)"]),
                    Ratings: parseInt(obj.Ratings),
                    Reviews: parseInt(obj.Reviews),
                    Stars: parseFloat(obj.Stars),
                    "Storage (GB)": parseInt(obj["Storage (GB)"])
                };
                result.push(parsedObj);
            }
        }

        return result;
    };

    render() {
        // Render method left empty as per request
        return null;
    }
}

export default ProcessData;
