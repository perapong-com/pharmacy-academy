import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex items-center justify-center w-full",
            className
        )}
        style={{
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            padding: '6px',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0',
        }}
        {...props}
    />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
    const [isActive, setIsActive] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        const element = triggerRef.current;
        if (element) {
            const observer = new MutationObserver(() => {
                setIsActive(element.getAttribute('data-state') === 'active');
            });
            observer.observe(element, { attributes: true, attributeFilter: ['data-state'] });
            setIsActive(element.getAttribute('data-state') === 'active');
            return () => observer.disconnect();
        }
    }, []);

    return (
        <TabsPrimitive.Trigger
            ref={(node) => {
                (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3.5 text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 flex-1 relative overflow-hidden",
                className
            )}
            style={{
                backgroundColor: isActive ? '#014D40' : 'transparent',
                color: isActive ? '#ffffff' : '#64748b',
                borderRadius: '12px',
                boxShadow: isActive
                    ? '0 4px 12px rgba(1, 77, 64, 0.35), 0 2px 4px rgba(1, 77, 64, 0.2)'
                    : 'none',
                transform: isActive ? 'scale(1)' : 'scale(0.98)',
                letterSpacing: '0.01em',
            }}
            {...props}
        >
            {/* Gradient overlay for active state */}
            {isActive && (
                <span
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
                        pointerEvents: 'none',
                    }}
                />
            )}
            {/* Icon for active state */}
            {isActive && (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ marginRight: '4px' }}
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
        </TabsPrimitive.Trigger>
    );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-5 ring-offset-background focus-visible:outline-none animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
            className
        )}
        {...props}
    />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
