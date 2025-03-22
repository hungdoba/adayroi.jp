import { ZodError } from "zod";
import { FormState } from "@/types/FormState";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export const formErrorToFormState = (error: unknown): FormState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: `Error: ${error.errors[0].message}`,
    };
  } else if (error instanceof PrismaClientInitializationError) {
    return {
      status: "ERROR",
      message: error.message,
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: `Error: ${error.message}`,
    };
  } else if (typeof error === "string") {
    return {
      status: "ERROR",
      message: `Error: ${error}`,
    };
  } else {
    return {
      status: "ERROR",
      message: "Error: An unknown error occurred",
    };
  }
};
