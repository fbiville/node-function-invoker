const {Message} = require('@projectriff/message');
const {Unmarshaller, Marshaller} = require("@projectriff/marshmallow");

class ApplicationOctetStreamUnmarshaller extends Unmarshaller {

    constructor() {
        super();
    }

    canonicalMimeType() {
        return 'application/octet-stream';
    }

    priority() {
        return 20;
    }

    unmarshal(riffMessage) {
        return riffMessage.payload;
    }
}

class ApplicationOctetStreamMarshaller extends Marshaller {

    constructor() {
        super();
    }

    canonicalMimeType() {
        return 'application/octet-stream';
    }

    priority() {
        return 20;
    }

    marshal(output) {
        return Message.builder()
            .payload(Buffer.from(output))
            .build();
    }
}

module.exports = {ApplicationOctetStreamUnmarshaller, ApplicationOctetStreamMarshaller};
