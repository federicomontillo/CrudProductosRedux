import React from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { borrarProdcutoAction, obtenerProductoEditar } from '../actions/productoActions';

export const Producto = ({producto}) => {

    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const history = useHistory(); // Hablitar history para redireccion

    //Confirmar si desea Eliminar Producto
    const confirmarEliminarProducto = id => {

        //Preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "El producto se elimina de manera definitiva.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            calcelButtonText: 'Cancelar'
          }).then((result) => {

            if (result.isConfirmed) {
                //pasarlo al action
                dispatch ( borrarProdcutoAction(id) );
              
            }
          })
    }

    //Funcion que redirige 
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto) );
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => redireccionarEdicion(producto) }
                    className="btn btn-primary mr-2"
                    >   
                    Editar
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={ () => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
