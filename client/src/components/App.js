import React from 'react';
import Header from './Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home"
import Contact from './Pages/Contact';
import ProjectPage from "./Pages/ProjectPage"
import AllergenPage from './Pages/AllergenPage';
import AddFood from './addFood';
import MealInfo from './MealInfo';



function App() {
  return (
    <div> 
    <Router>

    <Header />
    <Switch>
    <Route path="/blog" />
    <Route path="/contact" component={Contact} />
    <Route path="/projects" component={ProjectPage} />
    <Route path="/allergen/add" component={AddFood} />
    <Route 
            path="/allergen/:id/add"
            render={(props) => (
              <AddFood {...props}/>
            )}
            />
    <Route 
        path="/allergen/:id"
        render={(props) => (
          <MealInfo {...props}/>
        )}
        />
    <Route path="/allergen" component={AllergenPage} />
    <Route path="/" component={Home} />
</Switch>
    </Router>
    </div>
  );
}

export default App;
