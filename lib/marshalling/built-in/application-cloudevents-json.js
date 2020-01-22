const {ApplicationJsonMarshaller} = require("./application-json");
const {ApplicationJsonUnmarshaller} = require("./application-json");

class ApplicationCloudEventsJsonUnmarshaller extends ApplicationJsonUnmarshaller {

    priority() {
        return 50;
    }

    canonicalMimeType() {
        return 'application/cloudevents+json';
    }
}

class ApplicationCloudEventsJsonMarshaller extends ApplicationJsonMarshaller {

    priority() {
        return 50;
    }

    canonicalMimeType() {
        return 'application/cloudevents+json';
    }
}

module.exports = {ApplicationCloudEventsJsonUnmarshaller, ApplicationCloudEventsJsonMarshaller};
