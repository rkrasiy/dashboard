import React from "react";
import Button from "../../components/Button/Button";
import "./Client.css";

const Client = (props) => {
  let hrf = null;
  let tel = null;
  let telTitle = null;
  if(props.email)
    hrf = "mailto:" + props.email
  if(props.phone){
    if (props.phone.indexOf('+34') > -1){
      tel = "tel:" + props.phone;
      telTitle = props.phone
    }else{
      tel = "tel:+34" + props.phone
      telTitle = "+34 " + props.phone
    }
  }
  return (
    <div className="Client">
      <div className="client-view">
        <p className="user name"><i className="user icon"></i>{props.name} {props.last_name}</p>
        <a href={tel} title="Llamar al cliente" className="phone-number"><i className="phone icon"></i>{telTitle}</a>
        <a href={hrf} title="Enviar un correo-electrónico" className="email"><i className="email icon"></i>{props.email}</a>
      </div>
      <div className="controls">
        <Button classes="blue" clicked={props.clickedEdit}>
          <i className="edit-user big inverted icon"></i>Editar
        </Button>
        <Button classes="red" clicked={props.clickedRemove}>
        <i className="trash inverted icon"></i>Eliminar
        </Button>
      </div>
    </div>
  );
};

export default Client;
