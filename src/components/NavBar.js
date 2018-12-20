import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="index.html">SB Admin</a>
                </div>
                <ul className="nav navbar-right top-nav">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> John Smith <b className="caret"></b></a>
                        <ul className="dropdown-menu">
                            <li>
                                <a href="#"><i className="fa fa-fw fa-user"></i> Profile</a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-fw fa-envelope"></i> Inbox</a>
                            </li>
                            <li>
                                <a href="#"><i className="fa fa-fw fa-gear"></i> Settings</a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="#"><i className="fa fa-fw fa-power-off"></i> Log Out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav side-nav">
                        <li className="active">
                            <a href="index.html"><i className="fa fa-fw fa-dashboard"></i> Dashboard</a>
                        </li>
                        <li>
                            <Link to="/recipes"><i className="fa fa-fw fa-bar-chart-o"></i> Recipes</Link>
                        </li>
                        <li>
                            <Link to="/recipes/create"><i className="fa fa-fw fa-bar-chart-o"></i> Add Recipe</Link>
                        </li>
                        <li>
                            <a href="javascript:;" data-toggle="collapse" data-target="#demo"><i className="fa fa-fw fa-arrows-v"></i> Categories <i className="fa fa-fw fa-caret-down"></i></a>
                            <ul id="demo" className="collapse">
                                <li>
                                    <Link to="/categories">All Categories</Link>
                                </li>
                                <li>
                                    <Link to="/categories/create">Create Category</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
