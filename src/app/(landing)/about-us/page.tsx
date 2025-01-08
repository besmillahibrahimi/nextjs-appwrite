"use client";

import { useApp } from "@/providers/app.provider";

export default function AboutUsPage() {
  const { user } = useApp();
  console.log("about us");
  return (
    <div>
      <h1>About Us</h1>
      <p>{user?.email}</p>
      <p>{user?.name}</p>
    </div>
  );
}
