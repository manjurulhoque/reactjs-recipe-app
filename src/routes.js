import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import CreateCategory from './dashboard/categories/CreateCategory';
import AllCategories from './dashboard/categories/AllCategories';
import CreateRecipe from './dashboard/recipes/CreateRecipe';
import Recipes from './dashboard/recipes/Recipes';

const BaseRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/recipes' component={Recipes} />
                <Route exact path='/categories' component={AllCategories} />
                <Route exact path='/categories/create' component={CreateCategory} />
                <Route exact path='/recipes/create' component={CreateRecipe} />
            </Switch>
        </div>
    )
}

export default BaseRouter;