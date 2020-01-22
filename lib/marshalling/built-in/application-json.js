const {Message} = require('@projectriff/message');
const {TextDecoder, TextEncoder} = require('util');
const {Unmarshaller, Marshaller} = require("@projectriff/marshmallow");

class ApplicationJsonUnmarshaller extends Unmarshaller {

    constructor() {
        super();
        this.textDecoder = new TextDecoder('utf8');
    }

    canonicalMimeType() {
        return 'application/json';
    }

    priority() {
        return 30;
    }

    unmarshal(riffMessage) {
        return JSON.parse(this.textDecoder.decode(riffMessage.payload));
    }
}

class ApplicationJsonMarshaller extends Marshaller {

    constructor() {
        super();
        this.textEncoder = new TextEncoder();
    }

    canonicalMimeType() {
        return 'application/json';
    }

    priority() {
        return 30;
    }

    marshal(output) {
        const json = JSON.stringify(output);
        if (typeof json === 'undefined') {
            throw new Error(`Could not marshall ${output.toString()} to JSON`)
        }
        return Message.builder()
            .payload(this.textEncoder.encode(json))
            .build();
    }
}

module.exports = {ApplicationJsonUnmarshaller, ApplicationJsonMarshaller};
