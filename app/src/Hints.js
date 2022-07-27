
import React from "react";
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';


class Hint extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            decoded: props.encoded,
            guess: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value.replace(/[^a-z0-9]/gi, '').toLowerCase())
        console.log(sha256(event.target.value.replace(/[^a-z0-9]/gi, '').toLowerCase()))
        let pw = sha256(event.target.value.replace(/[^a-z0-9]/gi, '').toLowerCase()).toString().substring(0, 16)
        console.log("pw:", pw)

        console.log(this.props.encoded)
        let key = CryptoJS.enc.Utf8.parse(pw);
        console.log(CryptoJS.enc.Utf8.stringify(key))
        console.log(key)

        // console.log(CryptoJS.enc.Utf8.stringify(decrypted))
        // console.log(decrypted.toString(CryptoJS.enc.Utf8));
        var decrypted = ''
        try {
            decrypted = CryptoJS.AES.decrypt(this.props.encoded, key, {mode:CryptoJS.mode.ECB}).toString(CryptoJS.enc.Utf8)
        } catch (e) {}

        this.setState({
            decoded: decrypted || this.props.encoded,
            guess: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <p>{this.props.hint}</p>
                <input type="text" value={this.state.guess} onChange={this.handleChange} />
                <p>{this.state.decoded}</p>
            </div>
        )
    }
}

export default Hint;