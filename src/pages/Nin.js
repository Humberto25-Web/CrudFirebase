import firebase from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillCartPlusFill } from "react-icons/bs";
import React,{Component} from 'react';
import Carrito from './Carrito';
import swal from 'sweetalert';
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
            existencia:'',
            foto:''
        }

    };
    peticionGet=()=>{
        firebase.child('chicos').on('value',empleado=>{
            if(empleado.val()!==null){
                this.setState({...this.state.data,data:empleado.val()})
            }else{
                this.setState({data:[]})
            }
        })
    }

  
      //Agregar a carrito
    peticionAddCar=()=>{
        swal({
            title: "Producto Agregado al Carrito",
            text:"Sigue explorando nuestros Productos",
            icon:"success",
            button:"Aceptar"
        })
        firebase.child("carrito").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});

      }
      //Editar

     /* peticionPut=()=>{
        firebase.child(`chicos/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }*/

      peticionCarrito=()=>{
        firebase.child(`carrito/${this.state.id}`).set(
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
        firebase.child(`chicos/${this.state.id}`).remove(
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
             <h1 className="titulos">Niños</h1>
                
                {/*<br/>
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
                            <th>Existencia</th>
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
                                        <td>{this.state.data[i].existencia}</td>
                                        <td>
                                            <button ><BsFillCartPlusFill onClick={()=>this.seleccionarEmpleado(this.state.data[i], i, 'Editar')}/></button>
                                        </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalAdd}>
                    <ModalHeader>Agregar a Carrito</ModalHeader>
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
                             <button className="btn btn-primary" onClick={()=>this.peticionAddCar()}>Agregar</button>
                             <button className="btn btn-danger" onClick={()=>this.setState({modalAdd: false})}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>Agregar a Carrito</ModalHeader>
                    <ModalBody>
                        <div>
                            <label>Producto:</label><br/>
                            <input type="text" className="form-control" name="nombre" onChange={this.handleChange} value={this.state.form && this.state.form.nombre} readOnly/><br/>
                            <label>Descripcion:</label><br/>
                            <input type="text" className="form-control"name="descripcion" onChange={this.handleChange } value={this.state.form && this.state.form.descripcion}readOnly/><br/>
                            <label>Tallas:</label><br/>
                            <input type="text" className="form-control" name="tallas" onChange={this.handleChange} value={this.state.form && this.state.form.tallas} readOnly/><br/>
                            <label>Costo:</label><br/>
                            <input type="number" className="form-control" name="costo" onChange={this.handleChange} value={this.state.form && this.state.form.costo} readOnly/><br/>
                            <label>Cantidad a comprar:</label><br/>
                            <input type="number" className="form-control" name="existencia" onChange={this.handleChange} value={this.state.form && this.state.form.existencia} readOnly/><br/>
                            <label>Foto:</label><br/>
                            <input type="file" className="form-control" name="foto" onChange={this.handleChange}/><br/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                             <button className="btn btn-primary" onClick={()=>this.peticionAddCar()}>Agregar a Carrito</button>
                             <button className="btn btn-danger" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default Crud;