
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';


class Hint {
    constructor(props) {
        this.props = props
        this.decrypted = ''
        this.password = ''
    }

    header() {
        if (this.decoded()) {
            return <section key={this.props.encoded}>
                <p className='revealed-hint'>{this.props.hint}</p>
                <p className='revealed-message'>{"(" + this.password + "): " + this.decrypted}</p>
            </section>
        } else if (this.props.hint) {
            return <section key={this.props.encoded}>
                <p>{this.props.hint}</p>
            </section>
        } else {
            return <section key={this.props.encoded}></section>
        }
    }

    decoded() {
        return this.password !== '' && this.decrypted !== ''
    }

    attempt(password) {
        let pw = sha256(password.replace(/[^a-z0-9]/gi, '').toLowerCase()).toString()
        let key = CryptoJS.enc.Utf8.parse(pw.substring(0, 16));

        var decrypted = ''
        try {
            decrypted = CryptoJS.AES.decrypt(this.props.encoded, key, {mode:CryptoJS.mode.ECB}).toString(CryptoJS.enc.Utf8)
        } catch (e) {}

        let decoded = sha256(decrypted).toString() === this.props.hash
        if (decoded) {
            this.decrypted = decrypted
            this.password = password
        }
        return decoded
    }
}

export default Hint;