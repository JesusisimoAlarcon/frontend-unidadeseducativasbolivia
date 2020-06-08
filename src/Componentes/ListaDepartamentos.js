import React, { Component } from 'react'
import axios from 'axios';
export default class ListaDepartamentos extends Component {
    constructor() {
        super()
        this.state = {
            departamentos: [],
            distritos: [],
            unidadeseducativas: [],
            departamento: '',
            distrito: '',
            unidadeducativa: ''
        }
    }
    componentDidMount() {
        this.getDepartamentos();
    }

    async getDepartamentos() {
        const departamentos = await (await axios.get('http://localhost:4560/departamento')).data
        this.setState({ departamentos })
    }
    async getDistritos(departamento) {
        const distritos = await (await axios.get('http://localhost:4560/distrito/' + departamento)).data
        this.setState({ distritos, departamento })
    }
    async getUnidadesEducativas(departamento) {
        const unidadeseducativas = await (await axios.get('http://localhost:4560/unidadeducativa/departamento/' + departamento)).data
        this.setState({ departamento, unidadeseducativas })
    }
    async getUnidadesEducativasDistrito(distrito) {
        const unidadeseducativas = await (await axios.get('http://localhost:4560/unidadeducativa/distrito/' + distrito)).data
        this.setState({ distrito, unidadeseducativas })
    }

    /*
    onChangeDistrito = (distrito) => {
        const distritos = this.state.distritos.filter(dis => dis.distrito.indexOf(distrito) > 0)
        console.log(distritos);
        this.setState({ distrito })
    }
    */
    render() {
        return (

            <div className='container'>
                <div className='text-center p-2 m-2'>
                    <h2>Unidades educativas de Bolivia</h2>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th width='20%'>Departamento</th>
                            <th width='20%'>Numero de Distritos</th>
                            <th width='20%'>Numero de Unidades Educativas</th>
                            <th width='20%'>Opciones</th>
                            <th width='20%'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.departamentos.map(depar =>
                            <tr key={depar.departamento}>
                                <td>{depar.departamento}</td>
                                <td>{depar.distritos}</td>
                                <td>{depar.unidades}</td>
                                <td><button onClick={() => this.getDistritos(depar.departamento)} className='btn btn-info btn-sm btn-block' data-toggle="modal" data-target="#modaldistritos">ver distritos</button></td>
                                <td><button onClick={() => this.getUnidadesEducativas(depar.departamento)} className='btn btn-info btn-sm btn-block' data-toggle="modal" data-target="#modalunidades">ver unidades educativas</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="modaldistritos" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">DISTRITOS {this.state.departamento}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='text-center'>
                                    <h4>{'Total distritos ' + this.state.departamento + ': ' + this.state.distritos.length}</h4>
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Distrito</th>
                                            <th>Cantidad de Unidades Educativas</th>
                                            <th>Opcion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.distritos.map((distro, index) =>
                                            <tr key={distro.distrito}>
                                                <td>{index + 1}</td>
                                                <td>{distro.distrito}</td>
                                                <td>{distro.unidadeseducativas}</td>
                                                <td><button onClick={() => this.getUnidadesEducativasDistrito(distro.distrito)} className='btn btn-info btn-sm btn-block' data-toggle="modal" data-target="#modalunidadesdistrito">ver unidades educativas</button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modalunidades" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">UNIDADES EDUCATIVAS {this.state.departamento}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='text-center'>
                                    <h4>{'Total unidades educativas ' + this.state.departamento + ': ' + this.state.unidadeseducativas.length}</h4>
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Distrito</th>
                                            <th>Unidad Educativa</th>
                                            <th>Zona</th>
                                            <th>Ubicacion</th>
                                            <th>Ubicacion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.unidadeseducativas.map((unidad, index) =>
                                            <tr key={unidad.id}>
                                                <td>{index + 1}</td>
                                                <td>{unidad.distrito}</td>
                                                <td>{unidad.zona}</td>
                                                <td>{unidad.direccion}</td>
                                                <td><a href={`https://maps.google.com/?ll=${unidad.latitud.replace(',','.')},${unidad.longitud.replace(',','.')}&z=18&t=k`} target='blank' className='btn btn-secondary btn-sm btn-block'>Vista aerea</a></td>
                                                <td><a href={`https://maps.google.com/?q=${unidad.latitud.replace(',','.')},${unidad.longitud.replace(',','.')}`} target='blank' className='btn btn-secondary btn-sm btn-block'>Vista normal</a></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modalunidadesdistrito" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">UNIDADES EDUCATIVAS {this.state.distrito}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='text-center'>
                                    <h4>{'Total unidades educativas distrito ' + this.state.distrito + ': ' + this.state.unidadeseducativas.length}</h4>
                                </div>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Distrito</th>
                                            <th>Unidad Educativa</th>
                                            <th>Zona</th>
                                            <th>Direccion</th>
                                            <th>Ubicacion</th>
                                            <th>Ubicacion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.unidadeseducativas.map((unidad, index) =>
                                            <tr key={unidad.id}>
                                                <td>{index + 1}</td>
                                                <td>{unidad.distrito}</td>
                                                <td>{unidad.unidad_educativa}</td>
                                                <td>{unidad.zona}</td>
                                                <td>{unidad.direccion}</td>
                                                <td><a href={`https://maps.google.com/?ll=${unidad.latitud.replace(',','.')},${unidad.longitud.replace(',','.')}&z=18&t=k`} target='blank' className='btn btn-secondary btn-sm btn-block'>Vista aerea</a></td>
                                                <td><a href={`https://maps.google.com/?q=${unidad.latitud.replace(',','.')},${unidad.longitud.replace(',','.')}`} target='blank' className='btn btn-secondary btn-sm btn-block'>Vista normal</a></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
