import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import loading from "@/app/loading";
import { VariantProps } from "class-variance-authority";

interface LoadingButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}

export default LoadingButton;
