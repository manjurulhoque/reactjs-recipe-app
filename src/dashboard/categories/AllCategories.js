import React, { Component } from 'react';
import firebase from '../../firebase';
import { css } from 'react-emotion';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class AllCategories extends Component {
    state = {
        categories: [],
        loading: true
    };

    componentDidMount() {
        let cat = [];
        firebase.database().ref('categories')
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((data) => {
                    cat.push({key: data.key, category_name: data.val().name, image: data.val().image});
                });
                this.setState({categories: cat}, () => {
                    this.setState({loading: false});
                });
            }).catch(err => {
                console.log(err);
            })
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
            <div className="row">
                <div className="col-lg-6">
                    <h2>All categories</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map((category, index) =>
                                        <tr key={index}>
                                            <td>{category.key}</td>
                                            <td>{category.category_name}</td>
                                            <td>
                                                <img className="img-responsive" height='150px' src={category.image} alt={category.category_name}/>
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
