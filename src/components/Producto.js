import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { borrarProdcutoAction } from '../actions/productoActions';

export const Producto = ({producto}) => {

    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();

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

    return (
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2">
                    Editar
                </Link>
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
