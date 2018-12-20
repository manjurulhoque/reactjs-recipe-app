import React, { Component } from 'react';
import firebase from '../../firebase';
import Dropzone from 'react-dropzone';

export default class CreateCategory extends Component {

    state = {
        category: '',
        image: null,
        imagePath: null,
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();

        const { category, image } = this.state;
        
        if(category && image) {
            const storageRef = firebase.storage().ref();
            storageRef.child(`categories/${Math.floor(Date.now() / 1000) + image.name}`).put(image).then(snapshot => {
                let self = this;
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    //console.log("File available at", downloadURL);
                    firebase.database().ref('categories').push(
                        {
                            name: category,
                            image: downloadURL
                        })
                        .then(data => {
                            console.log(data);
                            self.props.history.push('/categories');
                        })
                });
            });
        }else {
            alert('Field can not empty!');
        }
    }

    onDrop = (files, rejectedFiles) => {
        //console.log(files);
        this.setState({image: files[0]});
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
            this.setState({imagePath: reader.result});
        }, false);
        reader.readAsDataURL(files[0]);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Create Category
                        </h1>
                        <ol className="breadcrumb">
                            <li className="active">
                                <i className="fa fa-dashboard"></i> Dashboard
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input className="form-control" onChange={this.onChange} name="category" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Category Image:</label>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Dropzone onDrop={this.onDrop} accept='image/*' multiple={false}>Drop image here</Dropzone>
                                    </div>
                                    <div className="col-md-6">
                                        {
                                            this.state.image &&
                                            <img src={this.state.imagePath} width="320" height="240"/>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-default" value="Create"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
