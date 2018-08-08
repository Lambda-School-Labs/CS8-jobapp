import React, { Component } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Signout from '../components/signout/signout';
import config from '../config/config';
import axios from 'axios';
import { fstat } from 'fs';
import fs from 'fs';
import { Document, Page } from 'react-pdf';

class Resumespage extends Component {
    constructor(){
        super();

        this.state = {
            resumes: [],
            resume: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const myForm = document.getElementById('myForm');

        const formData = new FormData(myForm);
        //const resume = myForm.file.files[0];
        //const resumeBlob = new Blob([resume], {type: "application/pdf"});
        //formData.append("resume", resume);
        //console.log(formData.getAll("resume"));
        axios.post(`${config.serverUrl}/user/addResume`, formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });
    };

    componentDidMount() {
        axios.get(`${config.serverUrl}/user/getResumes`)
        .then(resumes => {
            console.log(resumes);
            this.setState({ file: resumes.data });
            console.log(this.state.file);
            
        })
        .catch(error => {
            console.log('error',error.response);
        });
    };


    render() {
        return (
            <div>
                <form id="myForm">
                    <input type="file" /*ref={(input) => {this.filesInput = input}}*/ name="file" />
                    <input type="text" placeholder="Resume Name" name="resumeName"/>
                    <button type="submit" onClick={this.handleSubmit}>Add Resume</button>
                </form>
                {/* <embed src={this.state.file} width="100px" height="200px" /> */}
                <Document
                    file={this.state.file}>
                    <Page pageNumber='1' />
                </Document>
            </div>
        )
    }
}

export default Resumespage;
