const {ApplicationCloudEventsJsonUnmarshaller, ApplicationCloudEventsJsonMarshaller} = require("./application-cloudevents-json");
const {ApplicationFormUrlEncodedUnmarshaller, ApplicationFormUrlEncodedMarshaller} = require("./application-form-urlencoded");
const {ApplicationJsonUnmarshaller, ApplicationJsonMarshaller} = require("./application-json");
const {ApplicationOctetStreamUnmarshaller, ApplicationOctetStreamMarshaller} = require("./application-octet-stream");
const {TextPlainUnmarshaller, TextPlainMarshaller} = require("./text-plain");

module.exports = {
    'unmarshallers': [
        new ApplicationCloudEventsJsonUnmarshaller(),
        new ApplicationFormUrlEncodedUnmarshaller(),
        new ApplicationJsonUnmarshaller(),
        new ApplicationOctetStreamUnmarshaller(),
        new TextPlainUnmarshaller(),
    ],
    'marshallers': [
        new ApplicationCloudEventsJsonMarshaller(),
        new ApplicationFormUrlEncodedMarshaller(),
        new ApplicationJsonMarshaller(),
        new ApplicationOctetStreamMarshaller(),
        new TextPlainMarshaller(),
    ]
};
