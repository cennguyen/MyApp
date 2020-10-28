import React, { Component } from 'react';
import Title from './components/Title';
import Search from './components/Search';
import Sort from './components/Sort';
import Form from './components/Form';
import ListItem from './components/ListItem';
import Items from './mockdata/Items';
import Item from './components/Item';
class App extends Component {
    render() {
        return (
            <div className="container">
                <Title />
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <Search />
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <Sort />
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <button type="button" className="btn btn-info btn-block marginB10">Add Item</button>
                    </div>
                </div>
                <div className="row marginB10">
                    <div className="col-md-offset-7 col-md-5">
                        <Form />
                    </div>
                </div>
                <div className="panel panel-success">
                <div className="panel-heading">List Item</div>
           
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th style={{ width: '10%'}} className="text-center">#</th>
                            <th>Name</th>
                            <th style={{ width: '15%'}} className="text-center">Level</th>
                            <th style={{ width: '15%'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderItem()}
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
    constructor(props) {    
        super(props);
        this.state = {
            items: Items
        }
    }
    renderItem = () => {
        let {items} = this.state;
        return items.map((item, index) => {
            return (
                <Item
                    item={item}
                    index={index}
                  />
            )
        });
    }
    
}


export default App;