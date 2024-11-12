import {
  ClerkLoading,
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Loader } from "lucide-react";

function Header() {
  return (
    <div className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full ">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <h1 className="text-2xl font-extrabold text-green-600 -tracking-wide">
            Lingo
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground " />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal"></SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}

export default Header;
