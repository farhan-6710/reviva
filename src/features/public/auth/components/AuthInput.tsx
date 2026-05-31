import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

import { authFormStyles } from "@/features/public/auth/components/authFormStyles";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";

type AuthInputProps = ComponentProps<typeof Input> & {
  icon: LucideIcon;
};

export function AuthInput({ icon: Icon, className, ...props }: AuthInputProps) {
  return (
    <div className={authFormStyles.inputWrapper}>
      <Icon className={authFormStyles.inputIcon} aria-hidden="true" />
      <Input className={cn(authFormStyles.input, className)} {...props} />
    </div>
  );
}
