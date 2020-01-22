const {Message} = require('@projectriff/message');
const querystring = require('querystring');
const {TextDecoder, TextEncoder} = require('util');
const {Unmarshaller, Marshaller} = require("@projectriff/marshmallow");

class ApplicationFormUrlEncodedUnmarshaller extends Unmarshaller {

    constructor() {
        super();
        this.textDecoder = new TextDecoder('utf8');
    }

    canonicalMimeType() {
        return 'application/x-www-form-urlencoded';
    }

    priority() {
        return 40;
    }

    unmarshal(riffMessage) {
        return querystring.parse(this.textDecoder.decode(riffMessage.payload));
    }
}

class ApplicationFormUrlEncodedMarshaller extends Marshaller {

    constructor() {
        super();
        this.textEncoder = new TextEncoder();
    }

    canonicalMimeType() {
        return 'application/x-www-form-urlencoded';
    }

    priority() {
        return 40;
    }

    marshal(output) {
        return Message.builder()
            .payload(this.textEncoder.encode(querystring.stringify(output)))
            .build();
    }
}

module.exports = {ApplicationFormUrlEncodedUnmarshaller, ApplicationFormUrlEncodedMarshaller};
