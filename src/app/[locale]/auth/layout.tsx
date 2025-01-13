export default function AuthLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className=" max-w-96">{children}</div>
    </div>
  );
}
