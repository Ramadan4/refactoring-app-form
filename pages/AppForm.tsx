import React, { useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

import { RJSFSchema } from "@rjsf/utils";

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

function transformErrors(errors: any) {
  return errors.map((error: any) => {
    if (error.name === "required") {
      error.message = "هذا الحقل مطلوب. يرجى ملؤه.";
    }
    if (error.name === "pattern") {
      error.message = "يُسمح بالأرقام فقط.";
    }
    return error;
  });
}

const AppForm = () => {
  useEffect(() => {
    // Customizing native validation error messages
    document.querySelectorAll("input[required]").forEach((input) => {
      input.addEventListener("invalid", (event: any) => {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity("هذا الحقل مطلوب.");
      });

      input.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity("");
      });
    });
  }, []);

  const log = (type: string) => console.log.bind(console, type);

  return (
    <div>
      <h1>React JSON Schema Form Example</h1>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        transformErrors={transformErrors}
        noHtml5Validate={false} // Keep browser validation for fields
        liveValidate={true}
        showErrorList={false}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      />
    </div>
  );
};

export default AppForm;
