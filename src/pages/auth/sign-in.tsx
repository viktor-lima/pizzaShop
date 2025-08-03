import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast  } from 'sonner'

const signInForm = z.object({
  email: z.string().email(),
})

type SingInForm = z.infer<typeof signInForm>

export function SignIn() {

  const { register, handleSubmit, formState: {isSubmitted}} = useForm<SingInForm>()

  async function handleSignIn (data: SingInForm) {
    console.log(data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Enviamos um link de autenticação para seu e-mail.', {
      action :{
        label: 'Reenviar',
        onClick: () => {handleSignIn(data)}
      }
    })
  }

  return (
    <div>
      <Helmet title="login" />
        <div className="p-8">
          <div className="w-[350px] flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tighter">Acessar painel</h1>
              <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                <div className="space-y-1">
                  <Label>Seu e-mail</Label>
                  <Input id="email" type="email" {...register('email')}/>
                </div>

                <Button disabled={isSubmitted} className="w-full">Acessar Painel</Button>
            </form>
          </div>
        </div>
    </div>
  )
}
