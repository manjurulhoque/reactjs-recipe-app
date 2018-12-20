import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import firebase from '../../firebase';
import Dropzone from 'react-dropzone';
import { css } from 'react-emotion';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class CreateRecipe extends Component {

    state = {
        name: '',
        ingredients: '',
        direction: '',
        image: null,
        imagePath: null,
        categories: [],
        loading: true,
        category_id: ''
    }

    componentDidMount() {
        let cat = [];
        firebase.database().ref('categories')
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((data) => {
                    cat.push({key: data.key, category_name: data.val().name});
                });
                this.setState({categories: cat}, () => {
                    this.setState({loading: false});
                });
            }).catch(err => {
                console.log(err);
            })
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, ingredients, direction, image, category_id, imagePath } = this.state;

        if(image && category_id) {
            const storageRef = firebase.storage().ref();
            storageRef.child(`recipes/${Math.floor(Date.now() / 1000) + image.name}`).put(image).then(snapshot => {
                let self = this;
                snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    //console.log("File available at", downloadURL);
                    firebase.database().ref(`/categories/${category_id}/recipes`).push(
                        {
                            name: name,
                            ingredients: ingredients,
                            direction: direction,
                            image: downloadURL
                        })
                            .then(data => {
                                alert('Recipe added!!');
                            })
                });
            });
        }else {
            alert('Upload recipe image!!');
        }

        //firebase.storage
    }

    onChangeEditor = e => {
        this.setState({ingredients: e.editor.getData()})
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

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
        const { categories, loading } = this.state;

        return loading ? 
            <div className="text-center">
                <ClipLoader
                    className={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loading}/>
            </div> : (
            <div>
                <div className="row">
                    <h3>CreateRecipe</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Recipe Name:</label>
                            <input type="text" onChange={this.onChange} name="name" className="form-control" id="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Select category:</label>
                            <select onChange={this.onChange} name="category_id" className="form-control">
                                {
                                    categories.map((category, index) =>
                                        <option key={index} value={category.key}>
                                            {category.category_name}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Recipe Image:</label>
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
                            <label htmlFor="ingredients">Ingredients:</label>
                            <CKEditor 
                                activeClass="p10"
                                content={this.state.ingredients}
                                events={{
                                    "change": this.onChangeEditor
                                }}
                                />
                            {/* <textarea name="ingredients" id="ingredients"></textarea> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="direction">Direction:</label>
                            <textarea onChange={this.onChange} name="direction" className="form-control" id="direction"></textarea>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
