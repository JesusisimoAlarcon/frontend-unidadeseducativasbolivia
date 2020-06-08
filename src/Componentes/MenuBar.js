import React from 'react'

export default function MenuBar() {
    return (
        <div>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link active" href='/'>DEPARTAMENTOS</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href='/'>DISTRITOS</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href='/'>UNIDADES EDUCATIVAS</a>
                </li>

            </ul>
        </div>
    )
}
