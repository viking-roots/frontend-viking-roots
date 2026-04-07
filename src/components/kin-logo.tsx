export function KinLogo({ size = 44 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center rounded-md bg-transparent"
      aria-hidden="true"
    >
      {/* Gradient Border using mask to keep background transparent */}
      <div
        className="absolute inset-0 rounded-md pointer-events-none"
        style={{
          padding: "2px",
          background: "linear-gradient(135deg, #f5d5c6 0%, #c8967d 50%, #784a38 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <span
        style={{
          fontSize: size * 0.36,
          backgroundImage: "linear-gradient(135deg, #f5d5c6 0%, #c8967d 50%, #784a38 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
        }}
        className="font-bold tracking-widest"
      >
        KIN
      </span>
    </div>
  );
}
