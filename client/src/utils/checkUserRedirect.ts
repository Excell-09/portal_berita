import { LoaderFunction, redirect } from "react-router-dom";

export default function checkUserRedirect(isUser: Boolean, url: string): LoaderFunction | undefined {
  if (isUser) {
    redirect(url);
    return;
  }
  return;
}
