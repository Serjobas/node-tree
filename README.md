### Developer Exercise: Decision Tree Processing Backend

Objective: Implement a decision tree processing backend in TypeScript. This decision tree will enable our customers to define and execute business logic tailored to their needs.
Requirements:

- Serialization Support:
  The decision tree must support serialization to JSON and deserialization from JSON, you are free to design the schema as you see fit best
- Supported Actions:
  - Send SMS: Accepts a phone number as a parameter.
  - Send Email: Accepts sender and receiver email addresses.
  - Condition:
    Get JavaScript expression input and Evaluate it.
    Supports specifying a trueAction and a falseAction branches.
  - Loop:
    Accepts a subtree and an integer x representing the number of iterations.
    Executes the subtree x times.

Extensibility:
The decision tree must be designed to allow easy addition of new action types.
Backend Service:
Implement a backend service that:
Receives a JSON representation of a decision tree.
Deserializes the JSON into a decision tree object.
Executes the decision tree.
Note: The actual implementations of the SMS and Email actions are not required. Instead, log the parameters when these actions are invoked.
Deliverable: Submit a TypeScript implementation that meets the above requirements. Note the important point is code design, readability, testability and open to extensions and changes. Don't focus too much on specific implementation.
No need to implement

Examples of simple decision trees that the application should be able to support
christmas:
Condition in js: if date is 1.1.2025
On true branch -> Sent SMS to wish happy christmas
On false branch -> do nothing
Sent email and Sms
Send email them sent sms then sent another email
Sent 10 optional mails
Run a loop 10 times each time
Check some condition
If condition is true sent sms
