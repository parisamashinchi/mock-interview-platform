"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SignUp, SignIn } from "@/lib/actions/auth.action";
import { auth } from "@/firebase/client";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type !== "sign-in" ? z.string().min(2) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3).max(10),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await SignUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("sign up successfully");
        router.push("/sign-in");
      } else {
        const { email, password } = values;

        //sign in user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (!userCredential.user) {
          toast.error("user not found");
          return;
        }

        //get id token
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in failed");
          return;
        }

        await SignIn({
          email,
          idToken,
        });

        toast.success("sign in successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error as string);
    }
  }
  const isSignIn = type === "sign-in" ? true : false;

  return (
    <div className="card-border lg:m-w-[550px] ">
      <div className="card flex flex-col gap-7 py-15 px-10 ">
        <div className="flex gap-3 justify-center">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h2 className="text-light-100">  mock Interview</h2>
        </div>
        <h3 className="text-light-100">Prepare for yourself with Mock interview </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 form mt-3 w-full text-light-100"
          >
            {!isSignIn && (
              <FormField
                name="name"
                label="Name"
                placeholder="name"
                type="text"
                control={form.control}
              />
            )}
            <FormField
              name="email"
              label="Email"
              placeholder="enter your email"
              type="email"
              control={form.control}
            />
            <FormField
              name="password"
              label="Password"
              placeholder=" enter a password"
              type="password"
              control={form.control}
            />
            <Button type="submit" className="rounded-2xl bg-blue-500">
              {isSignIn ? "sign in" : "sign up"}
            </Button>
          </form>
        </Form>
        <p className="text-light-100">
          {isSignIn ? "no account yet?" : "already have an account?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="text-primary-100 font-bold ml-2"
          >
            {!isSignIn ? "sign in" : "sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
