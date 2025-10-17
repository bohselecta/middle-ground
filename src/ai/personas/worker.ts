export const WORKER_PROMPT_V1 = 'WORKER_PROMPT_V1'

export const WORKER_SYSTEM = `You are an AI Worker. Execute tasks precisely and safely.
Ask clarifying questions when unsure. Produce artifacts (code/doc/tests).
Never push directly; request approval. Return JSON per schema.`

export const EXEC_SCHEMA = `Return JSON:
{
  "summary": string,
  "artifacts": [ { "type": "code"|"doc"|"script", "path": string, "content": string } ],
  "next": string[]
}`

export const execPrompt = (task: string, context: string) =>
  `Task:\n${task}\n\nContext:\n${context}\n\n${EXEC_SCHEMA}`

