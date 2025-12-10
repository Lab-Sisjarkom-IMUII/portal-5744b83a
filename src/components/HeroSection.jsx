import { Sparkles, Rocket, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

/**
 * HeroSection component untuk showcase page
 * Menampilkan introduction yang menarik dengan copywriting yang bagus
 */
export function HeroSection() {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Showcase Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              Where Innovation
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Meets Excellence
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover amazing projects and portfolios from talented developers, 
              designers, and creators. Each showcase represents hours of dedication, 
              creativity, and technical expertise.
            </p>
          </motion.div>

          {/* Stats/Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {/* Stat 1 */}
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Deployed
              </h3>
              <p className="text-sm text-foreground/60">
                Live projects ready to explore
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Creators
              </h3>
              <p className="text-sm text-foreground/60">
                Talented developers & designers
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Quality
              </h3>
              <p className="text-sm text-foreground/60">
                Curated showcase of excellence
              </p>
            </div>
          </motion.div>

          {/* Call to action text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <p className="text-sm text-foreground/50 italic">
              "Every great project starts with a single line of code, 
              and every showcase here tells a story of passion and innovation."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

