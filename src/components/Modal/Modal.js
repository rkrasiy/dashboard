import React from 'react';

const Modal = (props) => {

  return (
        <div className="modal">
          <form onSubmit={props.submited}>
            <h4 className="title">{props.title}</h4>
            {props.children}
          </form>
        </div>
      );
}

export default Modal