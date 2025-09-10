"use client";

import { loginSchema, LoginValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { login } from "./actions";
import { PasswordInput } from "@/components/PasswordInput";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";

export default function LoginForm() {
    const [error, setError] = useState<string>();

    const [isPending, startTransition] = useTransition();
    
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    async function onSubmit(values: LoginValues) {
        setError(undefined)
        startTransition(async () => {
            const {error} = await login(values);
            if (error)  setError(error);
        });
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {error && (
            <p className="text-center text-red-500 text-destructive">{error}</p>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            loading={isPending}
            type="submit"
            className="w-full bg-blue-500 text-white p-4 rounded"
          >
            Log in
          </LoadingButton>
        </form>
      </Form>
    );

}
