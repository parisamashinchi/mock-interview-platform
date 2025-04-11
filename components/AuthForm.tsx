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
import {useRouter} from "next/navigation";

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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(type, 'type')
    try {
      if (type === "sign-in") {
       
        toast.success("sign in successfully");
        router.push('/')
      } else {
        toast.success("sign up successfully");
        router.push('/sign-in')
      }
    } catch (error) {
      toast.error(error as string);
    }
  }
  const isSignIn = type === "sign-in" ? true : false;

  return (
    <div className="card-border lg:m-w-[550px] ">
      <div className="card flex flex-col gap-7 py-15 px-10 ">
        <div className="flex gap-1 justify-center">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <h2 className="text-primary-100">mockInterview</h2>
        </div>
        <h3>Prepare for yourself with Mock interview </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 form mt-3 w-full"
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
            <Button type="submit" className="btn">
              {isSignIn ? "sign in" : "sign up"}
            </Button>
          </form>
        </Form>
        <p>
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
