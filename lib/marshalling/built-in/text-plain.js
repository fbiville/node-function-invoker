const {Message} = require('@projectriff/message');
const {TextDecoder, TextEncoder} = require('util');
const {Unmarshaller, Marshaller} = require("@projectriff/marshmallow");

class TextPlainUnmarshaller extends Unmarshaller {

    constructor() {
        super();
        this.textDecoder = new TextDecoder('utf8');
    }

    canonicalMimeType() {
        return 'text/plain';
    }

    priority() {
        return 10;
    }

    unmarshal(riffMessage) {
        return this.textDecoder.decode(riffMessage.payload);
    }
}

class TextPlainMarshaller extends Marshaller {

    constructor() {
        super();
        this.textEncoder = new TextEncoder();
    }

    canonicalMimeType() {
        return 'text/plain';
    }

    priority() {
        return 10;
    }

    marshal(output) {
        return Message.builder()
            .payload(this.textEncoder.encode(output))
            .build();
    }
}

module.exports = {TextPlainUnmarshaller, TextPlainMarshaller};
