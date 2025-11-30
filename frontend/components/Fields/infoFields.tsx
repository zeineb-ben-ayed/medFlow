type InfoFieldProps = {
  label: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  fullWidth?: boolean;
};

export const InfoField = ({ label, value, icon: Icon, fullWidth = false }: InfoFieldProps) => (
  <div className={`bg-muted/30 rounded-lg p-3 border ${fullWidth ? "col-span-2" : ""}`}>
    <label className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary" />
      {label}
    </label>
    <p className="text-foreground font-medium">{value}</p>
  </div>
);