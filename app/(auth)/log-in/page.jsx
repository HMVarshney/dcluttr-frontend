import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogInForm from "../_components/LogInForm";

export default function Home() {
  return (
    <main className="h-full">
      <div className="flex items-center justify-between py-2.5 px-12 border-b">
        <div className="mr-4 ml-auto text-sm">Don't have an account</div>
        <Hint label={"Don't have an account"} side="bottom">
          <Link href="/sign-up">
            <Button className="hidden lg:block text-base font-bold">Sign Up</Button>
          </Link>
        </Hint>
      </div>
      <LogInForm />
    </main>
  );
}
