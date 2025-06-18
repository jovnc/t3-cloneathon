import SignInForm from "@/components/auth/sign-in-form";

export default async function SignInPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <SignInForm />
    </div>
  );
}
