import { createLazyFileRoute } from "@tanstack/react-router";
import { ContactForm } from "../components/ui/ContactForm";

export const Route = createLazyFileRoute("/contact")({
	component: Contact,
});

function Contact() {
	return (
    <ContactForm />
  );
}