export function buildWhatsAppUrl(phone: string, dietaryLabel: string) {
    const message = `Confirmo asistencia! Restricción alimentaria: ${dietaryLabel}`;
    const params = new URLSearchParams({ text: message });
    return `https://wa.me/${phone}?${params.toString()}`;
}

export const RSVP = {
    title: "Tu presencia es nuestro mejor regalo.",
    subtitle:
        "Ayúdanos a preparar cada detalle confirmando antes del 15 de octubre. Esta invitación fue pensada especialmente para vos.",
    contacts: [
        {
            label: "Confirmar con Estefy",
            variant: "default",
            phone: "5492235115750",
        },
        {
            label: "Confirmar con Debo",
            variant: "maps",
            phone: "5492267446369",
        },
    ],
} as const;
