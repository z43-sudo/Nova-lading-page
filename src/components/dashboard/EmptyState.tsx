import { LucideIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel: string;
    onAction?: () => void;
}

export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-[60vh] text-center p-8 border-2 border-dashed rounded-lg bg-muted/30"
        >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-md mb-8">{description}</p>
            <Button onClick={onAction} size="lg" className="gap-2">
                <PlusCircle className="w-5 h-5" />
                {actionLabel}
            </Button>
        </motion.div>
    );
};
