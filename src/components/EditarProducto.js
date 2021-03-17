import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useHistory } from 'react-router-dom';

export const EditarProducto = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    //Nuevo state de producto
    const [ producto, guardarPorducto ] = useState({
        nombre: '',
        precio: ''
    })


    //Producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);
    
     //Llenar state con useEfect 
    useEffect(() => {
        guardarPorducto(productoeditar);
    }, [productoeditar]);

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarPorducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const { nombre, precio } = producto;

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch( editarProductoAction(producto) );

        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control mb-5"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-5">
                                        Guardar Cambios
                                    </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
