
import React from "react";
import Hint from './Hint.js'


class Hints extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: props.encoded,
            guess: '',
            hints: props.hints.map(hint => new Hint(hint))
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            guess: event.target.value
        })
        this.state.hints.forEach(hint => {
            if (hint.attempt(event.target.value)) {
                this.setState({
                    hints: this.state.hints,
                    guess: '',
                })
            }
        })
    }

    render() {
        var header = []
        var final = null
        var first = true
        for (let i = 0; i < this.state.hints.length; i++) {
            let hint = this.state.hints.at(i)
            if (hint.decoded()) {
                if (!first) {
                    header = header.concat(<hr className="rounded" key={hint.props.encoded + "_break"}></hr>)
                }
                header = header.concat(hint.header())
                first = false
            } else if (!final) {
                final = hint
            }
        }
        if (final) {
            if (!first) {
                header = header.concat(<hr className="rounded" key={final.encoded + "_break"}></hr>)
            }
            header = header.concat(final.header())
        }

        return (
            <div>
                {header}
                <input key="entry" type="text" value={this.state.guess} onChange={this.handleChange} />
            </div>
        )
    }
}

export default Hints;