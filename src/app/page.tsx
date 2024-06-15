import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/icons";

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center '>
      <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
        <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
          <Link href='/lms'>
            <LogoIcon className='size-28' />
          </Link>
        </h1>

        <div className='flex flex-col items-center gap-2'>
          <h1>
            Bienvenido a{" "}
            <span className='text-[hsl(280,100%,70%)]'>Studium</span>
          </h1>
          <h2 className='mt-2 font-light'>Tu Portal de Aprendizaje Integral</h2>
          <p className='mt-5 w-2/3 text-center'>
            En Studium, nos dedicamos a facilitar tu viaje educativo con una
            plataforma intuitiva y poderosa que te conecta con todas tus
            necesidades académicas.
          </p>

          <div className='mt-5 flex flex-col items-center justify-center gap-4'>
            <SignedOut>
              <SignInButton forceRedirectUrl={"/lms"}>
                <Button>Iniciar sesión</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton redirectUrl='/'>
                <Button>Cerrar sesión</Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </main>
  );
}
