import React, { useContext } from "react";
import { modalContext } from "../context/modalcontext";

const Modal = () => {
    const modalcontext = useContext(modalContext)

    return (
        <React.Fragment>
            {modalcontext?.modalImg && <div className="modalbackground">
                <span onClick={() => modalcontext.setmodalImg(null)}>&#x2715;</span>
                <img src={modalcontext.modalImg} alt='' />
            </div>}
        </React.Fragment>
    );
}

export default Modal;