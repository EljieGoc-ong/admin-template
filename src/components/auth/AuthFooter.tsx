export function AuthFooter() {
  return (
    <p className="mt-6 text-center text-xs text-muted-foreground">
      By continuing, you agree to our{" "}
      <button className="text-primary hover:underline">Terms of Service</button>
      {" "}and{" "}
      <button className="text-primary hover:underline">Privacy Policy</button>
    </p>
  );
}
