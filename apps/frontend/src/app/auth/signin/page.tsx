import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import SignInForm from "@/components/auth/SignInForm";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  const session = await auth();

  // If user is already authenticated, redirect to home or callback URL
  if (session?.user) {
    redirect(searchParams.callbackUrl || "/");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <SignInForm 
        callbackUrl={searchParams.callbackUrl} 
        error={searchParams.error} 
      />
    </div>
  );
}
