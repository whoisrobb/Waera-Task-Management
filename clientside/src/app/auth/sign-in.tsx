import SignInForm from "@/components/forms/login-form"

const SignIn = () => {
    localStorage.removeItem('accessToken');
  return (
    <div>
        <SignInForm />
    </div>
  )
}

export default SignIn