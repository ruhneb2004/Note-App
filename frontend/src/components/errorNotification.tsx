import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function AlertDestructive({ error }) {
  return (
    <Alert
      variant="destructive"
      className="w-1/3 mb-7 min-w-[400px] max-w-[600px] absolute top-10"
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
