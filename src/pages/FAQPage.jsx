import { HelpCircle, ExternalLink, MessageSquare, FileText, Code, User, Mail } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

/**
 * FAQ Page - Halaman untuk Frequently Asked Questions
 * Mengarahkan user ke Google Form untuk mengajukan pertanyaan
 */
export function FAQPage() {
  const faqFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeCVlIo7qGq9jD-CFCZyko9-EhWfzZ7lVVn1rAHTFHei_R4MQ/viewform";

  const categories = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "CV to Website",
      description: "Pertanyaan seputar fitur CV to Website, cara membuat website dari CV, dan penggunaan platform.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "imuii CLI (Developer)",
      description: "Pertanyaan tentang imuii CLI, cara install, penggunaan command, deployment, dan fitur developer lainnya.",
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "Akun & Login",
      description: "Masalah terkait akun, login, autentikasi, dan pengaturan profil pengguna.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Lainnya",
      description: "Pertanyaan lain yang tidak termasuk dalam kategori di atas.",
    },
  ];

  const handleOpenForm = () => {
    window.open(faqFormUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-[var(--primary)]/20 rounded-full">
            <HelpCircle className="h-12 w-12 text-[var(--primary)]" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
          Punya pertanyaan seputar imuii.id? Kami siap membantu! Ajukan pertanyaan kamu melalui form di bawah ini.
        </p>
      </div>

      {/* Info Card */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 border-[var(--primary)]/20">
        <div className="flex items-start gap-4">
          <Mail className="h-6 w-6 text-[var(--primary)] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              Bagaimana cara mengajukan pertanyaan?
            </h3>
            <p className="text-[var(--foreground)]/70 mb-4">
              Form ini digunakan untuk mengajukan pertanyaan seputar imuii.id, mulai dari fitur CV to Website, 
              imuii CLI, hingga penggunaan platform. Tim kami akan meninjau pertanyaan kamu dan membalas melalui email.
            </p>
            <p className="text-sm text-[var(--foreground)]/60">
              <strong>Penting:</strong> Pastikan email yang kamu masukkan aktif dan valid agar kami bisa membalas pertanyaan kamu.
            </p>
          </div>
        </div>
      </Card>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6 text-center">
          Kategori Pertanyaan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <Card key={index} className="p-5 hover:border-[var(--primary)]/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--primary)]/20 rounded-lg text-[var(--primary)] flex-shrink-0">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-[var(--foreground)]/70">
                    {category.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="p-8 text-center bg-[var(--card)] border-2 border-[var(--primary)]/30">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
          Siap mengajukan pertanyaan?
        </h2>
        <p className="text-[var(--foreground)]/70 mb-6 max-w-xl mx-auto">
          Klik tombol di bawah ini untuk membuka form pertanyaan. Pastikan kamu sudah menyiapkan detail pertanyaan 
          dan email yang valid.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={handleOpenForm}
          className="mx-auto"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Buka Form Pertanyaan
        </Button>
        <p className="text-xs text-[var(--foreground)]/50 mt-4">
          Form akan dibuka di tab baru
        </p>
      </Card>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-[var(--foreground)]/60">
          Butuh bantuan lebih lanjut? Hubungi tim support kami melalui email atau kunjungi dokumentasi kami.
        </p>
      </div>
    </div>
  );
}

