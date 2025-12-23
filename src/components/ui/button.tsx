import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "",
                destructive: "",
                outline: "",
                secondary: "",
                ghost: "",
                link: "underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-12 rounded-lg px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, style, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        // Apply inline styles for proper color rendering
        const getStyles = (): React.CSSProperties => {
            switch (variant) {
                case 'outline':
                    return {
                        backgroundColor: 'transparent',
                        border: '1px solid #e5e7eb',
                        color: '#374151',
                        ...style,
                    };
                case 'ghost':
                    return {
                        backgroundColor: 'transparent',
                        color: '#374151',
                        ...style,
                    };
                case 'destructive':
                    return {
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        ...style,
                    };
                case 'secondary':
                    return {
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        ...style,
                    };
                default:
                    return {
                        backgroundColor: '#014D40',
                        color: '#ffffff',
                        ...style,
                    };
            }
        };

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                style={getStyles()}
                onMouseEnter={(e) => {
                    if (variant === 'default' || !variant) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#013830';
                    } else if (variant === 'outline') {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#f9fafb';
                    }
                }}
                onMouseLeave={(e) => {
                    if (variant === 'default' || !variant) {
                        (e.target as HTMLButtonElement).style.backgroundColor = '#014D40';
                    } else if (variant === 'outline') {
                        (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                    }
                }}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
