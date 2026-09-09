"use client";

import { Modal } from "@/components/ui/Modal";
import { QuoteForm } from "./QuoteForm";

export default function QuoteModal({
  presetService,
  onClose,
}: {
  presetService?: string;
  onClose: () => void;
}) {
  return (
    <Modal open onClose={onClose} labelledBy="quote-title" size="lg" className="sm:max-w-2xl">
      <QuoteForm presetService={presetService} onClose={onClose} />
    </Modal>
  );
}
