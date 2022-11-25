import {
  z,
  type ZodFormattedError,
  type ZodObject,
  type ZodRawShape,
} from "zod";
import { toast } from "solid-toast";
import { MAX_TODO_TITLE } from "~/components/ToDoItem/ToDoItem";

export const createToDoScheme = z.object({
  title: z.string().min(4).max(MAX_TODO_TITLE),
});

export const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${
          name.charAt(0).toUpperCase() + name.slice(1)
        }: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

export const TOAST_CONFIG: Parameters<typeof toast["error"]>[1] = {
  position: "top-center",
  style: {
    "font-weight": "bold",
    "z-index": "9999",
  },
};

export const validateScheme = <F extends ZodRawShape, Zod extends ZodObject<F>>(
  scheme: Zod,
  props: Zod["_input"]
) => {
  const results = scheme.safeParse(props);
  if (!results.success) {
    const err = formatErrors(results.error.format()).filter(
      (e) => e !== undefined
    );
    toast.error(err[0] ?? "Something went wrong", TOAST_CONFIG);
    return false;
  }
  return true;
};
