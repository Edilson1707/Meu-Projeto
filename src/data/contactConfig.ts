export const CONTACT_INFO = {
  phoneDisplay: '(62) 3296-9402',
  whatsappDisplay: '(62) 99646-9222',
  whatsappRaw: '5562996469222',
  whatsappBaseUrl: 'https://wa.me/5562996469222',
  address: 'Av. Mangabeiras, 967 - Goiânia - GO',
  email: 'contato@sopadroesgoiania.com.br',
  hours: 'Segunda a Sexta: 07h30 às 18h00 | Sábado: 08h00 às 12h00',
  mapsUrl: 'https://maps.app.goo.gl/v6qN8BadqjUErh2W8',
  getWhatsAppUrl: (message?: string) => {
    if (!message) return 'https://wa.me/5562996469222';
    return `https://wa.me/5562996469222?text=${encodeURIComponent(message)}`;
  }
};
