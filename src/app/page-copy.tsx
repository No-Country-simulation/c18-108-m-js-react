import Link from "next/link";
import { api } from "@/trpc/server";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

import { Button, buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const hello = await api.post.hello({ text: "a nuestro LMS" });

  return (
    <main className='flex min-h-screen flex-col items-center justify-center '>
      <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
        <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
          Lan<span className='text-[hsl(280,100%,70%)]'>ding P</span>age
        </h1>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-2xl'>
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className='flex flex-col items-center justify-center gap-4'>
            <SignedOut>
              <SignInButton forceRedirectUrl={"/lms"}>
                <Button>Sign in</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton redirectUrl='/'>
                <Button>Sign out</Button>
              </SignOutButton>
              <Link
                className={buttonVariants({ variant: "default" })}
                href='/lms'
              >
                Ir al dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </main>
  );
}
