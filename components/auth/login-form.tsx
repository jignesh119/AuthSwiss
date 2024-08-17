import CardWrapper from "./card-wrapper";

export default function LoginForm(props: {}) {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      My LoginForm
    </CardWrapper>
  );
}
