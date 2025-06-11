import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to T3 Chat
        </h1>

        {session?.user ? (
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Hello, {session.user.name}! You are successfully signed in.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 text-left max-w-md mx-auto">
              <h3 className="font-semibold mb-2">Your session info:</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Name:</strong> {session.user.name}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Email:</strong> {session.user.email}
              </p>
              {session.user.image && (
                <div className="mt-2">
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Please sign in to get started with T3 Chat.
            </p>
            <p className="text-sm text-muted-foreground">
              Click the "Sign in" button in the sidebar to authenticate with
              Google.
            </p>
          </div>
        )}

        <div className="pt-8 text-sm text-muted-foreground">
          <p>This app uses Auth.js with Google OAuth and Supabase adapter.</p>
        </div>
      </div>
    </div>
  );
}
