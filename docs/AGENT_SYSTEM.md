# Agent System

## Business agents
`agents/` contains: Supervisor, Researcher, Product Scout, Analyst, Strategist, Scriptwriter, Producer, SEO and Publisher.

## Engineering agents
`.ai/coding/` contains coding roles. Engineering agents build the platform; business agents operate it.

## Agent contract
Every agent must define: identity, purpose, inputs, outputs, tools, permissions, preconditions, postconditions, business rules, failure modes, retry policy, HITL policy and observability.

## Supervisor loop
```text
Read State
-> Determine Next Action
-> Dispatch Agent
-> Validate Result
-> Persist Result
-> Transition State
-> Continue / Retry / HITL
```

Agents propose/perform bounded work through application services. They do not silently mutate lifecycle state or redefine policy in prompts.
