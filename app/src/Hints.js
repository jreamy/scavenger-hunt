
import React from "react";
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';


class Hint extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: props.encoded,
            decoded: false,
            guess: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let pw = sha256(event.target.value.replace(/[^a-z0-9]/gi, '').toLowerCase()).toString()
        let key = CryptoJS.enc.Utf8.parse(pw.substring(0, 16));

        var decrypted = ''
        try {
            decrypted = CryptoJS.AES.decrypt(this.props.encoded, key, {mode:CryptoJS.mode.ECB}).toString(CryptoJS.enc.Utf8)
        } catch (e) {}

        let decoded = sha256(decrypted).toString() === this.props.hash
        this.setState({
            decoded: decoded,
            display: (decoded && decrypted) || this.props.encoded,
            guess: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <p>{this.props.hint}</p>
                <input type="text" value={this.state.guess} onChange={this.handleChange} />
                <p>{this.state.display}</p>
            </div>
        )
    }
}

export default Hint;