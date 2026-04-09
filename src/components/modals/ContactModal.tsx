import { ArrowRight, Loader2, X } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useModal } from "../../context/ModalContext";
import { useAppContext } from "../../context/useAppContext";
import { useToast } from "../../hooks/useToast";
import { CONTACT_CONFIG } from "../../data/config";

export const ContactModalContent: React.FC = () => {
  const { closeModal } = useModal();
  const { isDarkMode } = useAppContext();
  const toast = useToast();

  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!fromEmail.trim() || !subject.trim() || !message.trim()) {
      toast.error("Bitte alle Felder ausfuellen.");
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email-Konfiguration fehlt (.env Variablen).", 5000);
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: CONTACT_CONFIG.email,
          from_email: fromEmail,
          subject,
          message,
        },
        {
          publicKey,
        }
      );

      toast.success("Nachricht erfolgreich gesendet!");
      closeModal();
    } catch (error) {
      console.error("Email send failed:", error);
      toast.error("Senden fehlgeschlagen. Bitte spaeter erneut versuchen.", 5000);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className={`bg-(--bg-panel) border shadow-2xl flex flex-col p-8 ${isDarkMode ? "border-white" : "border-(--border)"}`}>
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-mono text-(--text-secondary) uppercase tracking-widest">Compose</span>
        <button onClick={closeModal} className="text-(--text-dim) hover:text-(--text-primary) transition-colors"><X size={14}/></button>
      </div>
      <div className="space-y-6 font-mono text-sm">
        <div className="grid grid-cols-[60px_1fr] items-baseline gap-2">
          <label className="text-(--text-dim)">From:</label>
          <input
            type="email"
            className="bg-transparent border-b border-(--border) focus:border-(--text-primary) outline-none py-1 text-(--text-primary) placeholder-(--text-dim) placeholder-opacity-50"
            placeholder="your@email.com"
            value={fromEmail}
            onChange={e => setFromEmail(e.target.value)}
            disabled={isSending}
          />
        </div>
        <div className="grid grid-cols-[60px_1fr] items-baseline gap-2">
          <label className="text-(--text-dim)">Subj:</label>
          <input
            type="text"
            className="bg-transparent border-b border-(--border) focus:border-(--text-primary) outline-none py-1 text-(--text-primary) placeholder-(--text-dim) placeholder-opacity-50"
            placeholder="Hello"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            disabled={isSending}
          />
        </div>
        <div className="pt-4">
          <textarea
            className="w-full h-32 bg-transparent border-none p-0 text-(--text-primary) focus:outline-none resize-none placeholder-(--text-dim) placeholder-opacity-40"
            placeholder="Write your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={isSending}
          />
        </div>
      </div>
      <div className="flex justify-end mt-8 border-t border-(--border) pt-4">
        <button 
          className="text-xs font-bold font-mono text-(--text-primary) hover:text-(--accent) flex items-center gap-2 group transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={isSending}
        >
          {isSending ? "SENDING..." : "SEND MESSAGE"}
          {isSending ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
};