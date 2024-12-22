import React from "react";
import Form, { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

import { RJSFValidationError, ErrorListProps, RJSFSchema } from "@rjsf/utils";

const schema: RJSFSchema = {
  title: "Simple Form Example",
  type: "object",
  properties: {
    firstName: { type: "string", title: "First Name" },
    lastName: { type: "string", title: "Last Name" },
    age: { type: "integer", title: "Age", minimum: 0 },
    phone: { type: "string", title: "Phone", format: "phone-us" },
    isEmployed: { type: "boolean", title: "Are you employed?" },
  },
  required: ["firstName", "lastName", "phone"],
};

const uiSchema = {
  age: {
    "ui:widget": "updown",
  },
  isEmployed: {
    "ui:widget": "radio",
    "ui:options": {
      inline: true,
    },
  },
};

const customFormats = {
  "phone-us": /\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,
};

const log = (type: string) => console.log.bind(console, type);

const AppForm = () => {
  return (
    <div>
      <h1>React JSON Schema Form Example</h1>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onChange={log("changed------>")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      />
    </div>
  );
};

export default AppForm;
