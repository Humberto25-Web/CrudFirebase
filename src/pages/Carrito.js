import {app} from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillCartPlusFill } from "react-icons/bs";
import React,{Component} from 'react';
import swal from 'sweetalert';

import { Modal,ModalBody,ModalHeader,ModalFooter } from "reactstrap";

class Crud extends Component{
    state={
        data:[],
        modalAdd: false,
        modalEditar: false,
        cont: 0,
        totalProdu:0,
        form:{
            titulo:'',
            descripcion:'',
            tallas:'',
            costo:'',
            foto:'',
            cantidad:''
        }

    };
    peticionGet=()=>{
        const firebase=app.database().ref();
        firebase.child('carrito').on('value',dato=>{
            if(dato.val()!==null){
                this.setState({...this.state.data,data:dato.val()})
            }else{
                this.setState({data:[]})
            }
        })
    }
    //Agregar
    peticionPost=()=>{
        const firebase=app.database().ref();
        firebase.child("carrito").push(this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalAdd: false});

      }
      //Editar

      peticionPut=()=>{
        const firebase=app.database().ref();
        firebase.child(`carrito/${this.state.id}`).set(
          this.state.form,
          error=>{
            if(error)console.log(error)
          });
          this.setState({modalEditar: false});
      }
      //Eliminar
      peticionDelete=()=>{
        swal({
            title: "Quitar del Crrito",
            text:`Estás seguro que deseas eliminar el producto ${this.state.form && this.state.form.nombre}`,
            icon:"warning",
            buttons:["No","Si"]
        }).then(respuesta=>{
            if(respuesta){
                const firebase=app.database().ref();
                firebase.child(`carrito/${this.state.id}`).remove(
                    error=>{
                      if(error)console.log(error)
                    });
                    swal({
                        text:"El Producto se a eliminado del carrito",
                        icon:"success"
                    })
            }
        })
        /*if(window.confirm(`Estás seguro que deseas eliminar el producto ${this.state.form && this.state.form.nombre}?`))
        {
        firebase.child(`carrito/${this.state.id}`).remove(
          error=>{
            if(error)console.log(error)
          });
        }*/
      }
      //Vaciar Carrito
      peticionComprarProd=()=>{
          if(swal({
              title: "Zapateria Chilpancingo Agradece tu Compra",
              text:"Compra Realizada",
              icon:"success",
              button:"Aceptar"
          }))
       // if(window.confirm(`Estás seguro de su Compra`))
        {
            const firebase=app.database().ref();
        firebase.child(`carrito`).remove(
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

    seleccionardato=async(dato, id, caso)=>{

    await this.setState({form: dato, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    this.peticionDelete()

  }
    componentDidMount(){
        this.peticionGet();

    }
    render(){
        return(
            <div>
             <h1 className="titulos">Mi Carrito</h1>
                
                {/*<br/>
                <button className="btn btn-primary" onClick={()=>this.setState({modalAdd:true})}>Insertar dato</button>
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
                            <th>Cantidad</th>
                            
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
           
                                            <button className="btn btn-danger" onClick={()=>this.seleccionardato(this.state.data[i], i, 'Eliminar')}> Quitar del Carrito</button>
                                        </td>
                                       <label class="vi"> {this.state.cont += parseInt( this.state.data[i].costo)
                                        }</label>
                                         <label class="vi">  {this.state.totalProdu++}</label>
                                         
                            </tr>
                           
                        })}
                        
                        <tr >
                            <td><b>Tu Carrito Tiene ({this.state.totalProdu}) Productos</b></td>
                            <td colSpan="2" align="right"><b>Total a pagar</b></td>
                            <td>${this.state.cont}</td>
                            <td colSpan="1" align="center"><button className="btn btn-success" onClick={()=>(this.peticionComprarProd(),'Eliminar')}>Comprar <br/>Productos</button></td>
                        </tr>
                        
                    </tbody>
                    <label class="vi">{this.state.cont=0,
                    this.state.totalProdu=0}</label>
                </table>
            </div>
        );
    }
}
export default Crud;