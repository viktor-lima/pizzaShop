import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast  } from 'sonner'
import { Link, useNavigate } from "react-router-dom";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SingUpForm = z.infer<typeof signUpForm>

export function SignUp() {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: {isSubmitted}} = useForm<SingUpForm>()

  async function handleSignUp (data: SingUpForm) {
    console.log(data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Restaurante cadastrado com sucesso', {
      action :{
        label: 'Login',
        onClick: () => {navigate('/sing-in')}
      }
    })
  }

  return (
    <div>
      <Helmet title="Cadastro" />
        <div className="p-8">
          <Button variant="ghost" asChild className="absolute right-8 top-8">
            <Link to="/sing-in" className="">
             Fazer Login
            </Link>
          </Button>   
          
          <div className="w-[350px] flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tighter">Criar Conta grátis</h1>
              <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                <div className="space-y-1">
                  <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                  <Input id="restaurantName" type="text" {...register('restaurantName')}/>
                </div>

                 <div className="space-y-1">
                  <Label htmlFor="managerName">Seu Nome</Label>
                  <Input id="managerName" type="text" {...register('managerName')}/>
                </div>

                 <div className="space-y-1">
                  <Label htmlFor="restaurantName">Seu e-mail</Label>
                  <Input id="email" type="email" {...register('email')}/>
                </div>

                 <div className="space-y-1">
                  <Label htmlFor="phone">Seu celular</Label>
                  <Input id="phone" type="tel" {...register('phone')}/>
                </div>

                <Button disabled={isSubmitted} className="w-full">Finalizar cadastro</Button>

                <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                  Ao continuar, vc concorda com os nossos <a href="" className="underline underline-offset-4">Termos de serciçoes</a> e{' '} <a href="" className="underline underline-offset-4">políticas de privacidade</a>
                </p>
            </form>
          </div>
        </div>
    </div>
  )
}
