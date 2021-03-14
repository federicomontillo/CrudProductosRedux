import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { crearNuevoProducto } from '../actions/productoActions'

export const NuevoProducto = ({history}) => {

    // State del componente
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState(0);

    //Use Dispatch 
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector( state => state.productos.error);

    console.log(cargando);

    // Llamar el action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProducto(producto) );

    // Cuando usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //Validar Formulario
        if(nombre.trim() === '' || precio <= 0) {
            return;
        }

        // Si no hay errores

        //Crear Nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // Redireccionar
        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control mb-5"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio( Number(e.target.value) )}
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-5">
                                        Agregar
                                    </button>
                            </div>
                        </form>

                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 text-center">Hubo un error</p> : null}
                    </div>

                </div>
            </div>
        </div>
    )
}
