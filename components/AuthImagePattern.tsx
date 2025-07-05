'use client'

interface AuthImagePatternProps {
  title: string
  subtitle: string
}

export default function AuthImagePattern({ title, subtitle }: AuthImagePatternProps) {
  return (
    <div className="hidden lg:flex bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-primary/50 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 max-w-md mx-auto">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </div>
  )
} 