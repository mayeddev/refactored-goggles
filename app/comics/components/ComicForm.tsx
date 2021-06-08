import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ComicForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="genres" label="Genres" placeholder="Genres" />
      <LabeledTextField name="type" label="Type" placeholder="Type" />
      <LabeledTextField name="desc" label="Desc" placeholder="Desc" />
    </Form>
  )
}
