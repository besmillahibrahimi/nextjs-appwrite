import { redirect } from "next/navigation";
import qs from "qs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type EncodedRedirect = Partial<AlertMessage> & {
  path: string;
};
/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect({ path, ...rest }: Readonly<EncodedRedirect>) {
  const query = qs.stringify(rest, { addQueryPrefix: true });

  return redirect(`${path}${query}`);
}
