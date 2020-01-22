const {Transform} = require('stream');
const RiffError = require('../riff-error');
const {Message} = require('@projectriff/message');
const logger = require('util').debuglog('riff');
const {findUnmarshaller} = require('./content-negotiation');

const convertToRiffMessage = (payload, headers) => {
    const messageBuilder = Message.builder();
    headers.toArray()
        .forEach((header) => {
            messageBuilder.addHeader(header[0], header[1]);
        });
    return messageBuilder
        .payload(payload)
        .build();
};

module.exports = class InputUnmarshaller extends Transform {

    constructor(options) {
        super(options);
    }

    _transform(inputSignal, _, callback) {
        const dataSignal = inputSignal.getData();
        const inputIndex = dataSignal.getArgindex();
        const contentType = dataSignal.getContenttype();
        const unmarshaller = findUnmarshaller(contentType).match;
        if (!unmarshaller) {
            callback(new RiffError('error-input-content-type-unsupported', `unsupported input #${inputIndex}'s content-type ${contentType}`));
            return;
        }
        let message;
        try {
            message = convertToRiffMessage(dataSignal.getPayload(), dataSignal.getHeadersMap());
        } catch (err) {
            callback(new RiffError('error-argument-transformer', err)); //TODO: change error type
            return;
        }

        let input;
        try {
            input = unmarshaller.unmarshal(message);
        } catch (err) {
            callback(new RiffError('error-input-invalid', err));
            return;
        }

        try {
            callback(null, input);
            logger(`Forwarding data for input #${inputIndex}`);
        } catch (err) {
            // propagate downstream error
            this.emit('error', err);
        }
    }
}
;
