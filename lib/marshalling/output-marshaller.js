const {Transform} = require('stream');
const logger = require('util').debuglog('riff');
const RiffError = require('../riff-error');
const {findMarshaller} = require('./content-negotiation');

module.exports = class OutputMarshaller extends Transform {

    constructor(index, contentType, options) {
        super(options);
        if (index < 0) {
            throw new RiffError('error-output-index-invalid', `invalid output index: ${index}`);
        }
        const marshallerCandidate = findMarshaller(contentType);
        if (!marshallerCandidate.match) {
            throw new RiffError('error-output-content-type-unsupported', `unrecognized output #${index}'s content-type ${contentType}`);
        }
        this._index = index;
        this._acceptedContentType = marshallerCandidate.acceptedContentType;
        this._marshaller = marshallerCandidate.match;
    }

    _transform(value, _, callback) {
        logger(`Received output #${this._index} with content-type: ${this._acceptedContentType}`);
        let message;
        try {
            message = this._marshaller.marshal(value);
        } catch (err) {
            callback(new RiffError('error-output-invalid', err));
            return;
        }
        callback(null, this.convertToSignal(message));
    }

    convertToSignal(message) {
        const outputFrame = new proto.streaming.OutputFrame();
        outputFrame.setResultindex(this._index);
        outputFrame.setContenttype(this._acceptedContentType);
        outputFrame.setPayload(message.payload);
        this._setHeaders(outputFrame, message.headers);
        const outputSignal = new proto.streaming.OutputSignal();
        outputSignal.setData(outputFrame);
        return outputSignal;
    }

    _setHeaders(outputFrame, rawHeaders) {
        const headers = rawHeaders.toRiffHeaders();
        const headersMap = outputFrame.getHeadersMap();
        Object.keys(headers).forEach((headerName) => {
            // TODO: evolve proto to support multiple header values (getValue returns the first one)
            headersMap.set(headerName, rawHeaders.getValue(headerName));
        });
    }
};

