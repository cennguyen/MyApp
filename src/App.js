import React, { Component } from 'react';
import Title from './components/Title';
import Search from './components/Search';
import Sort from './components/Sort';
import Form from './components/Form';
import Items from './mockdata/Items';
import Item from './components/Item';
import SweetAlert from 'react-bootstrap-sweetalert';
import ItemEdit from './components/ItemEdit';




class App extends  React.Component {
   
      
    render() {  
        let {item,index} = this.props;
    if(item === 0) {
        return (
            <tr>
                <td colSpan="4" className="text-center">  
                    <h4>No Item</h4>
                </td>
            </tr>
        )
    }
    let classNameLabel = '';
        return (
            <div className="container">
            <SweetAlert
                 show={this.state.showAlert}
                 title="Delete Item"
                 text={this.state.titleAlert}
                 showCancelButton
                 onOutsideClick={()  => this.setState({ showAlert: false })}
                 onEscapeKey={()     => this.setState({ showAlert: false })}
                 onCancel={()        => this.setState({ showAlert: false })}
                 onConfirm={() => this.handleDeleteItem()}
            />
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
        let arrayLevel = [];
        if(Items.length > 0) {
            for(let i = 0; i < Items.length; i++) {
                if(arrayLevel.indexOf(Items[i].level) === -1) {
                    arrayLevel.push(Items[i].level);
                }
            }
        }
        arrayLevel.sort(function(a, b){return a - b});
        this.state = {
            items: Items,
            showAlert: false,
            titleAlert: '',
            idAlert: '',
            indexEdit: 0,
            idEdit: '',
            nameEdit: '',
            levelEdit: 0,
            arrayLevel: arrayLevel
        }
    }
    renderItem = () => {
        let {items} = this.state;
        const{item,idEdit,indexEdit,nameEdit,levelEdit,arrayLevel}=this.state;
        if(items.length === 0) {
            return <Item item={0} />
        }
        return items.map((item, index) => {
            if(item.id === idEdit){
                return(
                    <ItemEdit
                    key={index}
                    indexEdit={indexEdit}
                    nameEdit={nameEdit}
                    levelEdit={levelEdit}
                    arrayLevel={arrayLevel}
                    handleEditClickCancel={this.handleEditClickCancel}
                    handleEditInputChange={this.handleEditInputChange}
                    handleEditSelectChange={this.handleEditSelectChange}
                    handleEditClickSubmit={this.handleEditClickSubmit}
                    />
                )
            }
            return (
                <Item
                    item={item}
                    index={index}
                    key={index}
                    handleShowAlert={this.handleShowAlert}
                    handleEditItem={this.handleEditItem}
                  />
            )
        });
    }
    handleShowAlert = (item) => {
      this.setState({
        showAlert: true,
        titleAlert: item.name,
        idAlert: item.id
      });
    }
    handleDeleteItem = () => {
        let {idAlert, items} = this.state;
        if(items.length > 0) {
            for(let i = 0; i < items.length; i++) {
                if(items[i].id === idAlert) {
                    items.splice(i, 1);
                    break;
                }
                this.setState({
                    showAlert:false
                });
            }
        }
    }
    handleEditItem = (index,item) => {
        this.setState({
            indexEdit:index,
            idEdit: item.id,
            nameEdit:item.name,
            levelEdit:item.level
        });
    }
    handleEditClickCancel =()=>{
        this.setState({
            idEdit:''
        });
    }
    handleEditInputChange =(value)=>{
        this.setState({
            nameEdit:value
        });
    }
    handleEditSelectChange= (value)=>{
        this.setState({
            levelEdit:value
        });
    }
    handleEditClickSubmit=()=>{
        let{items,idEdit,nameEdit,levelEdit}=this.state;
        if(items.length>0){
            for(let i=0;i<items.length;i++){
                if(items[i].id===idEdit){
                    items[i].name=nameEdit;
                    items[i].level= +levelEdit;
                    break;
                    
                }
                this.setState({
                    idEdit:''
                });
            }
        }
    }
    
}


export default App;