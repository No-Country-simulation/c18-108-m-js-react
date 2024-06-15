import Link from "next/link";
import { api } from "@/trpc/server";
import {
  SignedIn,
  // SignedOut,
  // SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { Button, buttonVariants } from "@/components/ui/button";
import { CrudShowcase } from "@/components/samples/crud-showcase";

export async function SamplePage() {
  const hello = await api.post.hello({ text: "a nuestro LMS" });
  const session = await currentUser();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center '>
      <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
        <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
          Create <span className='text-[hsl(280,100%,70%)]'>T3</span> App
        </h1>

        <div className='flex flex-col items-center gap-2'>
          <p className='text-2xl'>
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-center text-2xl'>
              {session && <span>{session.fullName}</span>}
            </p>

            {/* <SignedOut>
              <SignInButton>
                <Button>Sign in</Button>
              </SignInButton>
            </SignedOut> */}
            <SignedIn>
              <SignOutButton>
                <Button>Sign out</Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
        <Link className={buttonVariants({ variant: "default" })} href='/lms'>
          Ir al dashboard
        </Link>

        <CrudShowcase />
      </div>
    </main>
  );
}
