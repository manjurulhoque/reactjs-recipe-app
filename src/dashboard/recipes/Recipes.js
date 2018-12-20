import React, { Component } from 'react';
import { css } from 'react-emotion';
import ClipLoader from 'react-spinners/ClipLoader';
import firebase from '../../firebase';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class Recipes extends Component {

    state = {
        recipes: [],
        loading: true
    }

    componentDidMount() {
        let rec = [];
        firebase.database().ref('categories')
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((data) => {
                    //cat.push({key: data.key, category_name: data.val().name});
                    data.child('recipes').forEach((recipe) => {
                        //console.log(recipe.val());
                        rec.push({
                            key: recipe.key,
                            ...recipe.val()
                        });
                        //rec.push({key: recipe.key, category_name: data.val().name});
                    })
                });
                this.setState({recipes: rec}, () => {
                    this.setState({loading: false});
                });
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const { recipes, loading } = this.state;

        return loading ?
            <div className="text-center">
                <ClipLoader
                    className={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loading}/>
            </div> : (
            <div className="row">
                <div className="col-lg-12">
                    <h2>All recipes</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Recipe Name</th>
                                    <th>Ingredients</th>
                                    <th>Direction</th>
                                    <th>Recipe Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    recipes.map((recipe, index) =>
                                        <tr key={index}>
                                            <td>{recipe.key}</td>
                                            <td>{recipe.name}</td>
                                            <td>
                                                <div dangerouslySetInnerHTML={{__html: recipe.ingredients}} />
                                            </td>
                                            <td>{recipe.direction}</td>
                                            <td>
                                                <img width='200px' height='200px' src={recipe.image} alt={recipe.name}/>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
