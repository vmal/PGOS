import React, { Component } from 'react';
import './App.css';
import Modal from "react-responsive-modal";

import CurrentDate from './components/CurrentDate';
import CreateOrderButton from './components/CreateOrderButton';
import TableOrder from './components/TableOrder';
import ModalOrder from "./components/ModalOrder";

class App extends Component {

    constructor()
    {
        super();
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.state = {
            open: false
        };
    }

    onOpenModal() {
        this.setState({ open: true });
    }

    onCloseModal() {
        this.setState({ open: false });
    }

  render() {
      const { open } = this.state;
      return (
        <div className="App row">
            <div className="logo col-12">
                <svg width="196" height="29" className="dib v-mid" viewBox="0 0 196 29" xmlns="http://www.w3.org/2000/svg"><title>Blue Bottle Coffee Logo</title><g fill="none" fillRule="evenodd"><g fill="#00A1DF"><path d="M5.136 1.403l.384.047.096.234c.864.047 1.776-.187 1.776-.187.096-.094.336-.374.096-.515-.96.187-2.352-.14-2.16-.047-.192-.046-.432-.187-.672-.42-.432-.702-.672-.234-.672 0-.048.841.192.795 1.152.888zM11.76 13.144a6.556 6.556 0 0 0-.192-1.03c-.48-1.543-1.056-3.18-2.64-3.882-.672-.234-1.92-.187-2.112-1.73V1.87l-2.016.42v.282l-.048.888v.936c.048 2.385.192 3.882-2.496 4.864-1.632.608-1.728 1.31-1.92 3.134 0 .14-.048.28-.048.374 0-.046-.528 5.146 1.248 13.378 0 0 .288 1.356.288 1.543 0 .094.144.234.384.421 3.024.702 3.696.187 5.28.421 1.632.187 3.072-.795 3.072-.842.144-.046.672-1.122.768-2.432.72-3.602.576-9.355.432-12.114z"></path></g><text x="21" y="18" fill="#555" style={{fontSize: "14px", fontWeight: "600", letterSpacing: "1.6px"}} textLength="175">BLUE BOTTLE COFFEE</text></g></svg>
            </div>
            <div className="header col-12">
                <div className="col-sm-1"><CurrentDate className="date"/></div>
                <div className="col-sm-9"><h1 className="heading">Perfectly Ground Work Orders</h1></div>
                <div className="col-sm-2"><CreateOrderButton onClick={this.onOpenModal.bind(this)} buttonName="CREATE ORDER"/></div>

            </div>
            <TableOrder/>
            <Modal open={open} onClose={this.onCloseModal} center>
                <ModalOrder/>
            </Modal>
        </div>
    );
  }
}

export default App;
