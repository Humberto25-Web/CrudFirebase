import firebase from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillCartPlusFill } from "react-icons/bs";
import React,{Component} from 'react';

import { Modal,ModalBody,ModalHeader,ModalFooter } from "reactstrap";

class Crud extends Component{
    state={
        data:[],
        modalAdd: false,
        modalEditar: false,
        form:{
            titulo:'',
            descripcion:'',
            tallas:'',
            costo:'',
            foto:''
        }

    };
    peticionGet=()=>{
        firebase.child('caballeros').on('value',empleado=>{
            if(empleado.val()!==null){
                this.setState({...this.state.data,data:empleado.val()})
            }else{
                this.setState({data:[]})
            }
        })
    }

    //Agregar
    peticionPost=()=>{
        firebase.child("caballeros").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalAdd: false});

      }
      //Editar

      peticionPut=()=>{
        firebase.child(`caballeros/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }
      //Eliminar
      peticionDelete=()=>{
        if(window.confirm(`Estás seguro que deseas eliminar el canal ${this.state.form && this.state.form.nombre}?`))
        {
        firebase.child(`caballeros/${this.state.id}`).remove(
          error=>{
            if(error)console.log(error)
          });
        }
      }
    handleChange=e=>{
        if(e.target.type==='file'){
            const file=e.target.files[0];
            this.setState({form:{
                ...this.state.form,
                [e.target.name]:e.target.value,
                foto:URL.createObjectURL(file)
            }})
        }else{
            this.setState({form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
            })
            console.log(this.state.form);
        }
        
    }

    seleccionarEmpleado=async(empleado, id, caso)=>{

    await this.setState({form: empleado, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }
    componentDidMount(){
        this.peticionGet();

    }
    render(){
        return(
            <div>
             <h1 className="titulos">Caballeros</h1>
                
               {/* <br/>
                <button className="btn btn-primary" onClick={()=>this.setState({modalAdd:true})}>Insertar Empleado</button>
                <br/> 
                <br/>*/} 
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Titulo</th>
                            <th>Descripcion</th>
                            <th>Tallas</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.state.data).map(i=>{
                            return <tr key={i}>
                                        
                                        <td><img src={this.state.data[i].foto} width="180" height="130"></img></td>
                                        <td>{this.state.data[i].nombre}</td>
                                        <td>{this.state.data[i].descripcion}</td>
                                        <td>{this.state.data[i].tallas}</td>
                                        <td>${this.state.data[i].costo}</td>
                                        <td>
                                            <button width="100"><BsFillCartPlusFill onClick={()=>this.seleccionarEmpleado(this.state.data[i], i, 'Comprar')}/></button>
                                        </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalAdd}>
                    <ModalHeader>Agregar Empleado</ModalHeader>
                    <ModalBody>
                        <div>
                            <label>Pruducto:</label><br/>
                            <input type="text" className="form-control" name="nombre" onChange={this.handleChange}/><br/>
                            <label>Descripcion:</label><br/>
                            <input type="text" className="form-control"name="descripcion" onChange={this.handleChange}/><br/>
                            <label>Tallas:</label><br/>
                            <input type="text" className="form-control"name="tallas" onChange={this.handleChange}/><br/>
                            <label>Costo:</label><br/>
                            <input type="number" className="form-control" name="costo" onChange={this.handleChange}/><br/>
                            <label>Foto:</label><br/>
                            <input type="file" className="form-control" name="foto" onChange={this.handleChange}/><br/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                             <button className="btn btn-primary" onClick={()=>this.peticionPost()}>Agregar</button>
                             <button className="btn btn-danger" onClick={()=>this.setState({modalAdd: false})}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>Editar Empleado</ModalHeader>
                    <ModalBody>
                        <div>
                            <label>Nombre:</label><br/>
                            <input type="text" className="form-control" name="nombre" onChange={this.handleChange} value={this.state.form && this.state.form.nombre}/><br/>
                            <label>Edad:</label><br/>
                            <input type="number" className="form-control"name="edad" onChange={this.handleChange } value={this.state.form && this.state.form.edad}/><br/>
                            <label>Sexo:</label><br/>
                            <input type="text" className="form-control" name="sexo" onChange={this.handleChange} value={this.state.form && this.state.form.sexo}/><br/>
                            <label>Salario:</label><br/>
                            <input type="number" className="form-control" name="salario" onChange={this.handleChange} value={this.state.form && this.state.form.salario}/><br/>
                            <label>Foto:</label><br/>
                            <input type="file" className="form-control" name="foto" onChange={this.handleChange} /><br/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                             <button className="btn btn-primary" onClick={()=>this.peticionPut()}>Editar</button>
                             <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default Crud;